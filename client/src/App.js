import React, { Component } from 'react';
// import electron from 'electron';
import logo from './logo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer

class App extends Component {

  state = {}

  componentDidMount() {
    ipcRenderer.on('getTemperatureResponse', (event, arg) => {
      console.log(arg) // prints "pong"
      const result = JSON.parse(arg);
      this.setState({temperature: result.temperature})
      //document.getElementById('result').innerHTML = arg
    })
    ipcRenderer.send('getTemperature')
  }
  
  render() {
    return (
      <div className="app">
        <p className="tempResult">
          {this.state.temperature}
        </p>
      </div>
    );
  }
}

export default App;
