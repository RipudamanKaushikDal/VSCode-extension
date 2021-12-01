import * as vscode from 'vscode';
import ImportStatements from './import-mapping';

const insertTemplate = async(importMapping:ImportStatements) => {
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    return;
  }

  let templateString = '';

  Object.entries(importMapping).forEach(([folderName,importStatements]) => {
    templateString = templateString.concat(`// ${folderName.toUpperCase()}`+'\n'+importStatements+'\n');
  });

  

  const lineInserted:boolean = await editor.edit((editBuilder) => {
    editBuilder.insert(new vscode.Position(0,0), templateString);
  });

  if (!lineInserted){
      return vscode.window.showErrorMessage("Not able to insert import comments");
  }
  
};

export default insertTemplate;