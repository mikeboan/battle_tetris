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
	
	var _modal = __webpack_require__(1);
	
	var _modal2 = _interopRequireDefault(_modal);
	
	var _tetris = __webpack_require__(6);
	
	var _tetris2 = _interopRequireDefault(_tetris);
	
	var _tetrominos = __webpack_require__(8);
	
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
	      // this.registerListener(this.opponent.initializeBricks.bind(opponent));
	      this.registerListener(this.opponent.addLines.bind(opponent));
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
	     * Add numLines lines of unclearable bricks
	     */
	
	  }, {
	    key: 'addLines',
	    value: function addLines(numLines) {
	      this.removeCurrentTetromino();
	      for (var i = 0; i < numLines; i++) {
	        this.board.pushRow();
	        for (var col = 0; col < this.board.gridWidth; col++) {
	          this.board.setBlock(this.board.gridHeight - 1, col, Tetrominos.brick);
	        }
	      }
	      this.placeCurrentTetromino();
	    }
	
	    /**
	     * Main gameplay loop - overwrite play() in Parent Class to accommodate
	     * brick functionality
	     */
	
	  }, {
	    key: 'play',
	    value: function play() {
	      setTimeout(function () {
	        // this.dropBricks();
	
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
	
	  var playGames = function playGames() {
	    rightGame.play();
	    leftGame.play();
	  };
	
	  (0, _modal2.default)({ title: 'Battle Tetris!',
	    content: 'Defeat your opponent by clearing lines on your board.',
	    buttons: [{ text: 'Play', event: 'play', keyCodes: [13] }]
	  }).on('play', playGames);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = modal
	
	/*
	 * This module provides generic modal dialog functionality
	 * for blocking the UI and obtaining user input.
	 *
	 * Usage:
	 *
	 *   modal([options])
	 *     [.on('event')]...
	 *
	 *   options:
	 *     - title (string)
	 *     - content (jQuery DOM element / raw string)
	 *     - buttons (array)
	 *       - text (string) the button text
	 *       - event (string) the event name to fire when the button is clicked
	 *       - className (string) the className to apply to the button
	 *       - iconClassName (string) adds an `i` element before button text with the given class(es)
	 *       - keyCodes ([numbers]) the keycodes of shortcut keys for the button
	 *     - clickOutsideToClose (boolean) whether a click event outside of the modal should close it
	 *     - clickOutsideEvent (string) the name of the event to be triggered on clicks outside of the modal
	 *     - className (string) optional class to apply to the modal element
	 *     - removeMethod (string) which jQuery method to remove the modal contents with (default: remove)
	 *         This is useful when you want to append the contents to the DOM again later. In which case
	 *         set this to 'detach' so that bound event handlers aren't removed.
	 *
	 *  Events will be fired on the modal according to which button is clicked.
	 *  Defaults are confirm/cancel, but these can be overriden in your options.
	 *
	 *  Example:
	 *
	 *   modal(
	 *     { title: 'Delete object'
	 *     , content: 'Are you sure you want to delete this object?'
	 *     , buttons:
	 *       [ { text: 'Don’t delete', event: 'cancel' }
	 *       , { text: 'Delete', event: 'confirm', className: 'button-danger', iconClassName: 'icon-delete' }
	 *       ]
	 *     })
	 *     .on('confirm', deleteItem)
	 */
	
	var Emitter = __webpack_require__(2).EventEmitter
	  , template = __webpack_require__(3)
	
	  , defaults =
	    { title: 'Are you sure?'
	    , content: 'Please confirm this action.'
	    , buttons:
	      [ { text: 'Cancel', event: 'cancel', className: '', iconClassName: '', keyCodes: [ 27 ] }
	      , { text: 'Confirm', event: 'confirm', className: '', iconClassName: '' }
	      ]
	    , clickOutsideToClose: true
	    , clickOutsideEvent: 'cancel'
	    , className: ''
	    , removeMethod: 'remove'
	    , fx: true // used for testing
	    }
	
	function modal(options) {
	  return new Modal($.extend({}, defaults, options))
	}
	
	function Modal(settings) {
	
	  Emitter.call(this)
	
	  var el = $(template(settings))
	    , modal = el.find('.js-modal')
	    , content = el.find('.js-content')
	    , buttons = el.find('.js-button')
	    , keys = {}
	    , transitionFn = $.fn.transition ? 'transition' : 'animate'
	
	  if (typeof settings.content === 'string') {
	    content.append($('<p/>', { text: settings.content }))
	  } else {
	    content.append(settings.content)
	  }
	
	  modal.addClass(settings.className)
	
	  // Cache the button shortcut keycodes
	  $.each(settings.buttons, function (i, button) {
	    if (!button.keyCodes) return
	    $.each(button.keyCodes, function (n, keyCode) {
	      keys[keyCode + ''] = i
	    })
	  })
	
	  /*
	   * Reposition the modal in the middle of the screen
	   */
	  function centre() {
	    if (modal.outerHeight(true) < $(window).height()) {
	      var diff = $(window).height() - modal.outerHeight(true)
	      modal.css({ top: diff / 2 })
	    }
	  }
	
	  /*
	   * Remove a modal from the DOM
	   * and tear down its related events
	   */
	  var removeModal = $.proxy(function () {
	    var listenersWithCallback = 0
	
	    $.each(this.listeners('beforeClose'), function(i, fn) {
	      if (isFunctionWithArguments(fn)) {
	        listenersWithCallback++
	      }
	    })
	
	    if (listenersWithCallback > 0) {
	      var currentCallsCount = 0
	        , performClose = function() {
	          if (++currentCallsCount === listenersWithCallback) {
	            performRemoveModal()
	          }
	        }
	      this.emit('beforeClose', performClose)
	    } else {
	      this.emit('beforeClose')
	      performRemoveModal()
	    }
	  }, this)
	
	  function isFunctionWithArguments(fn) {
	    return fn.length > 0
	  }
	
	  var performRemoveModal = $.proxy(function () {
	    el[transitionFn]({ opacity: 0 }, settings.fx ? 200 : 0)
	    // Do setTimeout rather than using the transition
	    // callback as it potentially fails to get called in IE10
	    setTimeout(function () {
	      el[settings.removeMethod]()
	    }, settings.fx ? 200 : 0)
	    modal[transitionFn]({ top: $(window).height() }, settings.fx ? 200 : 0)
	    this.emit('close')
	    this.removeAllListeners()
	    $(document).off('keyup', keyup)
	    $(window).off('resize', centre)
	  }, this)
	
	  // Expose so you can control externally
	  this.close = function() {
	    removeModal()
	  }
	
	  // Expose so you can recentre externally
	  this.centre = centre
	
	  /*
	   * Respond to a key event
	   */
	  var keyup = $.proxy(function (e) {
	    var button = keys[e.keyCode + '']
	    if (typeof button !== 'undefined') {
	      this.emit(settings.buttons[button].event)
	      removeModal()
	    }
	  }, this)
	
	  // Assign button event handlers
	  buttons.each($.proxy(function (i, el) {
	    $(el).on('click', $.proxy(function () {
	      this.emit(settings.buttons[i].event)
	      removeModal()
	    }, this))
	  }, this))
	
	  $(document).on('keyup', keyup)
	
	  // Listen for clicks outside the modal
	  el.on('click', $.proxy(function (e) {
	    if ($(e.target).is(el)) {
	      this.emit(settings.clickOutsideEvent)
	      // Clicks outside should close?
	      if (settings.clickOutsideToClose) {
	        removeModal()
	      }
	    }
	  }, this))
	
	  // Set initial styles
	  el.css({ opacity: 0 })
	  modal.css({ top: '0%' })
	
	  // Append to DOM
	  $('body').append(el)
	
	  // transition in
	  el[transitionFn]({ opacity: 1 }, settings.fx ? 100 : 0)
	
	  if (modal.outerHeight(true) < $(window).height()) {
	    var diff = $(window).height() - modal.outerHeight(true)
	    modal[transitionFn]({ top: (diff / 2) + 10 }, settings.fx ? 200 : 0, function () {
	      modal[transitionFn]({ top: diff / 2 }, settings.fx ? 150 : 0)
	    })
	  }
	
	  $(window).on('resize', centre)
	
	}
	
	// Be an emitter
	Modal.prototype = Emitter.prototype


/***/ },
/* 2 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(4);module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<div class="modal-overlay"><div class="modal-content js-modal">');
	if ( (title))
	{
	buf.push('<h1 class="modal-title">' + escape((interp = title) == null ? '' : interp) + '</h1>');
	}
	buf.push('<div class="js-content"></div>');
	if ( (buttons.length))
	{
	buf.push('<div class="modal-controls">');
	// iterate buttons
	;(function(){
	  if ('number' == typeof buttons.length) {
	
	    for (var $index = 0, $$l = buttons.length; $index < $$l; $index++) {
	      var button = buttons[$index];
	
	buf.push('<button');
	buf.push(attrs({ "class": ('js-button') + ' ' + (button.className) }, {"class":true}));
	buf.push('>');
	if ( button.iconClassName)
	{
	buf.push('<i');
	buf.push(attrs({ "class": (button.iconClassName) }, {"class":true}));
	buf.push('></i> ');
	}
	buf.push('' + escape((interp = button.text) == null ? '' : interp) + '</button>');
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in buttons) {
	      $$l++;      var button = buttons[$index];
	
	buf.push('<button');
	buf.push(attrs({ "class": ('js-button') + ' ' + (button.className) }, {"class":true}));
	buf.push('>');
	if ( button.iconClassName)
	{
	buf.push('<i');
	buf.push(attrs({ "class": (button.iconClassName) }, {"class":true}));
	buf.push('></i> ');
	}
	buf.push('' + escape((interp = button.text) == null ? '' : interp) + '</button>');
	    }
	
	  }
	}).call(this);
	
	buf.push('</div>');
	}
	buf.push('</div></div>');
	}
	return buf.join("");
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(5).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(7);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _tetrominos = __webpack_require__(8);
	
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
	          if (!this.board.blockAt(row, col) || this.board.blockAt(row, col).string === 'B' // brick piece
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
	
	    /**
	     * Increase game speed as more lines are cleared
	     */
	
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
	      switch (e.keyCode) {
	        case this.keyBindings.UP:
	          e.preventDefault();
	          this.rotateCurrentTetromino();
	          break;
	        case this.keyBindings.LEFT:
	          e.preventDefault();
	          this.move(0, -1);
	          break;
	        case this.keyBindings.RIGHT:
	          e.preventDefault();
	          this.move(0, 1);
	          break;
	        case this.keyBindings.DOWN:
	          e.preventDefault();
	          this.move(1, 0);
	          break;
	        case this.keyBindings.DROP:
	          e.preventDefault();
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
/* 7 */
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
	     * Adds enpty row at bottom of grid, removing top row to make space
	     */
	
	  }, {
	    key: "pushRow",
	    value: function pushRow(rowLocation) {
	      this.grid.shift();
	      this.grid.push(new Array(this.gridWidth));
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
/* 8 */
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