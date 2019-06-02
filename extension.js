// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const editor = vscode.window.activeTextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let testcommand = vscode.commands.registerCommand(
    "extension.helloWorld",
    function() {
      chainInputs();
    }
  );

  context.subscriptions.push(testcommand);
}
exports.activate = activate;

function findValidExtensions() {
  let mirror = [];
  vscode.workspace.workspaceFolders.forEach(folder => {
    let valid = false;
    if (/CEP\\extensions$/.test(folder.uri.fsPath)) {
      // Check if root is CEP/extensions
      console.log("THIS IS THE VALID CEP ROOT");
      valid = true;
    } else if (/CEP\\extensions\\[^\\]*$/.test(folder.uri.fsPath)) {
      // Check if root is first depth of CEP/extensions
      console.log("THIS IS A VALID CEP EXTENSION");
      valid = true;
    } else {
      console.log("CHECK DEEP");
      // Scan this directory to search for CSXS folder
    }

    if (valid) {
      let child = {
        path: folder.uri.fsPath,
        name: folder.name
      };
      mirror.push(child);
    }
  });
  return mirror;
}

function chainInputs() {
  let valids = findValidExtensions();

  let activeExt = null;
  console.log(valids);
  let pickOpts = valids.map(ext => {
    return ext.name;
  });
  // let testbox = vscode.window.showInformationMessage(`${workspaceFolder}`);

  // 1) Scan through workspace directories, find CSXS files, and append their paths
  // to a single array

  // 2) Show quick pick to ask which extension should be staged/signed

  let name = vscode.window
    .showInputBox({
      prompt: "Hello world"
    })
    .then(val => {
      console.log("RETURNED:");
      console.log(val);
    })
    .then(() => {
      if (pickOpts.length > 1) {
        let picklist = vscode.window
          .showQuickPick(pickOpts, {
            placeHolder: "Select extension to stage:"
          })
          .then(val => {
            activeExt = console.log(val);
          });
      } else {
        activeExt = valids[0];
      }
    });
  console.log(name);
  console.log("Testing...");
  vscode.window.showInformationMessage(name);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
