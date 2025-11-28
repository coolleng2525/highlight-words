'use strict';
import { commands, ExtensionContext, window, workspace, Position, Selection, Range, ViewColumn } from 'vscode';
import HighlightConfig from './config'
import Highlight from './highlight'
import { LocationMatch } from './highlight'

export function activate(context: ExtensionContext) {
    let highlight = new Highlight()
    let configValues

    commands.registerCommand('highlightwords.addRegExpHighlight', function () {
        window.showInputBox({ prompt: 'Enter expression' })
            .then(word => {
                highlight.addRegExp(word)
            });
    });

    commands.registerCommand('highlightwords.addHighlight', function () {
        highlight.addSelected()
    });

    commands.registerCommand('highlightwords.addHighlightWithOptions', function () {
        highlight.addSelected(true)
    });

    commands.registerCommand('highlightwords.removeHighlight', function () {
        window.showQuickPick(highlight.getWords().concat([{ expression: '* All *', wholeWord: false, ignoreCase: false }]).map(w => {
            return {
                label: w.expression,
                description: (w.ignoreCase ? 'i' : '') + (w.wholeWord ? 'w' : ''),
                detail: ''
            }
        }))
            .then(word => {
                highlight.remove(word)
            })
    });

    commands.registerCommand('highlightwords.treeRemoveHighlight', e => {
        highlight.remove(e)
    })

    commands.registerCommand('highlightwords.treeHighlightOptions', e => {
        highlight.updateOptions(e.label)
    })

    commands.registerCommand('highlightwords.removeAllHighlights', function () {
        highlight.clearAll()
    });

    commands.registerCommand('highlightwords.toggleSidebar', function () {
        configValues.showSidebar = !configValues.showSidebar
        commands.executeCommand('setContext', 'showSidebar', configValues.showSidebar)
    });

    commands.registerCommand('highlightwords.setHighlightMode', function () {
        const modes = ['Default', 'Whole Word', 'Ignore Case', 'Both'].map((s, i) => highlight.getMode() == i ? s+' ✅' : s)
        window.showQuickPick(modes).then(option => {
            if (typeof option == 'undefined') return;

            highlight.setMode(modes.indexOf(option)) 
        })
    })
    
    async function next(e, wrap?:boolean) {
        const expression = e.highlight.expression
        const allLocations = highlight.getAllLocations()
        const locations = allLocations.get(expression)
        
        if (!locations || locations.length === 0) {
            window.showInformationMessage('No matches found')
            return
        }
        
        // Sort locations by file and then by position
        const sortedLocations = locations.sort((a, b) => {
            const pathCompare = a.uri.fsPath.localeCompare(b.uri.fsPath)
            if (pathCompare !== 0) return pathCompare
            if (a.range.start.line !== b.range.start.line) {
                return a.range.start.line - b.range.start.line
            }
            return a.range.start.character - b.range.start.character
        })
        
        // Find current position
        let currentIndex = -1
        if (window.activeTextEditor) {
            const currentUri = window.activeTextEditor.document.uri.fsPath
            const currentPos = window.activeTextEditor.selection.active
            
            currentIndex = sortedLocations.findIndex(loc => 
                loc.uri.fsPath === currentUri &&
                loc.range.start.line === currentPos.line &&
                loc.range.start.character >= currentPos.character - 1
            )
            
            // If not found or we're past this position, try to find the next one
            if (currentIndex === -1 || 
                (sortedLocations[currentIndex] && 
                 sortedLocations[currentIndex].range.start.character < currentPos.character)) {
                currentIndex = sortedLocations.findIndex(loc => 
                    loc.uri.fsPath === currentUri && 
                    loc.range.start.isAfter(currentPos)
                )
            }
        }
        
        // Move to next location
        const nextIndex = currentIndex === -1 || currentIndex >= sortedLocations.length - 1 ? 0 : currentIndex + 1
        const nextLocation = sortedLocations[nextIndex]
        
        try {
            const document = await workspace.openTextDocument(nextLocation.uri)
            const editor = await window.showTextDocument(document)
            editor.selection = new Selection(nextLocation.range.start, nextLocation.range.start)
            editor.revealRange(nextLocation.range, 1)
            highlight.getLocationIndex(expression, nextLocation.range)
        } catch (error) {
            window.showErrorMessage(`Failed to navigate: ${error.message}`)
        }
    }

    commands.registerCommand('highlightwords.findNext', e => {
        next(e)
    });

    async function prev(e, wrap?:boolean) {
        const expression = e.highlight.expression
        const allLocations = highlight.getAllLocations()
        const locations = allLocations.get(expression)
        
        if (!locations || locations.length === 0) {
            window.showInformationMessage('No matches found')
            return
        }
        
        // Sort locations by file and then by position
        const sortedLocations = locations.sort((a, b) => {
            const pathCompare = a.uri.fsPath.localeCompare(b.uri.fsPath)
            if (pathCompare !== 0) return pathCompare
            if (a.range.start.line !== b.range.start.line) {
                return a.range.start.line - b.range.start.line
            }
            return a.range.start.character - b.range.start.character
        })
        
        // Find current position
        let currentIndex = -1
        if (window.activeTextEditor) {
            const currentUri = window.activeTextEditor.document.uri.fsPath
            const currentPos = window.activeTextEditor.selection.active
            
            // Find the last location before current position
            for (let i = sortedLocations.length - 1; i >= 0; i--) {
                const loc = sortedLocations[i]
                if (loc.uri.fsPath === currentUri && loc.range.start.isBefore(currentPos)) {
                    currentIndex = i
                    break
                } else if (loc.uri.fsPath < currentUri) {
                    currentIndex = i
                    break
                }
            }
        }
        
        // Move to previous location
        const prevIndex = currentIndex === -1 || currentIndex <= 0 ? sortedLocations.length - 1 : currentIndex - 1
        const prevLocation = sortedLocations[prevIndex]
        
        try {
            const document = await workspace.openTextDocument(prevLocation.uri)
            const editor = await window.showTextDocument(document)
            editor.selection = new Selection(prevLocation.range.start, prevLocation.range.start)
            editor.revealRange(prevLocation.range, 1)
            highlight.getLocationIndex(expression, prevLocation.range)
        } catch (error) {
            window.showErrorMessage(`Failed to navigate: ${error.message}`)
        }
    }

    commands.registerCommand('highlightwords.findPrevious', e => {
        prev(e)        
    });

    commands.registerCommand('highlightwords.goToLocation', async (location: LocationMatch) => {
        if (!location || !location.uri || !location.range) return;
        
        try {
            // Open the document
            const document = await workspace.openTextDocument(location.uri);
            const editor = await window.showTextDocument(document, ViewColumn.Active);
            
            // Navigate to the location
            const position = location.range.start;
            editor.selection = new Selection(position, position);
            editor.revealRange(location.range, 1); // 1 = vscode.TextEditorRevealType.InCenter
        } catch (error) {
            window.showErrorMessage(`Failed to open location: ${error.message}`);
        }
    });

    updateConfig()

    function updateConfig() {
        configValues = HighlightConfig.getConfigValues()
        highlight.setDecorators(configValues.decorators)
        highlight.setMode(configValues.defaultMode)
        commands.executeCommand('setContext', 'showSidebar', configValues.showSidebar)
    }

    let activeEditor = window.activeTextEditor;
    if (activeEditor) {
        triggerUpdateDecorations();
    }

    workspace.onDidChangeConfiguration(() => {
        updateConfig()
    })

    window.onDidChangeVisibleTextEditors(function (editor) {
        highlight.updateDecorations();
    }, null, context.subscriptions);

    workspace.onDidChangeTextDocument(function (event) {
        activeEditor = window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    var timeout: NodeJS.Timer = null;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            highlight.updateActive()
        }, 500);
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}