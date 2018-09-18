const {app, BrowserWindow, ipcMain} = require('electron')
const senseHat                      = require('./sense')

let win

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile(`client/build/index.html`)

  // Open the DevTools.
  if (process.env.DEV === 'true') {
    win.webContents.openDevTools()
  }

  win.setFullScreen(true);
})

ipcMain.on('getTemperature', (event) => {
  if (process.env.DEV === 'true') {
    event.sender.send('getTemperatureResponse', JSON.stringify({temperature: 88}))
    return
  }

  senseHat.getTemperature(
    {}, 
    ( result ) => {
      event.sender.send('getTemperatureResponse', JSON.stringify(result))
    }, 
    ( err ) => console.log(err) 
  );

})