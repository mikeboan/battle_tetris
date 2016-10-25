import modal from 'modal';

import Tetris from './tetris.js';
import * as Tetrominos from './tetrominos';

class BattleTetris extends Tetris {
  constructor(player, $hook, keyBindings) {
    super($hook, keyBindings);
    this.player = player;
    this.bricks = [];
    this.dropBlocksOnOpponent = null;
  }

  /**
   *  Hold pointer to opponent BattleTetris instance
   */
  addOpponent(opponent) {
    this.opponent = opponent;
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
   * Add numLines lines of unclearable bricks
   */
  addLines(numLines) {
    this.removeCurrentTetromino();
    for (let i = 0; i < numLines; i++) {
      this.board.pushRow();
      for (let col = 0; col < this.board.gridWidth; col++) {
        this.board.setBlock(this.board.gridHeight - 1, col, Tetrominos.brick);
      }
    }
    this.placeCurrentTetromino();
  }

  pause() {
    this.paused = true;
  }

  playTurn() {
    if (!this.move(1, 0)) {
      if (this.currentTetromino.row === 0) {
        this.lose();
      }
      const newlyClearedRows = this.clearRows();
      this.clearedRows += newlyClearedRows;
      this.updateDropInterval();
      // drop bricks on opponent if rows cleared
      if (newlyClearedRows) this.notifyListener(newlyClearedRows);
      this.resetCurrentTetromino();
    }
  }

  lose() {
    this.board.render();
    this.pause();
    this.opponent.pause();
    this.renderLossModal();
  }

  renderLossModal() {
    modal(
      { title: `${this.player} loses!`
      , content: 'Rematch?'
      , buttons:
        [
          { text: 'Play Again', event: 'play', keyCodes: [ 13 ] }
        ]
      })
    .on('play', () => window.location.reload() );
  }

  /**
   * Main gameplay loop - overwrite play() in Parent Class to accommodate
   * brick functionality
   */
  play() {
    setTimeout(function () {
      this.board.render();
      if (!this.paused) {
        this.playTurn();
        this.play();
      }
    }.bind(this), this.dropInterval);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const rightGame = new BattleTetris("Player 2", $('#right-board'));
  const leftGame = new BattleTetris("Player 1", $('#left-board'), {
    UP: 87,
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    DROP: 81
  });

  leftGame.addOpponent(rightGame);
  rightGame.addOpponent(leftGame);

  leftGame.registerListener(
    leftGame.opponent.addLines.bind(leftGame.opponent)
  );
  rightGame.registerListener(
    rightGame.opponent.addLines.bind(rightGame.opponent)
  );

  leftGame.board.render();
  rightGame.board.render();

  const playGames = () => {
    rightGame.play();
    leftGame.play();
  };

  modal(
    { title: 'Battle Tetris!'
    , content: 'Defeat your opponent by clearing lines on your board.'
    , buttons:
      [
        { text: 'Play', event: 'play', keyCodes: [ 13 ] }
      ]
    })
  .on('play', playGames);
});
