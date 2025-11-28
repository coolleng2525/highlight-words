'use strict';
import  { Highlightable, SearchLocation, LocationMatch } from './highlight'
import { TreeDataProvider, TreeItem, Event, EventEmitter, Command, TreeItemCollapsibleState, ThemeIcon } from 'vscode'

class HighlightTreeProvider implements TreeDataProvider<HighlightNode> {
    public currentExpression: string
    public currentIndex: SearchLocation
    public locations: Map<string, LocationMatch[]>
	private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;
    
    constructor(public words: Highlightable[]) {
        this.locations = new Map()
    }

    getTreeItem(element: HighlightNode): TreeItem {
		return element;
	}

	getChildren(element?: HighlightNode): Thenable<HighlightNode[]> {
        if (!element) {
            // Root level: show highlight expressions
            let nodes: HighlightNode[] = this.words.map(w => {
                const locations = this.locations.get(w.expression) || []
                return new HighlightNode(w.expression, w, this, undefined, locations)
            })
            return Promise.resolve(nodes)
        } else if (element.nodeType === 'expression') {
            // Second level: show file locations
            return Promise.resolve(element.locationNodes || [])
        }
        return Promise.resolve([])
    }

    public refresh(): any {
		this._onDidChangeTreeData.fire(undefined);
	}

}

export class HighlightNode extends TreeItem {
    public nodeType: 'expression' | 'location'
    public locationNodes?: HighlightNode[]
    public location?: LocationMatch

	constructor(
        public readonly label: string,
        public readonly highlight: Highlightable,
        public provider: HighlightTreeProvider,
        public readonly command?: Command,
        locations?: LocationMatch[]
	) {
		super(label);
        
        if (locations !== undefined) {
            // This is a root expression node
            this.nodeType = 'expression'
            const totalCount = locations.length
            this.collapsibleState = totalCount > 0 ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None
            
            // Create child nodes for each location
            this.locationNodes = locations.map(loc => 
                new HighlightNode(
                    `Line ${loc.range.start.line + 1}`,
                    highlight,
                    provider,
                    {
                        command: 'highlightwords.goToLocation',
                        title: 'Go to Location',
                        arguments: [loc]
                    },
                    undefined
                )
            )
            
            // Set location info for each child node
            this.locationNodes.forEach((node, idx) => {
                node.location = locations[idx]
                node.nodeType = 'location'
            })
        } else {
            // This is a location child node
            this.nodeType = 'location'
            this.collapsibleState = TreeItemCollapsibleState.None
        }
        
        // Set tooltip and description
        this.updateDisplay()
    }
    
    private getOpts(): string {
        const index = this.highlight.expression == this.provider.currentExpression ? 
        ` ${this.provider.currentIndex.index}/${this.provider.currentIndex.count}` : ''

        return this.highlight.ignoreCase && this.highlight.wholeWord ? 'both' :
               this.highlight.ignoreCase ? 'ignoreCase' :
               this.highlight.wholeWord ? 'wholeWord' : 'default' + index
    }

    private updateDisplay() {
        if (this.nodeType === 'location' && this.location) {
            this.tooltip = `${this.location.uri.fsPath}:${this.location.range.start.line + 1}`
            const fileName = this.location.uri.path.split('/').pop()
            this.description = `${fileName}:${this.location.range.start.line + 1}`
            this.iconPath = ThemeIcon.File
        } else {
            const opts = this.getOpts()
            this.tooltip = `${this.label}-${opts}`
            this.description = opts
        }
    }

	contextValue = 'highlights';

}

export default HighlightTreeProvider