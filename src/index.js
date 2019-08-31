import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function component
function Square(props) {
  return (
    <button style = {props.style} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, winner) {
    return (
      <Square
        value = {this.props.squares[i]}
        style = {{background: winner && winner.includes(this.props.squares[i]) ? 'yellow' : 'white'}}
        onClick = {() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //Bonus#3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
    let divs = [];
    var rows = [];
    const size = 3;
    // total squares = size * size
    for (let i = 0; i < size; i ++) {
      // outter loop: #size rows
      for (let j = i * size; j < i * size + size; j ++) {
        // inner loop: #size squares per row
        //let color = this.props.winner.includes(this.props.squares[j])
        divs.push(this.renderSquare(j, this.props.winner));When someone wins, highlight the three squares that caused the win.
      }
      // rows is an array contains #size amount of rows and have indexes as keys for elements, each row is an array of divs 
      rows.push(<div key={i} className="board-row">{divs}</div>);
      // reset divs
      divs = [];
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        row: null,
        col: null,
      }],
      xIsNext: true,
      stepNumber: 0,
      isAscending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const [calulatedRow, calculatedCol] = calculateRowAndCol(i);

    // Ignoring a click if someone has won the game or a Square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        row: calulatedRow,
        col: calculatedCol,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber: stepNumber,
      xIsNext: (stepNumber % 2) === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    // Javascript map function syntax: 
    /* var new_array = arr.map(function callback(currentValue[, index[, array]]) {
     //   Return element for new_array
        }[, thisArg])
    */
   // 占位step: currentValue, move: index
    var moves = history.map((currentValue, index) => {
      const desc = index ? 'Go to move #' + index
      //Bonus#1. Display the location for each move in the format (col, row) in the move history list.
        +', ('+ currentValue.row
        +',' + currentValue.col + ')' 
        : `Go to game start`;

      //Bonus#2. Bold the currently selected item in the move list.
      let bold = index === this.state.stepNumber ? 'bolded' : '';
      return (
        <li key={index}>
          <button className={bold} onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });
    // Bonus#4. Add a toggle button that lets you sort the moves in either ascending or descending order.
    if (!this.state.isAscending) moves = moves.slice().reverse();

    let status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      <div className="game">
        <div className="game-board">
          <Board winner={winner} squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={()=>this.setState({isAscending: ! this.state.isAscending})}>change order</button>
        </div>
      </div>
    );
  }

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root123')
);

// Given an array of 9 squares, this function will check for a winner and return 'X', 'O', or null as appropriate.
function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0;i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function calculateRowAndCol(index) {
  var row = -1, col = -1;
  if ([0, 1, 2].includes(index)) {
    row = 1;
    col = index + 1;
  }
  else if ([3, 4, 5].includes(index)) {
    row = 2;
    col = index - 2;
  } 
  else if ([6, 7, 8].includes(index)) {
    row = 3;
    col = index - 5;
  }
  return [row, col];
}
