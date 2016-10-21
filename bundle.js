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
	
	var _board = __webpack_require__(1);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _tetrominos = __webpack_require__(2);
	
	var Tetrominos = _interopRequireWildcard(_tetrominos);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tetris = function () {
	  function Tetris($hook) {
	    _classCallCheck(this, Tetris);
	
	    this.$hook = $hook; // root div in index.html
	    this.board = new _board2.default($hook);
	    this.resetCurrentTetromino();
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
	    key: 'removeCurrentTetromino',
	    value: function removeCurrentTetromino() {
	      this.board.eachBlock(this.currentTetromino.row, this.currentTetromino.col, this.currentTetromino.tetromino, this.currentTetromino.rotation, function (x, y) {
	        this.board.setBlock(x, y, undefined);
	      }.bind(this));
	    }
	  }, {
	    key: 'placeCurrentTetromino',
	    value: function placeCurrentTetromino() {
	      this.board.eachBlock(this.currentTetromino.row, this.currentTetromino.col, this.currentTetromino.tetromino, this.currentTetromino.rotation, function (x, y) {
	        this.board.setBlock(x, y, this.currentTetromino.tetromino);
	      }.bind(this));
	    }
	  }, {
	    key: 'rotateCurrentTetromino',
	    value: function rotateCurrentTetromino() {
	      this.removeCurrentTetromino();
	      if (!this.board.isOccupied(this.currentTetromino.row, this.currentTetromino.col, this.currentTetromino.tetromino, (this.currentTetromino.rotation + 1) % 4)) {
	        this.currentTetromino.rotation = (this.currentTetromino.rotation + 1) % 4;
	      }
	
	      this.placeCurrentTetromino();
	    }
	
	    /**
	     * move current tetromino by dRow, dCol if space is available for it to move
	     * return true if moved, false o.w.
	     */
	
	  }, {
	    key: 'move',
	    value: function move(dRow, dCol) {
	      var newRow = this.currentTetromino.row + dRow;
	      var newCol = this.currentTetromino.col + dCol;
	      this.removeCurrentTetromino();
	      var moved = false;
	
	      if (!this.board.isOccupied(newRow, newCol, this.currentTetromino.tetromino, this.currentTetromino.rotation)) {
	        this.currentTetromino.row = newRow;
	        this.currentTetromino.col = newCol;
	        moved = true;
	      }
	
	      this.placeCurrentTetromino();
	      return moved;
	    }
	  }, {
	    key: 'clearRows',
	    value: function clearRows() {
	      for (var row = 0; row < this.board.gridHeight; row++) {
	        var complete = true;
	        for (var col = 0; col < this.board.gridWidth; col++) {
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
	  }, {
	    key: 'handleKeypress',
	    value: function handleKeypress(e) {
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
	      }.bind(this), 500);
	      this.board.render();
	    }
	  }]);
	
	  return Tetris;
	}();
	
	document.addEventListener("DOMContentLoaded", function () {
	  var tetris = new Tetris($('#hook'));
	  tetris.play();
	});

/***/ },
/* 1 */
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
	
	    /**
	     * Place tetromino at row, col
	     */
	
	  }, {
	    key: "placeTetromino",
	    value: function placeTetromino(tetromino, row, col) {}
	
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
	  }, {
	    key: "removeRow",
	    value: function removeRow(row) {
	      this.grid.splice(row, 1);
	      this.grid.unshift(new Array(this.gridWidth));
	    }
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
	  }, {
	    key: "render",
	    value: function render() {
	      this.$hook.html("");
	      for (var row = 0; row < this.gridHeight; row++) {
	        for (var col = 0; col < this.gridWidth; col++) {
	          var $tile = $("<div id=r-" + row + "-c-" + col + "></div>");
	          $tile.addClass('tile');
	          var color = 'rgb(255, 255, 255)';
	          if (this.blockAt(row, col)) {
	            color = this.blockAt(row, col).color;
	            $tile.addClass('block');
	          }
	          $tile.css('background-color', color);
	          this.$hook.append($tile);
	        }
	      }
	      var $nextPiece = $("<div class='next-piece'><div>");
	
	      this.$hook.append($nextPiece);
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 2 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map