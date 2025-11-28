# Change Log

## 0.2.0 (2025-11-28)
### 🎉 Major New Features
- **Hierarchical Tree View**: Shows highlight expressions with expandable file locations
  - First level: Highlight expressions (e.g., "registerCommand")
  - Second level: All matching locations across files
  - Each location displays line number and filename (e.g., "Line 14 extension.ts:14")
- **Cross-File Navigation**: Click any location in the tree view to jump directly to that file and line
- **Enhanced Arrow Navigation**: Previous/Next buttons now support cross-file navigation
  - Automatically sorts matches by file path and position
  - Loops through all matches across all open files
  - Seamlessly opens files when navigating to matches in other files
- **Location Details**: Hover over locations to see full file paths
- **File Icons**: Location items display file icons for better visual identification

### 🔧 Technical Improvements
- Added `LocationMatch` interface to store file URI and range information
- Implemented `allLocations` Map to track matches across all visible editors
- Updated tree provider to support two-level hierarchy
- Modernized dependencies (TypeScript 4.7, @types/vscode 1.23+)
- Improved TypeScript compilation with stricter type checking
- Added comprehensive documentation (INSTALLATION.md, QUICK_TEST.md)

### 🐛 Bug Fixes
- Fixed tree view refresh to properly update location counts
- Improved decoration update logic to handle multiple editors
- Better error handling for file navigation operations

## 0.1.2 (2019-03-16)
- default mode on load

## 0.1.1 (2019-01-20)
- fix broken trigger

## 0.1.0 (2019-01-19)
- added sidebar

## 0.0.8 (2018-08-14)
- added `defaultMode` option

## 0.0.7 (2017-09-18)
- select word at cursor if nothing selected

## 0.0.6 (2017-09-13)
- make colors configurable
- option to display box or background style highlight
- defer activation to on commands
- rename commands from generic 'extension' to more explicit 'highlightwords', **this will require an update to any keyboard shortcuts you may have configured**

## 0.0.5 (2017-04-09)
- added whole word and ignore case
- only update current document on content change
- apply highlights on peek when initially inactive

## 0.0.4 (2017-01-14)
- remove annoyance

## 0.0.3 (2017-01-14)
- Better light theme support

## 0.0.2 (2017-01-02)
- Package update

## 0.0.1 (2017-01-02)
- Initial release
