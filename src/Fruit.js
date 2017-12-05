import React, { Component } from 'react';
import './App.css';

class Fruit extends Component {
  render(){
    let divStyle = {
      'height' : this.props.size,
      'width' : this.props.size,
      'top' : this.props.top,
      'left' : this.props.left,
    }
    return(
      <div
      style={divStyle}
      className="fruit"></div>
    )
  }
}
export default Fruit;
