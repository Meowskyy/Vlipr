const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const dialog = electron.dialog;

let win;
function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        minHeight: 300,
        minWidth: 300,
        width: 800,
        height: 600,
        frame: false,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
    win.openDevTools();
}

app.on('ready', createWindow)

exports.selectDirectory = (data) => {
    return dialog.showOpenDialog({
        properties: ['openDirectory']
      }).then(result => {
        //console.log(result.canceled)
        //console.log(result.filePaths)
        return result;
      }).catch(err => {
        console.log(err)
        return err;
      })
 };