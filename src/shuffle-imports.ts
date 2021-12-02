import * as vscode from 'vscode';
import ImportStatements from './import-mapping';


const editImports = async () =>{
  const editor = vscode.window.activeTextEditor;
  
  
  if (!editor) {
    return;
  }

  const importedFolders:ImportStatements= {};
  const packages:string[] = [];

  const folderSearchExpression:RegExp = /import.*?\..*?\//;
  const styleSearchExpression:RegExp = /import.*?(\.css|\.scss|\.sass|\.less)/;

  await editor.edit(editBuilder => {

      for (let i = 0; i < editor.document.lineCount; ++i){
    
        const line:vscode.TextLine = editor.document.lineAt(i);
    
        if (line.text.match(styleSearchExpression)){
    
          if (importedFolders.styles){
            importedFolders.styles = importedFolders.styles.concat(line.text+'\n');
          } else {
            importedFolders.styles = line.text+'\n';
          }

          editBuilder.delete(line.range);
          continue;
        }
    
        if (line.text.match(folderSearchExpression)){
    
          const wordArray:string[] = line.text.replace(/^.*\.\//g,'').split('/');
          const importDirectory = wordArray[0];
    
          if (importedFolders[importDirectory]){
            importedFolders[importDirectory] = importedFolders[importDirectory].concat(line.text+'\n');
          } else{
            importedFolders[importDirectory] = line.text+'\n';
          }

          editBuilder.delete(line.range);

        } else if(line.text.includes('import')) {
          packages.push(line.text);
          editBuilder.delete(line.range);
        }
      }
  });
  const allPackages = packages.join('\n')+'\n';

  return {packages:allPackages,...importedFolders};
  
};

export default editImports;