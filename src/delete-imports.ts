import * as vscode from 'vscode';


const deleteImports = async(rangeArray:vscode.Range[],editor:vscode.TextEditor) => {
  
  if (!editor) {
    return;
  }
    
  await editor.edit(editBuilder => {
    rangeArray.forEach(range => {
      editBuilder.delete(range);
    });
  });
};

export default deleteImports;