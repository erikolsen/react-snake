import React, { Component } from 'react';
import './App.css';

class BodySegment extends Component {
  render(){
    let divStyle = {
      'backgroundColor' : this.props.color,
      'height' : this.props.size,
      'width' : this.props.size,
      'top' : this.props.location[0],
      'left' : this.props.location[1]
    }

    return(
      <div
        style={divStyle}
        className="bodySegment">
      </div>
    )
  }
}

export default BodySegment;
