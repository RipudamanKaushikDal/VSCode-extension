import * as vscode from 'vscode';


const insertImports = (folderArray:string[]) => {
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    return;
  }

  const folderNames = folderArray.join('\n\n')

  editor.edit((editBuilder) => {
    editBuilder.insert(new vscode.Position(0,0), folderNames + '\n');
  }).then(confirmation => {
    if (!confirmation){
      return vscode.window.showErrorMessage("Not able to run the extension")
  }})
};

export default insertImports;