import React, { useState } from 'react';
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const newSquares = squares.slice();

    // If there's already a winner or the square is already filled, return early
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    // Determine which symbol (X or O) to place
    const currentPlayer = xIsNext ? 'X' : 'O';

    // Check if placing this symbol would result in three consecutive symbols for the current player
    const hasThreeInARow = checkThreeInARow(newSquares, currentPlayer);
    const playerSymbolCount = countSymbols(newSquares, currentPlayer);

    if (hasThreeInARow || playerSymbolCount >= 3) {
      // Find the oldest symbol of the current player and remove it
      for (let j = 0; j < newSquares.length; j++) {
        if (newSquares[j] === currentPlayer) {
          newSquares[j] = null;
          break;
        }
      }
    }

    // Place the symbol in the clicked square
    newSquares[i] = currentPlayer;

    // Update the state with the new squares and switch turns
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleRestart() {
    // Reset the board to its initial state
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="status">{status}</div>
      {!winner ? <span>Have Fun!</span> : <button onClick={handleRestart}>Restart</button>}
    </div>
  );
}

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Function to check if placing a symbol would result in three consecutive symbols for a player
function checkThreeInARow(squares, currentPlayer) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if any of the winning lines have three consecutive symbols for the current player
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] === currentPlayer &&
      squares[b] === currentPlayer &&
      squares[c] === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

// Function to count the number of symbols of a player on the board
function countSymbols(squares, symbol) {
  let count = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === symbol) {
      count++;
    }
  }
  return count;
}

export default Board;
