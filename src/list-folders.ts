import * as vscode from 'vscode';

const listFolders = async() => {

    const workspace = vscode.workspace.workspaceFolders
    
    if (!workspace) return;
    
    const folderList:string[] = [];

    const path:vscode.Uri = workspace[0]?.uri
    const uri:vscode.Uri =  vscode.Uri.joinPath(path,'\\src')
    const fileArray:[string,vscode.FileType][] = await vscode.workspace.fs.readDirectory(uri)
    fileArray.forEach((file) => {
        if (file[1] === 2){
            const folderName:string = '// '+ file[0].toUpperCase()
            folderList.push(folderName)
        }
    })
        
    return folderList
}

export default listFolders
