import * as vscode from 'vscode';

const editor = vscode.window.activeTextEditor;

const showText = () => {
  if (!editor) {
    console.log("Editor Not Ready");
    return;
  }

  for (let i = 0; i < editor.document.lineCount; ++i) {
    const line:vscode.TextLine = editor.document.lineAt(i);
    console.log("Line",line);
    if (line.text.includes('import')){
      const wordArray:string[] = line.text.split('/');
      console.log("Word",wordArray[1]);
      editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(i-1,0),`// ${wordArray[1].toUpperCase()}`);
      });
    }
  }
  

  
};

export default showText;