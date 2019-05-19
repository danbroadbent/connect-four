import React from 'react';
import Cell from '../cell/Cell'
import './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
      ],
      redTurn: false,
      newGame: true
    }
  }

  renderColumns() {
    return this.state.grid.map((column, i) => {
      return(
        <div 
          key={`column-${i}`}
          className="column"
        >
          {this.renderCells(column, i)}
        </div>
      )
    })
  }

  renderCells(column, columnNumber) {
    return column.map((cell, i) => {
      return(
        <Cell
          key={`column-${columnNumber}-row-${i}`}
          value={cell} 
        />
      )
    })
  }

  render() {
    if (this.state.newGame) {
      const setInitialState = (color) => this.setState({ newGame: false, redTurn: color === 'red' ? true : false})
      return (
        <div>
          Player 1 - Please Choose Your Color:
          <div>
            <div onClick={() => setInitialState('red')}>Red</div>
            <br ></br>
            <div onClick={() => setInitialState('black')}>Black</div>
          </div>
        </div>
      )
    }
    const playerTurn = this.state.redTurn ? 'Red' : 'Black';
    return (
      <div>
        <div>{playerTurn} Player - TAKE TURN</div>
        <div className="board">
          {this.renderColumns()}
        </div>
      </div>
    )
  }
}

export default Board;