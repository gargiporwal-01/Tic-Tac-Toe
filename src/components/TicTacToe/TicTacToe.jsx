import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../../assets/circle.png';
import cross_icon from '../../assets/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState('');

  const toggle = (index) => {
    if (lock || board[index] !== '') return; //winner announced or draw and or already filled cells

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? 'x' : 'o';
    setBoard(newBoard);
    setCount(count + 1);

    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winPatterns) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setLock(true);
        return;
      }
    }

    if (!newBoard.includes('')) {
      setWinner('draw');
      setLock(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCount(0);
    setLock(false);
    setWinner('');
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe <span>Game</span>
      </h1>

      {winner && (
        <h2 className="winner-text">
          {winner === 'draw' ? "It's a Draw!" : `Winner: ${winner.toUpperCase()}`}
        </h2>
      )}

      <div className="board">
        {board.map((cell, i) => (
          <div key={i} className="boxes" onClick={() => toggle(i)}>
            {cell === 'x' && <img src={cross_icon} alt="cross" className="icon" />}
            {cell === 'o' && <img src={circle_icon} alt="circle" className="icon" />}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
