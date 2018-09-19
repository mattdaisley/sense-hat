import React, { Component } from 'react';
import './App.css';
import TemperatureBar from './components/TemperatureBar/TemperatureBar';

const { ipcRenderer } = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer

class App extends Component {

  state = {}

  constructor(props) {
    super(props);
    
    this.getTemperature = this.getTemperature.bind(this)
  }

  componentDidMount() {
    this.getTemperature();
    this.getTemperatureInterval = setInterval(this.getTemperature, 5000);

    ipcRenderer.on('getTemperatureResponse', (event, arg) => {
      const result = JSON.parse(arg);
      // console.log(result);
      this.setState({temperature: Math.round(result * 100) / 100})
      //document.getElementById('result').innerHTML = arg
    })
  }

  componentWillUnmount() {
    clearInterval(this.getTemperatureInterval);
  }

  getTemperature() {
    // console.log('getting the temperature')
    ipcRenderer.send('getTemperature')
  }
  
  render() {
    return (
      <div className="app">
        <div className="tempResult">
          <div className="degrees">{this.state.temperature}<sup>&deg;</sup></div>
          <TemperatureBar temperature={this.state.temperature} />
        </div>
      </div>
    );
  }
}

export default App;
