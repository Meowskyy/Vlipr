const electron = require('electron')
const { app, BrowserWindow } = require('electron')

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
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