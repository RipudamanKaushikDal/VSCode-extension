// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import listFolders from './list-folders';
import insertImports from './insert-imports';
import detectImports from './detect-imports';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let addFolders = vscode.commands.registerCommand('arrangeimports.addImports', async() => {
		try {
			const folderList:string[]|undefined  = await listFolders();

	
			if (folderList && folderList.length > 0) {
				insertImports(folderList);
			}
	
			context.subscriptions.push(addFolders);

		} catch (err) {
			vscode.window.showErrorMessage("Not able to run the extension");
		}
	});

	let detectFolders = vscode.commands.registerCommand('arrangeimports.detectImports',() => {
		try {
			const folderList:string[]|undefined  = detectImports();

	
			if (folderList && folderList.length > 0) {
				insertImports(folderList);
			}
	
			context.subscriptions.push(detectFolders);

		} catch (err) {
			vscode.window.showErrorMessage("Not able to run the extension");
		}
	});
};

// this method is called when your extension is deactivated
export function deactivate() {}
