class Board {
  constructor() {
    this.gridHeight = 20;
    this.gridWidth = 10;
    this.grid = this.initializeGrid();
  }

  /**
   * initialize empty game grid
   */
  initializeGrid() {
    const grid = [];
    for (let i = 0; i < this.gridHeight; i++) {
      grid.push(new Array(this.gridWidth));
    }
    return grid;
  }


  blockAt(row, col) {
    return this.grid[row][col];
  }

  /**
   * set block at row, col to have the properties of the tetromino containing the block
   */
  setBlock(row, col, tetromino) {
    this.grid[row][col] = tetromino;
  }

  /**
   * set block at row, col to undefined
   */
  clearBlock(row, col) {
    this.grid[row][col] = undefined;
  }

  /**
   * perform callback function on each position of grid occupied by
   * given tetromino located at (row, col) with given rotation.
   */
  eachBlock(row, col, tetromino, rotation, callback) {
    let dRow = 0, dCol = 0;
    let tetrominoBlocks = tetromino.rotations[rotation];
    for (let currBit = 0b1000000000000000; currBit > 0; currBit >>= 1) {
      if (currBit & tetrominoBlocks) {
        callback(row + dRow, col + dCol);
      }
      dCol++;
      if (dCol > 3) {
        dCol = 0;
        dRow++;
      }
    }
  }

  /**
   * Place tetromino at row, col
   */
  placeTetromino(tetromino, row, col) {

  }

  /**
   *  Return true if any block tetromino of given rotation located at (row, col)
   *  will take a space already occupied on the board.
   */
  isOccupied(row, col, tetromino, rotation) {
    let occupied = false;

    const testOccupation = function (i, j) {
      if (i < 0 || j < 0 ||
        i >= this.gridHeight ||
        j >= this.gridWidth ||
        Boolean(this.blockAt(i, j))
      ){
        occupied = true;
      }
    }.bind(this);

    this.eachBlock(row, col, tetromino, rotation, testOccupation);

    return occupied;
  }

  printGridToConsole() {
    for (let row = 0; row < this.gridHeight; row++) {
      let rowString = '';
      for (let col = 0; col < this.gridWidth; col++) {
        rowString += this.blockAt(row, col) ? this.grid[row][col].string : "-";
        rowString += " ";
      }
      console.log(rowString);
    }
  }
}

export default Board;
