import * as vscode from 'vscode';

const detectImports = () =>{
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    return;
  }

  const importedFolders:Set<string> = new Set();

  for (let i = 0; i < editor.document.lineCount; ++i){
    const line:vscode.TextLine = editor.document.lineAt(i);
    const foldersearchExpression:RegExp = /import.*?\.\.\//;
    const stylesearchExpression:RegExp = /import.*?(\.css|\.scss|\.sass|\.less)/;
    if (line.text.match(foldersearchExpression)){
      const strippedLine:string[] = line.text.replace(foldersearchExpression,'').split('/');
      importedFolders.add(`// ${strippedLine[1].toUpperCase()}`);
    } else if (line.text.match(stylesearchExpression)){
      importedFolders.add("// STYLES");
    }
  }
  return [...importedFolders];
};

export default detectImports;