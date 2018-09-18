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
      this.setState({result: arg})
      //document.getElementById('result').innerHTML = arg
    })
    ipcRenderer.send('getTemperature')
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.result}
        </p>
      </div>
    );
  }
}

export default App;
