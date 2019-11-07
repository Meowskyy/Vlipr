// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const downloader = require('./downloader');

// When document has loaded, initialise
document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        handleWindowControls();
        handleOtherControls();
    }
};

function handleWindowControls() {
    let win = remote.getCurrentWindow();
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

function handleOtherControls() {
    document.getElementById('download-button').addEventListener("click", event => {
        var inputVal = document.getElementById("linkInput").value;

        var node = document.createElement("div");     // Create a <div> node
        var textnode = document.createTextNode(inputVal);   // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>

        document.getElementById("links").appendChild(node);     // Append <li> to <ul> with id="myList"
        //downloader.downloadVideo ('http://www.youtube.com/watch?v=90AiXO1pAiA');
    });
}