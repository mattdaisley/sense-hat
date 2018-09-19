const {app, BrowserWindow, ipcMain} = require('electron')
const senseHat                      = require('./sense')

let win

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })

  // Open the DevTools.
  if (process.env.DEV === 'true') {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadFile(`client/build/index.html`)
  }

  win.setFullScreen(true);
})

ipcMain.on('getTemperature', (event) => {
  if (process.env.DEV === 'true') {
    event.sender.send('getTemperatureResponse', Math.round(Math.random() * 10) + 70)
    return
  }
  // console.log('getting temperature')
  senseHat.getTemperature()
    .then(( result ) => {
      // console.log('sending getTemperatureResponse', JSON.stringify(result))
      event.sender.send('getTemperatureResponse', JSON.stringify(result))
    })
    .catch(( err ) => console.log(err));

})