/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tetris = __webpack_require__(1);
	
	var _tetris2 = _interopRequireDefault(_tetris);
	
	var _tetrominos = __webpack_require__(3);
	
	var Tetrominos = _interopRequireWildcard(_tetrominos);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BattleTetris = function (_Tetris) {
	  _inherits(BattleTetris, _Tetris);
	
	  function BattleTetris(player, $hook, keyBindings) {
	    _classCallCheck(this, BattleTetris);
	
	    var _this = _possibleConstructorReturn(this, (BattleTetris.__proto__ || Object.getPrototypeOf(BattleTetris)).call(this, $hook, keyBindings));
	
	    _this.player = player;
	    _this.bricks = [];
	    _this.dropBlocksOnOpponent = null;
	    return _this;
	  }
	
	  /**
	   *  Hold pointer to opponent BattleTetris instance
	   */
	
	
	  _createClass(BattleTetris, [{
	    key: 'addOpponent',
	    value: function addOpponent(opponent) {
	      this.opponent = opponent;
	      this.registerListener(this.opponent.initializeBricks.bind(opponent));
	    }
	
	    /**
	     * accept callback from opponent (Observer design pattern)
	     */
	
	  }, {
	    key: 'registerListener',
	    value: function registerListener(cb) {
	      this.dropBlocksOnOpponent = cb;
	    }
	
	    /**
	     * call callback on opponent to drop blocks on their board
	     */
	
	  }, {
	    key: 'notifyListener',
	    value: function notifyListener(numBricks) {
	      this.dropBlocksOnOpponent(numBricks);
	    }
	
	    /**
	     * Add numBricks bricks to this.bricks array
	     */
	
	  }, {
	    key: 'initializeBricks',
	    value: function initializeBricks(numBricks) {
	      var brickLocation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	      for (var i = 0; i < numBricks; i++) {
	        var randIdx = Math.floor(Math.random() * (brickLocation.length + 1));
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
	
	  }, {
	    key: 'dropBricks',
	    value: function dropBricks() {
	      var movedBricks = [];
	      for (var i = 0; i < this.bricks.length; i++) {
	        var brick = this.bricks[i];
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
	
	  }, {
	    key: 'play',
	    value: function play() {
	      setTimeout(function () {
	        this.dropBricks();
	
	        if (!this.move(1, 0)) {
	          if (this.currentTetromino.row === 0) {
	            alert(this.player + ' loses!');
	            return;
	          }
	          var newlyClearedRows = this.clearRows();
	          this.clearedRows += newlyClearedRows;
	          this.updateDropInterval();
	          // drop bricks on opponent if rows cleared
	          if (newlyClearedRows) this.notifyListener(newlyClearedRows);
	          this.resetCurrentTetromino();
	        }
	        this.board.render();
	        this.play();
	      }.bind(this), this.dropInterval);
	    }
	  }]);
	
	  return BattleTetris;
	}(_tetris2.default);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var rightGame = new BattleTetris("Player 2", $('#right-board'));
	  var leftGame = new BattleTetris("Player 1", $('#left-board'), {
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _tetrominos = __webpack_require__(3);
	
	var Tetrominos = _interopRequireWildcard(_tetrominos);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tetris = function () {
	  function Tetris($hook, keyBindings) {
	    _classCallCheck(this, Tetris);
	
	    this.$hook = $hook; // root div in index.html
	    this.board = new _board2.default($hook);
	    this.dropInterval = 500; //milliseconds
	    this.clearedRows = 0;
	    this.resetCurrentTetromino();
	    this.keyBindings = keyBindings || {
	      UP: 38,
	      LEFT: 37,
	      RIGHT: 39,
	      DOWN: 40,
	      DROP: 191
	    };
	    document.addEventListener('keydown', this.handleKeypress.bind(this), false);
	  }
	
	  _createClass(Tetris, [{
	    key: 'resetCurrentTetromino',
	    value: function resetCurrentTetromino() {
	      this.currentTetromino = {
	        row: 0,
	        col: 4,
	        tetromino: this.nextTetromino || this.randomTetromino(),
	        rotation: 0
	      };
	      this.nextTetromino = this.randomTetromino();
	    }
	  }, {
	    key: 'randomTetromino',
	    value: function randomTetromino() {
	      var tetrominos = [Tetrominos.o, Tetrominos.i, Tetrominos.j, Tetrominos.l, Tetrominos.z, Tetrominos.s, Tetrominos.t];
	      return tetrominos[Math.floor(Math.random() * tetrominos.length)];
	    }
	  }, {
	    key: 'removeTetromino',
	    value: function removeTetromino(tetromino) {
	      this.board.eachBlock(tetromino.row, tetromino.col, tetromino.tetromino, tetromino.rotation, function (x, y) {
	        this.board.setBlock(x, y, undefined);
	      }.bind(this));
	    }
	  }, {
	    key: 'removeCurrentTetromino',
	    value: function removeCurrentTetromino() {
	      this.removeTetromino(this.currentTetromino);
	    }
	  }, {
	    key: 'placeTetromino',
	    value: function placeTetromino(tetromino) {
	      this.board.eachBlock(tetromino.row, tetromino.col, tetromino.tetromino, tetromino.rotation, function (x, y) {
	        this.board.setBlock(x, y, tetromino.tetromino);
	      }.bind(this));
	    }
	  }, {
	    key: 'placeCurrentTetromino',
	    value: function placeCurrentTetromino() {
	      this.placeTetromino(this.currentTetromino);
	    }
	  }, {
	    key: 'rotateTetromino',
	    value: function rotateTetromino(tetromino) {
	      this.removeTetromino(tetromino);
	      if (!this.board.isOccupied(tetromino.row, tetromino.col, tetromino.tetromino, (tetromino.rotation + 1) % 4)) {
	        tetromino.rotation = (tetromino.rotation + 1) % 4;
	      }
	
	      this.placeTetromino(tetromino);
	    }
	  }, {
	    key: 'rotateCurrentTetromino',
	    value: function rotateCurrentTetromino() {
	      this.rotateTetromino(this.currentTetromino);
	    }
	  }, {
	    key: 'move',
	    value: function move(dRow, dCol, tetromino) {
	      if (!tetromino) tetromino = this.currentTetromino;
	
	      var newRow = tetromino.row + dRow;
	      var newCol = tetromino.col + dCol;
	      this.removeTetromino(tetromino);
	      var moved = false;
	
	      if (!this.board.isOccupied(newRow, newCol, tetromino.tetromino, tetromino.rotation)) {
	        tetromino.row = newRow;
	        tetromino.col = newCol;
	        moved = true;
	      }
	
	      this.placeTetromino(tetromino);
	      return moved;
	    }
	
	    /**
	     * Drop current piece as far as possible
	     */
	
	  }, {
	    key: 'drop',
	    value: function drop() {
	      while (this.move(1, 0)) {
	        continue;
	      }
	    }
	
	    /**
	     * Remove completed rows from board, and update dropinterval as necessary
	     * Return number of rows cleared
	     */
	
	  }, {
	    key: 'clearRows',
	    value: function clearRows() {
	      var removedRows = 0;
	      for (var row = 0; row < this.board.gridHeight; row++) {
	        var complete = true;
	        for (var col = 0; col < this.board.gridWidth; col++) {
	          if (!this.board.blockAt(row, col) || this.board.blockAt(row, col).string === '#' // brick piece
	          ) {
	              complete = false;
	              break;
	            }
	        }
	        if (complete) {
	          this.board.removeRow(row);
	          removedRows++;
	          row--;
	        }
	      }
	      return removedRows;
	    }
	  }, {
	    key: 'updateDropInterval',
	    value: function updateDropInterval() {
	      if (this.dropInterval > 100) {
	        this.dropInterval = 500 - 10 * Math.floor(this.clearedRows / 10);
	      }
	    }
	
	    /**
	     * Handle user input according to given keyBindings
	     */
	
	  }, {
	    key: 'handleKeypress',
	    value: function handleKeypress(e) {
	      console.log(e.keyCode);
	      switch (e.keyCode) {
	        case this.keyBindings.UP:
	          this.rotateCurrentTetromino();
	          break;
	        case this.keyBindings.LEFT:
	          this.move(0, -1);
	          break;
	        case this.keyBindings.RIGHT:
	          this.move(0, 1);
	          break;
	        case this.keyBindings.DOWN:
	          this.move(1, 0);
	          break;
	        case this.keyBindings.DROP:
	          this.drop();
	          break;
	      }
	      this.board.render();
	    }
	
	    /**
	     * Main gameplay loop
	     */
	
	  }, {
	    key: 'play',
	    value: function play() {
	      setTimeout(function () {
	        if (!this.move(1, 0)) {
	          if (this.currentTetromino.row === 0) {
	            alert('you lose!');
	            return;
	          }
	          this.clearRows();
	          this.resetCurrentTetromino();
	        }
	        this.play();
	      }.bind(this), this.dropInterval);
	      this.board.render();
	    }
	  }]);
	
	  return Tetris;
	}();
	
	exports.default = Tetris;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board($hook) {
	    _classCallCheck(this, Board);
	
	    this.$hook = $hook; // root div in index.html
	    this.gridHeight = 20;
	    this.gridWidth = 10;
	    this.grid = this.initializeGrid();
	  }
	
	  /**
	   * initialize empty game grid
	   */
	
	
	  _createClass(Board, [{
	    key: "initializeGrid",
	    value: function initializeGrid() {
	      var grid = [];
	      for (var i = 0; i < this.gridHeight; i++) {
	        grid.push(new Array(this.gridWidth));
	      }
	      return grid;
	    }
	
	    /**
	     * return the tetromino object at row, col (undefined if no tetromino)
	     */
	
	  }, {
	    key: "blockAt",
	    value: function blockAt(row, col) {
	      return this.grid[row][col];
	    }
	
	    /**
	     * set block at row, col to have the properties of the tetromino containing the block
	     */
	
	  }, {
	    key: "setBlock",
	    value: function setBlock(row, col, tetromino) {
	      this.grid[row][col] = tetromino;
	    }
	
	    /**
	     * set block at row, col to undefined
	     */
	
	  }, {
	    key: "clearBlock",
	    value: function clearBlock(row, col) {
	      this.grid[row][col] = undefined;
	    }
	
	    /**
	     * perform callback function on each position of grid occupied by
	     * given tetromino located at (row, col) with given rotation.
	     */
	
	  }, {
	    key: "eachBlock",
	    value: function eachBlock(row, col, tetromino, rotation, callback) {
	      var dRow = 0,
	          dCol = 0;
	      var tetrominoBlocks = tetromino.rotations[rotation];
	      for (var currBit = 32768; currBit > 0; currBit >>= 1) {
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
	    //
	    // /**
	    //  * Place tetromino at row, col
	    //  */
	    // placeTetromino(tetromino, row, col) {
	    //
	    // }
	
	    /**
	     *  Return true if any block tetromino of given rotation located at (row, col)
	     *  will take a space already occupied on the board.
	     */
	
	  }, {
	    key: "isOccupied",
	    value: function isOccupied(row, col, tetromino, rotation) {
	      var occupied = false;
	
	      var testOccupation = function (i, j) {
	        if (i < 0 || j < 0 || i >= this.gridHeight || j >= this.gridWidth || Boolean(this.blockAt(i, j))) {
	          occupied = true;
	        }
	      }.bind(this);
	
	      this.eachBlock(row, col, tetromino, rotation, testOccupation);
	
	      return occupied;
	    }
	
	    /**
	     * Delete row from grid, adding empty row to top of grid
	     */
	
	  }, {
	    key: "removeRow",
	    value: function removeRow(row) {
	      this.grid.splice(row, 1);
	      this.grid.unshift(new Array(this.gridWidth));
	    }
	
	    /**
	     * Display this.grid in console for debugging purposes
	     */
	
	  }, {
	    key: "printGridToConsole",
	    value: function printGridToConsole() {
	      for (var row = 0; row < this.gridHeight; row++) {
	        var rowString = '';
	        for (var col = 0; col < this.gridWidth; col++) {
	          rowString += this.blockAt(row, col) ? this.grid[row][col].string : "-";
	          rowString += " ";
	        }
	        console.log(rowString);
	      }
	    }
	
	    /**
	     * Update DOM to reflect current board state
	     */
	
	  }, {
	    key: "render",
	    value: function render() {
	      this.$hook.html("");
	      for (var row = 0; row < this.gridHeight; row++) {
	        for (var col = 0; col < this.gridWidth; col++) {
	          var $tile = $("<div id=r-" + row + "-c-" + col + "></div>");
	          $tile.addClass('tile');
	          // let color = 'rgb(255, 255, 255)';
	          if (this.blockAt(row, col)) {
	            var color = this.blockAt(row, col).color;
	            $tile.css('background-color', color);
	            $tile.addClass('block');
	            $tile.addClass(this.blockAt(row, col).string);
	          }
	          this.$hook.append($tile);
	        }
	      }
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Tetrominos will be represented as 16-bit binary numbers, with each
	 * bit representing a position on a 4x4 square grid:
	 *  0  1  2  3
	 *  4  5  6  7
	 *  8  9 10 11
	 * 12 13 14 15
	 *
	 * The o piece, for example, takes up sites 0, 1, 4, and 5, and can
	 * therefore be represented by the binary number 0b1100 1100 0000 0000.
	 *
	 * In this way all of the pieces and all of their rotations can be
	 * represented with very litte overhead. Additionally, this allows for
	 * fast bit-level operations when iterating over all blocks in the game
	 * grid.
	 */
	
	// access n-th rotation of piece with o.rotations[n]
	var o = exports.o = {
	  rotations: [52224, 52224, 52224, 52224],
	  string: 'O',
	  color: 'rgb(255, 255, 0)'
	};
	
	var i = exports.i = {
	  rotations: [17476, 3840, 8738, 240],
	  string: 'I',
	  color: 'rgb(0, 231, 233)'
	};
	
	var t = exports.t = {
	  rotations: [3648, 19520, 19968, 17984],
	  string: 'T',
	  color: 'rgb(255, 0, 255)'
	};
	
	var l = exports.l = {
	  rotations: [17504, 3712, 50240, 11776],
	  string: 'L',
	  color: 'rgb(255, 128, 0)'
	};
	
	var j = exports.j = {
	  rotations: [17600, 36352, 25664, 3616],
	  string: 'J',
	  color: 'rgb(0, 0, 255)'
	};
	
	var s = exports.s = {
	  rotations: [27648, 17952, 1728, 35904],
	  string: 'S',
	  color: 'rgb(0, 255, 0)'
	};
	
	var z = exports.z = {
	  rotations: [50688, 9792, 3168, 19584],
	  string: 'Z',
	  color: 'rgb(255, 0, 0)'
	};
	
	// for battle tetris - the unclearable brick
	var brick = exports.brick = {
	  rotations: [32768, 32768, 32768, 32768],
	  string: 'B',
	  color: 'gray'
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map