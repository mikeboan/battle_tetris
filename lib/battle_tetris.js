import Tetris from './tetris.js';
import * as Tetrominos from './tetrominos';

class BattleTetris extends Tetris {
  constructor($hook, keyBindings) {
    super($hook, keyBindings);
    this.bricks = [];
    this.dropBlocksOnOpponent = null;
  }

  /**
   *  Hold pointer to opponent BattleTetris instance
   */
  addOpponent(opponent) {
    this.opponent = opponent;
    this.registerListener(this.opponent.initializeBricks.bind(opponent));
  }

  /**
   * accept callback from opponent (Observer design pattern)
   */
  registerListener(cb) {
    this.dropBlocksOnOpponent = cb;
  }

  /**
   * call callback on opponent to drop blocks on their board
   */
  notifyListener(numBricks) {
    this.dropBlocksOnOpponent(numBricks);
  }

  /**
   * Add numBricks bricks to this.bricks array
   */
  initializeBricks(numBricks) {
    const brickLocation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < numBricks; i++) {
      const randIdx = Math.floor(Math.random()*(brickLocation.length + 1));
      this.bricks.push({
        row: 0,
        col: brickLocation[randIdx],
        tetromino: Tetrominos.brick,
        rotation: 0
      });
      brickLocation.splice(randIdx, 1);
    }
  }

  /**
   * Drop all unclearable bricks one tile if possible
   */
  dropBricks() {
    const movedBricks = [];
    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];
      if (this.move(1, 0, brick)) {
        // release bricks that have fallen as far as possible
        movedBricks.push(brick);
      }
    }
    this.bricks = movedBricks;
  }

  /**
   * Main gameplay loop - overwrite play() in Parent Class to accommodate
   * brick functionality
   */
  play() {
    setTimeout(function () {
      this.dropBricks();
      if (!this.move(1, 0)) {
        if (this.currentTetromino.row === 0) {
          alert ('you lose!');
          return;
        }
        const clearedRows = this.clearRows();
        // drop bricks on opponent if rows cleared
        if (clearedRows) {
          this.notifyListener(clearedRows);
          // this.initializeBricks(clearedRows);
        }
        this.resetCurrentTetromino();
      }
      this.play();
    }.bind(this), this.dropInterval);
    this.board.render();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const rightGame = new BattleTetris($('#right-board'));
  const leftGame = new BattleTetris($('#left-board'), {
    UP: 87,
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    DROP: 81
  });
  leftGame.addOpponent(rightGame);
  rightGame.addOpponent(leftGame);
  rightGame.play();
  leftGame.play();
});
