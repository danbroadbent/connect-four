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
      redTurn: false
    }
  }

  renderColumns() {
    return this.state.grid.map((column, i) => {
      return(
        <div className="column">
          {this.renderCells(column, i)}
        </div>
      )
    })
  }

  renderCells(column, columnNumber) {
    return column.map(cell => {
      return(
        <Cell value={this.state.grid[columnNumber, cell]} />
      )
    })
  }

  render() {
    return (
      <div>
        <div>color Player - TAKE TURN</div>
        <div className="board">
          {this.renderColumns()}
        </div>
      </div>
    )
  }
}

export default Board;