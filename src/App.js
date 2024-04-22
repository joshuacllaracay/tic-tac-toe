// App.js
import React from 'react';
import Board from './Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
