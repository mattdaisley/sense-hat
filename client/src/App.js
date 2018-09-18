import React, { Component } from 'react';
// import electron from 'electron';
import logo from './logo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer

class App extends Component {

  state = {}

  constructor(props) {
    super(props);
    
    this.getTemperature = this.getTemperature.bind(this)
  }

  componentDidMount() {
    this.getTemperatureInterval = setInterval(this.getTemperature, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.getTemperatureInterval);
  }

  getTemperature() {
    ipcRenderer.on('getTemperatureResponse', (event, arg) => {
      const result = JSON.parse(arg);
      // console.log(result);
      this.setState({temperature: Math.round(result * 100) / 100})
      //document.getElementById('result').innerHTML = arg
    })
    // console.log('getting the temperature')
    ipcRenderer.send('getTemperature')
  }
  
  render() {
    return (
      <div className="app">
        <div className="tempResult">
          {this.state.temperature}<sup>&deg;</sup>
        </div>
      </div>
    );
  }
}

export default App;
