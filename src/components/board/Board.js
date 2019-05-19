import React from 'react';
import './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        ["x", "x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x", "x"]
      ],
      redTurn: false
    }
  }

  render() {
    return (
      <div>
        <div>color Player - TAKE TURN</div>
        <div className="board">board goes here</div>
      </div>
    )
  }
}

export default Board;