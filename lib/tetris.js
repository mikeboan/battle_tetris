import Board from './board';
import * as Tetrominos from './tetrominos';

class Tetris {
  constructor() {
    this.board = new Board();
    this.currentTetromino = {
      row: 0,
      col: 4,
      tetromino: this.randomTetromino(),
      rotation: 0
    };
    this.nextTetromino = this.randomTetromino();
  }

  randomTetromino() {
    const tetrominos = [Tetrominos.o, Tetrominos.i, Tetrominos.j, Tetrominos.l,
      Tetrominos.z, Tetrominos.s, Tetrominos.t];
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
  }

  removeCurrentTetromino() {
    this.board.eachBlock(
      this.currentTetromino.row,
      this.currentTetromino.col,
      this.currentTetromino.tetromino,
      this.currentTetromino.rotation,
      function (x, y) {
        this.board.setBlock(x, y, undefined);
      }.bind(this)
    );
  }

  placeCurrentTetromino() {
    this.board.eachBlock(
      this.currentTetromino.row,
      this.currentTetromino.col,
      this.currentTetromino.tetromino,
      this.currentTetromino.rotation,
      function (x, y) {
        this.board.setBlock(x, y, this.currentTetromino.tetromino);
      }.bind(this)
    );
  }

  rotateCurrentTetromino() {
    this.removeCurrentTetromino();
    if (!this.board.isOccupied(
      this.currentTetromino.row,
      this.currentTetromino.col,
      this.currentTetromino.tetromino,
      (this.currentTetromino.rotation + 1) % 4
    )) {
      this.currentTetromino.rotation =
      (this.currentTetromino.rotation + 1) % 4;
    }

    this.placeCurrentTetromino();
  }

  /**
   * move current tetromino by dRow, dCol if space is available for it to move
   * return true if moved, false o.w.
   */
  move(dRow, dCol) {
    const newRow = this.currentTetromino.row + dRow;
    const newCol = this.currentTetromino.col + dCol;
    this.removeCurrentTetromino();
    let moved = false;

    if (!this.board.isOccupied(newRow, newCol, this.currentTetromino.tetromino, this.currentTetromino.rotation)) {
      this.currentTetromino.row = newRow;
      this.currentTetromino.col = newCol;
      moved = true;
    }

    this.placeCurrentTetromino();
    return moved;
  }

  play() {
    setTimeout(function () {
      this.move(1, 0);
      this.rotateCurrentTetromino();
      this.play();
    }.bind(this), 500);
    this.board.printGridToConsole();
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  }
}





document.addEventListener("DOMContentLoaded", function() {
  const tetris = new Tetris();
  tetris.play();
});
