const fs = require('fs');
const http = require('http');
const youtubedl = require('youtube-dl');
const cheerio = require('cheerio');
const phantom = require('phantom');

var folderDir = "";
function downloadYoutube(url) {
  console.log(url);
  const video = youtubedl(url, ['--format=18'], { cwd: __dirname })
  // youtube-dl -f 'bestvideo[height<=480]+bestaudio/best[height<=480]'

  const options = ['--format=18']

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started')
    console.log('title: ' + info.title)
    console.log('size: ' + info.size)
  })

  youtubedl.getInfo(url, options, function(err, info) {
    if (err) throw err
   
    console.log('id:', info.id)
    console.log('title:', info.title)
    console.log('url:', info.url)
    console.log('thumbnail:', info.thumbnail)
    console.log('description:', info.description)
    console.log('filename:', info._filename)
    console.log('format id:', info.format_id)
  })

  if (folderDir !== "") {
    video.pipe(fs.createWriteStream(folderDir + "/video.mp4"));
  } else {
    video.pipe(fs.createWriteStream("video.mp4"));
  }
}

function downloadPlaysTV(url) {
  fetch(url)
  .then(resp => resp.text())
  .then(function(body) { 
    let $ = cheerio.load(body)
    var url = $('source[res="720"]').first().attr('src');
    console.log(url);

    var file ;
    if (folderDir !== "") {
      file = fs.createWriteStream(folderDir + "/video.mp4");
    } else {
      file = fs.createWriteStream("video.mp4");
    }
    
    const request = http.get("http://" + url, function(response) {
      response.pipe(file);
    });
  });
}

module.exports.downloadVideo = function (urls) { 
  folderDir = document.getElementById("folderInput").value;
  console.log(folderDir);
  const url = new URL(urls);
  console.log(url.hostname);

  switch(url.hostname) {
    case "www.youtube.com":
    case "youtube.com":
    case "youtu.be":
      console.log("Downloading from youtube");
      downloadYoutube(url.href);
      break;
    case "plays.tv":
        console.log("Downloading from plays.tv");
      downloadPlaysTV(url.href);
      break;
    case "twitch.tv":
      console.log("Downloading from twitch");
      break;
  }
};