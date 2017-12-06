import React, { Component } from 'react';
import './App.css';

class StartBar extends Component {
  startGame(){
    this.props.startGame();
  }

  render(){
    return(
      <div className='buttonBar'>
        <button className='button' onClick={(e)=>{this.startGame()}}>Click Here or Press Arrow Key to Start</button>
      </div>
    )
  }
}

export default StartBar;
