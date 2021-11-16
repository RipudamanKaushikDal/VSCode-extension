import * as vscode from 'vscode';


const insertImports = async(folderArray:string[]) => {
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    return;
  }

  const folderNames = folderArray.join('\n\n')

  const lineInserted:boolean = await editor.edit((editBuilder) => {
    editBuilder.insert(new vscode.Position(0,0), folderNames + '\n');
  });

  if (!lineInserted){
      return vscode.window.showErrorMessage("Not able to insert import comments")
  }
};

export default insertImports;