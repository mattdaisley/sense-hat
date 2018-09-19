import React, { Component } from 'react';
import './TemperatureBar.css';
import Notch from './Notch/Notch';

class TemperatureBar extends Component {

  state = {
    max: 83,
    min: 68,
    color1: [9, 177, 219], //rgb(9, 177, 219)
    color2: [195, 1, 20] //rgb(195, 1, 20)
  }

  constructor(props) {
    super(props);
    
  }

  getNotchColor(factor) {
    console.log(this.props.temperature, this.state.min + factor)
    if (this.props.temperature < this.state.min + factor - 1) return [255, 255, 255, .3]

    var result = this.state.color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor/10 * (this.state.color2[i] - this.state.color1[i]));
    }
    result[3] = 1
    return result;
  }
  
  render() {
    let notches = [];
    for (let i = this.state.max - this.state.min; i > 0; i--) {
      notches.push((<Notch color={`rgba(${this.getNotchColor(i)}`}/>))
    }
    return (
      <div className="bar">
        {notches}
      </div>
    );
  }
}

export default TemperatureBar;
