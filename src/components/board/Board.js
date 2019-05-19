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
      newGame: true,
      winner: null
    }
    this.startNewGame = this.startNewGame.bind(this);
    this.TOTAL_ROWS = 6;
    this.TOTAL_COLUMNS = 7;
  }

  startNewGame() {
    this.setState({ 
      newGame: true,
      winner: null,
      grid: [
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
        ["x", "x", "x", "x", "x", "x"],
      ]
     })
  }

  dropChip(column) {
    let droppedChip = false;
    const grid = this.state.grid.slice();
    const reversedColumn = grid[column].slice().reverse();
    reversedColumn.forEach((cell, i) => {
      if (cell === 'x' && droppedChip === false) {
        grid[column][(this.TOTAL_ROWS - 1) - i] = this.state.redTurn ? 'r' : 'b';
        droppedChip = true;
      }
    })
    if (droppedChip) {
      this.setState({ grid: grid, redTurn: !this.state.redTurn }, this.checkForWinner(this.state.grid))
    } else {
      alert('Column already full, try a different one.')
    }
  }

  checkForWinner(grid) {
    const winner = this.checkForHorizontalWin(grid) || this.checkForVerticalWin(grid)
      || this.checkForDiagonalWinUp(grid) || this.checkForDiagonalWinDown(grid)
      || this.checkTieGame(grid);
    if (winner) {
      this.setState({ winner: winner })
    }
  }

  checkForVerticalWin(grid) {
    for (let c = 0; c < this.TOTAL_COLUMNS; c++) {
      for (let r = 3; r < this.TOTAL_ROWS; r++) {
        if (grid[c][r] !== 'x') {
          if (grid[c][r] === grid[c][r - 1] &&
              grid[c][r] === grid[c][r - 2] &&
              grid[c][r] === grid[c][r - 3]) {
            return grid[c][r];    
          }
        }
      }
    }
  }

  checkForHorizontalWin(grid) {
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < this.TOTAL_ROWS; r++) {
        if (grid[c][r] !== 'x') {
          if (grid[c][r] === grid[c + 1][r] && 
              grid[c][r] === grid[c + 2][r] &&
              grid[c][r] === grid[c + 3][r]) {
            return grid[c][r];
          }
        }
      }
    }
  }

  checkForDiagonalWinUp(grid) {
    for (let c = 0; c < 4; c++) {
      for (let r = 3; r < this.TOTAL_ROWS; r++) {
        if (grid[c][r] !== 'x') {
          if (grid[c][r] === grid[c + 1][r - 1] &&
              grid[c][r] === grid[c + 2][r - 2] &&
              grid[c][r] === grid[c + 3][r - 3]) {
            return grid[c][r];
          }
        }
      }
    }
  }

  checkForDiagonalWinDown(grid) {
    for (let c = 3; c < this.TOTAL_COLUMNS; c++) {
      for (let r = 3; r < this.TOTAL_ROWS; r++) {
        if (grid[c][r] !== 'x') {
          if (grid[c][r] === grid[c - 1][r - 1] &&
              grid[c][r] === grid[c - 2][r - 2] &&
              grid[c][r] === grid[c - 3][r - 3]) {
            return grid[c][r];
          }
        }
      }
    }
  }

  checkTieGame(grid) {
    for (let c = 0; c < this.TOTAL_COLUMNS; c++) {
      for (let r = 0; r < this.TOTAL_ROWS; r++) {
        if (grid[c][r] === 'x') {
          return null;
        }
      }
    }
    return 'tie'; 
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
      <div className='start'>
        Player 1 - Please Choose Your Color:
        <div className='button-wrapper'>
          <span className='button' onClick={() => setInitialState('red')}>Red</span>
          <span className='button' onClick={() => setInitialState('black')}>Black</span>
        </div>
      </div>
    )
  }

  renderOutcome() {
    let winningMessage;
    if (this.state.winner === 'r') {
      winningMessage = 'Red Player Wins!'
    } else if (this.state.winner === 'b') {
      winningMessage = 'Black Player Wins!'
    } else if (this.state.winner === 'tie') {
      winningMessage = 'Tie Game!'
    }
    return (
      <div className='game-over-man'>
        <div className='instructions'>
          {winningMessage}
        </div>
        <div className='button' onClick={this.startNewGame}>
          OK
        </div>
      </div>
    )
  }

  render() {
    if (this.state.newGame) {
      return this.renderStartScreen()
    }
    if (this.state.winner) {
      return this.renderOutcome()
    }
    const playerTurn = this.state.redTurn ? 'Red' : 'Black';
    return (
      <div>
        <div className='instructions'>{playerTurn} Player - Click a column to drop a chip</div>
        <div className="board">
          {this.renderColumns()}
        </div>
      </div>
    )
  }
}

export default Board;