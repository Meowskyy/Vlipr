// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const downloader = require('./downloader');
const mainProcess = remote.require('./index')
document.getElementById('folder-select-button').addEventListener('click', _ => {
    mainProcess.selectDirectory().then(data => { 
        // console.log(data.canceled);
        if (data.canceled == false) {
            // console.log(data.filePaths);
            document.getElementById("folderInput").value = data.filePaths;
        }
    });
})

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

var isSettingsOpen = false;
var videoLinks = [];
function handleOtherControls() {
    // Execute a function when the user releases a key on the keyboard
    document.getElementById('linkInput').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addLinks();
        }
    });


    document.getElementById('download-button').addEventListener("click", event => {
        addLinks();

        if (videoLinks.length > 0) {
            videoLinks.forEach(function(element) {
                console.log("Downloading: " + element);
                downloader.downloadVideo (element);
            });
        }
    });

    document.getElementById('settings-button').addEventListener("click", event => {
        isSettingsOpen = !isSettingsOpen;
        var node = document.getElementById("settings");

        if (isSettingsOpen) 
        {
            //console.log("Settings opening");
            node.classList.remove("slide-right");
            node.classList.add("slide-left");
        } else {
            //console.log("Settings closed");
            node.classList.remove("slide-left");
            node.classList.add("slide-right");
        }
    });
}

function addLinks() {
    var inputVal = document.getElementById("linkInput").value;
    document.getElementById("linkInput").value = "";
    var links = inputVal.split(" ");

    if (links.length > 0) {
        links.forEach(function(element) {
            var node = document.createElement("div");     // Create a <div> node
            var textnode = document.createTextNode(element);   // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>

            document.getElementById("links").appendChild(node);     // Append <li> to <ul> with id="myList"

            videoLinks.push(element);
        });
    }

    console.log("All links: " + videoLinks);
}