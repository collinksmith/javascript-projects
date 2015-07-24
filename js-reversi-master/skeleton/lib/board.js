var Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid (size) {
  var board = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(null);
    }
    board.push(row);
  }
board[3][4] = new Piece("black");
board[4][3] = new Piece("black");
board[3][3] = new Piece("white");
board[4][4] = new Piece("white");
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid(8);
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if isValidPos(pos){
    return this.grid[pos[1]][pos[0]];
  } else{
    throw "Not a valid position";
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves.length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  return (this.getPiece(pos).color === color);
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return (!(this.getPiece(pos) === null));
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return (!(this.hasMove("white") || this.hasMove("black")));
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  return (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7 );
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  if (!(board.isValidPos(pos))){
    return null;
  }else if (!(board.isOccupied(pos))){
    return null;
  }else if (board.getPiece(pos).color === color){
    if (piecesToFlip.length === 0){
      return null;
    } else {
      return piecesToFlip;
    }
  }
  var new_pos = _moveOneDir(pos, dir);
  var new_piecesToFlip = piecesToFlip.concat([pos]);
  return _positionsToFlip(board, new_pos, dir, new_piecesToFlip);
}

function _moveOneDir (pos, dir) {
  var new_pos = [];
  new_pos[0] = pos[0] + dir[0];
  new_pos[1] = pos[1] + dir[1];
  return new_pos;
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if ( this.validMove(pos, color) ) {
    this.grid[pos[1]][pos[0]] = new Piece(color);
    var positions = this.getFlipPositions(pos, color);

    positions.forEach( function (pos) {
      var piece = this.getPiece(pos);
      piece.flip;
    })
  } else {
    throw "Invalid move";
  }
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  output = ""
  this.grid.forEach ( function (row) {
    row.forEach ( function (cell) {
      if (cell) {
        output += cell.toString;
      } else {
        output += "_";
      }
      output += "\n";
    }
  })
  console.log(output);
  return output;
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if ( !(isValidPos(pos) && !isOccupied(pos))) {
    return false;
  }
  var positions = this.getFlipPositions(pos, color)
  return positions.length > 0;
};

Board.prototype.getFlipPositions = function (pos, color) {
  var positions = [];
  this.DIRS.forEach( function (dir) {
    var new_pos = _moveOneDir(pos, dir);
    var positions = positions.concat(_positionsToFlip(this, new_pos, color, dir, []));
  })
  return positions;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  var moves = [];
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      if (this.validMove([x,y], color)){
        moves.push([x,y]);
      }
    }
  }
  return moves;
};

module.exports = Board;
