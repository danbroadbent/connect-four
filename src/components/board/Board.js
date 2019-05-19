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
    this.COLUMN_LENGTH = 6;
  }

  dropChip(column) {
    let droppedChip = false;
    const grid = this.state.grid.slice();
    const reversedColumn = grid[column].slice().reverse();
    reversedColumn.forEach((cell, i) => {
      if (cell === 'x' && droppedChip === false) {
        grid[column][(this.COLUMN_LENGTH - 1) - i] = this.state.redTurn ? 'r' : 'b';
        droppedChip = true;
      }
    })
    if (droppedChip) {
      this.setState({ grid: grid, redTurn: !this.state.redTurn })
    } else {
      // alert row already full
    }
  }

  renderColumns() {
    return this.state.grid.map((column, i) => {
      return(
        <div 
          key={`column-${i}`}
          className="column"
          onClick={()=> this.dropChip(i)}
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

  renderStartScreen() {
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

  render() {
    if (this.state.newGame) {
      return this.renderStartScreen()
    }
    const playerTurn = this.state.redTurn ? 'Red' : 'Black';
    return (
      <div>
        <div>{playerTurn} Player - Click a column to drop a chip</div>
        <div className="board">
          {this.renderColumns()}
        </div>
      </div>
    )
  }
}

export default Board;