import * as vscode from 'vscode';

const detectImports = () =>{
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    return;
  }

  const importedFolders:Set<string> = new Set();

  for (let i = 0; i < editor.document.lineCount; ++i){
    const line:vscode.TextLine = editor.document.lineAt(i);
    const folderSearchExpression:RegExp = /import.*?\..*?\//;
    const styleSearchExpression:RegExp = /import.*?(\.css|\.scss|\.sass|\.less)/;
    if (line.text.match(folderSearchExpression)){
      const wordArray:string[] = line.text.replace(/^.*\.\//g,'').split('/');
      importedFolders.add(`// ${wordArray[0].toUpperCase()}`);
    } else if (line.text.match(styleSearchExpression)){
      importedFolders.add("// STYLES");
    }
  }
  return [...importedFolders];
};

export default detectImports;