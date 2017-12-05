import React, { Component } from 'react';
import Fruit from './Fruit';
import BodySegment from './BodySegment';
import StartBar from './StartBar';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.size = 20;
    this.boardHeight = window.innerHeight;
    this.boardWidth = window.innerWidth;
    this.startGame = this.startGame.bind(this);
    this.state = {
      gameOver: '',
      speed: 100,
      segments: [[200, 200]],
      fruitLocation: [300, 300],
      keypress: 'ArrowRight'
    };
  }

  logKey(e){
    e.preventDefault();
    this.setState({
      keypress: e.key
    });
  }

  newSegment(head){
    switch(this.state.keypress) {
      case 'ArrowUp':
        return [head[0] - this.size, head[1]]
      case 'ArrowDown':
        return [head[0] + this.size, head[1]]
      case 'ArrowRight':
        return [head[0], head[1] + this.size]
      case 'ArrowLeft':
        return [head[0], head[1] - this.size]
      default:
        return [head[0], head[1] + this.size]
    }
  }

  getNewSegments(){
    let oldSegments = this.state.segments
    oldSegments.unshift(this.newSegment(oldSegments[0]))
    return oldSegments
  }

  rando(){
    return Math.floor(Math.random() * 40) * this.size
  }

  tick(){
    if(this.gameOver()){
      clearInterval(this.state.intervalId);
      this.setState({ gameOver: 'GAME OVER' })
    }

    let newSegments = this.getNewSegments()
    if(this.ateFruit()){
      clearInterval(this.state.intervalId);
      let newSpeed = this.state.speed - 1
      let newIntervalId = setInterval(()=>{this.tick()}, newSpeed);

      this.setState({
        speed: newSpeed,
        intervalId: newIntervalId,
        segments: newSegments,
        fruitLocation: [this.rando(), this.rando()]
      })
    }else{
      newSegments.pop()
      this.setState({ segments: newSegments })
    };
  }

  offBoard(){
    // If Window is resized without a page refresh this will break
    let startBarHeight = this.boardHeight * 0.1
    let segTop  = this.state.segments[0][0]
    let segLeft = this.state.segments[0][1]
    let offTop = segTop < 0
    let offLeft = segLeft < 0
    let offRight = segLeft > this.boardWidth
    let offBottom = segTop > (this.boardHeight - startBarHeight)

    return offTop || offLeft || offRight || offBottom
  }

  hitBody(){
    let head = this.state.segments[0];
    let hitIt = false;
    this.state.segments.forEach((seg, i)=>{
      if(i === 0){ return }
      if((head[1] === seg[1]) && (head[0] === seg[0])){
        hitIt = true;
      }
    });
    return hitIt;
  }

  gameOver(){
    return this.hitBody() || this.offBoard();
  }

  ateFruit(){
    let head = this.state.segments[0];
    let fruit = this.state.fruitLocation;
    return (head[1] === fruit[1]) && (head[0] === fruit[0])
  }

  startGame(){
    clearInterval(this.state.intervalId);
    let newIntervalId = setInterval(()=>{this.tick()}, this.state.speed);
    this.setState({
      intervalId: newIntervalId,
      gameOver: '',
      speed: 100,
      segments: [[200, 200]],
      fruitLocation: [300, 300],
      keypress: 'ArrowRight'
    });
  }

  componentDidMount(){
    console.log('width ' + this.boardWidth);
    console.log('eight ' + this.boardHeight);
  }

  render() {
    let segments = this.state.segments.map((seg, i) =>
      <BodySegment
        key= {i}
        size= { this.size }
        location={seg}
      />
    )

    return (
      <div className="App" onKeyDown={(e)=>{this.logKey(e)}} tabIndex='0'>
        <h1>Score: {this.state.segments.length - 1}</h1>
        <p className='gameOver'>{this.state.gameOver}</p>
        <Fruit
          size={ this.size }
          top={ this.state.fruitLocation[0] }
          left={ this.state.fruitLocation[1] }
        />
        { segments }
        <StartBar startGame={this.startGame}/>
      </div>
    );
  }
}

export default App;
