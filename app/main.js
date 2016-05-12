const electron = require('electron');
const app = electron.app;
const path = require('path');


// browser-window creates a native window
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  var protocol = electron.protocol;
  protocol.registerFileProtocol('atom', function(request, callback) {
    var url = request.url.substr(7);
    callback({path: path.normalize(__dirname + '/' + url)});
  }, function (error) {
    if (error)
      console.error('Failed to register protocol')
  });

  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Clear out the main window when the app is closed
  mainWindow.on('closed', function () {

    mainWindow = null;
  });

});