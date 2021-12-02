import * as vscode from 'vscode';
import deleteImports from './delete-imports';
import ImportStatements from './import-mapping';


const shuffleImports = async() =>{
  const editor = vscode.window.activeTextEditor;
  
  
  if (!editor) {
    return;
  }

  const importedFolders:ImportStatements= {};
  const lineRanges:vscode.Range[] = [];
  const packages:string[] = [];

  const folderSearchExpression:RegExp = /import.*?\..*?\//;
  const styleSearchExpression:RegExp = /import.*?(\.css|\.scss|\.sass|\.less)/;

  for (let i = 0; i < editor.document.lineCount; ++i){

    const line:vscode.TextLine = editor.document.lineAt(i);

    if (line.text.match(styleSearchExpression)){
      lineRanges.push(line.range);

      if (importedFolders.styles){
        importedFolders.styles = importedFolders.styles.concat(line.text+'\n');
      } else {
        importedFolders.styles = line.text+'\n';
      }

      continue;
    }

    if (line.text.match(folderSearchExpression)){
      lineRanges.push(line.range);

      const wordArray:string[] = line.text.replace(/^.*\.\//g,'').split('/');
      const importDirectory = wordArray[0];

      if (importedFolders[importDirectory]){
        importedFolders[importDirectory] = importedFolders[importDirectory].concat(line.text+'\n');
      } else{
        importedFolders[importDirectory] = line.text+'\n';
      }
      
    } else if(line.text.includes('import')) {
      lineRanges.push(line.range);
      packages.push(line.text);
    }
  }
  const allPackages = packages.join('\n')+'\n';

  await deleteImports(lineRanges,editor);

  return {packages:allPackages,...importedFolders};
  
};

export default shuffleImports;