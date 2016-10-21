import Board from './board';
import * as Tetrominos from './tetrominos';

class Tetris {
  constructor($hook) {
    this.$hook = $hook; // root div in index.html
    this.board = new Board($hook);
    this.resetCurrentTetromino();
    document.addEventListener('keydown', this.handleKeypress.bind(this), false);
  }

  resetCurrentTetromino() {
    this.currentTetromino = {
      row: 0,
      col: 4,
      tetromino: this.nextTetromino || this.randomTetromino(),
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

  clearRows() {
    for (let row = 0; row < this.board.gridHeight; row++) {
      let complete = true;
      for (let col = 0; col < this.board.gridWidth; col++) {
        if (!this.board.blockAt(row, col)) {
          complete = false;
          break;
        }
      }
      if (complete) {
        this.board.removeRow(row);
        row--;
      }
    }
  }

  handleKeypress(e) {
    switch (e.keyCode) {
      case 38:
        this.rotateCurrentTetromino();
        break;
      case 37:
        this.move(0, -1);
        break;
      case 39:
        this.move(0, 1);
        break;
      case 40:
        this.move(1, 0);
        break;
    }
    this.board.render();
  }

  play() {
    setTimeout(function () {
      if (!this.move(1, 0)) {
        if (this.currentTetromino.row === 0) {
          alert ('you lose!');
          return;
        }
        this.clearRows();
        this.resetCurrentTetromino();
      }
      this.play();
    }.bind(this), 500);
    this.board.render();
  }
}





document.addEventListener("DOMContentLoaded", function() {
  const tetris = new Tetris($('#hook'));
  tetris.play();
});
