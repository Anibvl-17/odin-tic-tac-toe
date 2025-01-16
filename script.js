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

  // This will print the gameboard to the console
  // NOTE: This method won't be necessary after the UI is implemented
  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      let row = ''
      for (let j = 0; j < columns; j++) {
        const columnLine = j === columns - 1 ? '' : '|';
        const cellValue = board[i][j].getValue();

        if (cellValue == '') {
          row += ' ' + columnLine;
        } else {
          row += board[i][j].getValue() + columnLine;
        }
      }
      console.log(row);
    }
  };

  return {
    getBoard,
    putToken,
    printBoard
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
  const players = ['X', 'O'];
  
  let roundCounter = 1;
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () => {
    console.log(`Round ${roundCounter}.\nPlayer ${activePlayer} turn.`);
    gameboard.printBoard();
  }

  const playRound = (row, col) => {

    console.log(`Player ${activePlayer} played at row ${row}, col ${col}`);
    
    if (gameboard.putToken(row, col, activePlayer)) {
      roundCounter++;
      switchPlayer();
      printNewRound();
    } else {
      console.log('Invalid move. Try again.');
      return;
    }
    
  }

  // Initial round
  printNewRound();

  return {
    getActivePlayer,
    playRound
  }

}

const Game = GameController();

Game.playRound(0, 0);
Game.playRound(0, 1);

Game.playRound(0, 0);

Game.playRound(0, 2);
Game.playRound(1, 0);

Game.playRound(0, 2);

Game.playRound(1, 1);
Game.playRound(1, 2);
Game.playRound(2, 0);

Game.playRound(2, 0);
Game.playRound(0, 0);

Game.playRound(2, 1);
Game.playRound(2, 2);