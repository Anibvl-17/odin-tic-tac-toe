/**
 * The Gameboard represents, well, the game board.
 * It is a 3x3 grid of Cells.
 */
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Here I create a 2D array that represents the game board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // This will return the entire gameboard
  const getBoard = () => board;

  const putToken = (row, col, token) =>{
    const targetCell = board[row][col];
    
    if (targetCell.getValue() === '') {
      targetCell.setValue(token);
      return true;
    } else {
      return false;
    }

  };

  return {
    getBoard,
    putToken,
  };
}

/**
 * The Cell represents a single cell in the game board.
 * It has 3 states: Empty, X, O
 * Where X is the player 1 and O is the player 2.
 * A Cell can't be modified unless it is empty!
 */
function Cell() {
  // This represents the value of the cell
  let value = '';

  // This function sets the value of the cell
  const setValue = (newValue) => {
    value = newValue;
  };

  // This function returns the value of the cell
  const getValue = () => value;

  return {
    setValue,
    getValue
  };
}

/**
 * The GameController is the main controller of the game.
 * It will handle the game logic and the game state.
 */
function GameController() {
  const gameboard = Gameboard();
  const players = {
    player1: {
      name: 'Player 1',
      token: 'X'
    },
    player2: {
      name: 'Player 2',
      token: 'O'
    }
  }

  let activePlayer = players.player1;

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === players.player1 ? players.player2 : players.player1;
  }

  const printNewRound = () => {
    console.log(`Player ${activePlayer.name} turn.`);
  }

  const playRound = (row, col) => {
    console.log(`Player ${activePlayer.name} played at row ${row}, col ${col}`);
    
    if (gameboard.putToken(row, col, activePlayer.token)) {
      if (checkIfWins(row, col)) alert('Player ' + activePlayer.name + ' wins!');
      switchPlayer();
      printNewRound();
    } else {
      console.log('Invalid move. Try again.');
      return;
    }
  };

  function checkIfWins(row, col) {
    const board = gameboard.getBoard();

    function checkRow() {
      for (let i = 0; i < 3; i++) {
        if (board[row][i].getValue() !== activePlayer.token) {
          return false;
        }
      }
      return true;
    }

    function checkColumn(){
      for (let i = 0; i < 3; i++) {
        if (board[i][col].getValue() !== activePlayer.token) {
          return false;
        }
      }
      return true;
    }

    // Check diagonal from Left to Right
    function checkDiagonalLTR() {
      for (let i = 0; i < 3; i++) {
        if (board[i][i].getValue() !== activePlayer.token) {
          return false;
        }
      }
      return true;
    }

    // Check diagonal from Right to Left
    function checkDiagonalRTL() {
      for (let i = 0; i < 3; i++) {
        if (board[i][2 - i].getValue() !== activePlayer.token) {
          return false;
        }
      }
      return true;
    }

    return checkRow() || checkColumn() || checkDiagonalLTR() || checkDiagonalRTL();
  }

  const resetRound = () => {
    gameboard.getBoard().forEach(row => {
      row.forEach(cell => {
        cell.setValue('');
      });
    });

    activePlayer = players.player1;
  };

  // Initial round
  printNewRound();

  return {
    players,
    getActivePlayer,
    playRound,
    resetRound,
    getBoard: gameboard.getBoard
  }

}

function DisplayController() {
  const game = GameController();
  const gameboard = game.getBoard();
  
  
  const boardDiv = document.querySelector('.board');
  const activePlayerSpan = document.querySelector('.active-player');
  
  const cellClickHandler = (e) => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    
    game.playRound(row, col);
    updateScreen();
  }
  
  const resetRoundClickHandler = () => {
    game.resetRound();
    updateScreen();
  }

  const resetRoundButton = document.querySelector('.reset-round-btn');
  resetRoundButton.addEventListener('click', resetRoundClickHandler);

  const updateScreen = () => {
    activePlayerSpan.textContent = game.getActivePlayer().name;
    if (game.getActivePlayer().name === game.players.player1.name) {
      activePlayerSpan.classList.add('player-one');
      activePlayerSpan.classList.remove('player-two');
    } else {
      activePlayerSpan.classList.add('player-two');
      activePlayerSpan.classList.remove('player-one');
    }

    boardDiv.textContent = '';

    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
        cellDiv.textContent = cell.getValue();
        cellDiv.addEventListener('click', cellClickHandler);
        boardDiv.appendChild(cellDiv);
      });
    });
  }
  
  updateScreen();
}

DisplayController();