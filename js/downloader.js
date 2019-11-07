const fs = require('fs')
const youtubedl = require('youtube-dl')

module.exports.downloadVideo = function (urls) { 
  const video = youtubedl(urls, ['--format=18'], { cwd: __dirname })

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started')
    console.log('title: ' + info.title)
    console.log('size: ' + info.size)
  })

  video.pipe(fs.createWriteStream('testVideo.mp4'));
};