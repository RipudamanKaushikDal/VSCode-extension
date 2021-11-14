import * as vscode from 'vscode';


const addImports = (folderArray:string[]) => {
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    return;
  }

  const folderNames = folderArray.join('\n\n')

  editor.edit(editBuilder => {
    editBuilder.insert(new vscode.Position(0,0), folderNames);
  })
  
};

export default addImports;