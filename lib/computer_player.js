class ComputerPlayer {
  constructor(game) {
    this.game = game;
  }

  destroyAllEnemies() {
    setTimeout(function () {
      if (!this.game.paused) {
        this.placePiece();
      }
      this.destroyAllEnemies();
    }.bind(this), 200);
  }

  /**
   * AI Pseudocode:
   *
   * iterate over possible horizontal positions
   *   iterate over possible rotations
   *      record lines cleared with move
   *      record new height attained with move
   * if possible to clear lines
   *    make move which clears most lines
   * else
   *    make move which minimizes new height
   *
   *
   * reach goal: eliminate overhang situations from possible moves
   */
  placePiece() {
    // let maxLinesCleared = 0;
    // let lowestNewHeight = 20;
    // let bestLineMove;
    // let bestHeightMove;
    // for(let dX = -4; dX < 7; dX++) {
    //   for(let dRot = 0; dRot < 4; dRot++) {
    //     let linesCleared = 0;
    //     let newHeight = 0;
    //     const dupedBoard = this.game.board.dup();
    //
    //     // MOVE PIECE
    //     let rot = 0;
    //     while (rot < dRot) {
    //       this.game.rotateCurrentTetromino();
    //       rot++;
    //     }
    //
    //     this.game.move(0, )
    //
    //
    //     for (let row = 0; row < dupedBoard.gridHeight; row++) {
    //       let complete = true;
    //       for (let col = 0; col < dupedBoard.gridWidth; col++) {
    //         if (dupedBoard.blockAt(row, col)) newHeight = 0;
    //         if (
    //           !dupedBoard.blockAt(row, col) ||
    //           dupedBoard.blockAt(row,col).string === 'B' // brick piece
    //         ) {
    //           complete = false;
    //           break;
    //         }
    //       }
    //       if (complete) linesCleared++;
    //     }
    //     if (linesCleared > maxLinesCleared) {
    //       maxLinesCleared = linesCleared;
    //       bestLineMove = [dX, dRot];
    //     }
    //     if (newHeight < lowestNewHeight) {
    //       lowestNewHeight = newHeight;
    //       bestHeightMove = [dX, dRot];
    //     }
    //   }
    // }
    //
    // if (bestLineMove) { this.game.; }
    //
    const randRot = this.randBetween(0, 1);
    const randMove = this.randBetween(-1, 1);

    if (randRot) this.game.rotateCurrentTetromino();
    this.game.move(0, randMove);
  }

  // let removedRows = 0;
  // for (let row = 0; row < this.board.gridHeight; row++) {
  //   let complete = true;
  //   for (let col = 0; col < this.board.gridWidth; col++) {
  //     if (
  //       !this.board.blockAt(row, col) ||
  //       this.board.blockAt(row,col).string === 'B' // brick piece
  //     ){
  //       complete = false;
  //       break;
  //     }
  //   }
  //   if (complete) {
  //     this.board.removeRow(row);
  //     removedRows++;
  //     row--;
  //   }
  // }
  // return removedRows;

  /**
   * return random integer between min and max, inclusive
   */
  randBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

class Move {
  constructor(dX, dRot, linesCleared, newHeight) {
    this.dX = dX;
    this.dRot = dRot;
    this.linesCleared = linesCleared;
    this.newHeight = newHeight;
  }
}

export default ComputerPlayer;
