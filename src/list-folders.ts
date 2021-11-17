import * as vscode from 'vscode';

const listFolders = async() => {

    try {
        
        const workspace = vscode.workspace
        const rootFolder = workspace.workspaceFolders
        
        if (!rootFolder) return;
        
        const pathConfig = workspace.getConfiguration('arrangeimports')

        const folderDirectory:string =  pathConfig.get('folderDirectory') || '/src'
        
        const folderList:string[] = [];

        const path:vscode.Uri = rootFolder[0]?.uri
        const uri:vscode.Uri =  vscode.Uri.joinPath(path,folderDirectory)
        const fileArray:[string,vscode.FileType][] = await vscode.workspace.fs.readDirectory(uri)
    
        fileArray.forEach((file) => {
            if (file[1] === 2){
                const folderName:string = '// '+ file[0].toUpperCase()
                folderList.push(folderName)
            }
        })
            
        return folderList

    } catch (err) {
        vscode.window.showErrorMessage("Not able to find folders, check 'Folder Directory' in extension settings")
    }

}

export default listFolders
