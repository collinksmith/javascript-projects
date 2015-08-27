function Board () {
  this.grid = [[null, null, null],
               [null, null, null],
               [null, null, null]];
}

Board.prototype.placeMark = function (pos, mark) {
  this.grid[pos[1]][pos[0]] = mark;
};

Board.prototype.print = function () {
  var output = "";

  this.grid.forEach( function(row) {
    var outputRow = row.map( function (cell) {
      return cell === null ? "_" : cell;
    });

    output += outputRow.join(" ");
    output += "\n";
  });

  console.log(output);
};

Board.prototype.validMove = function (pos) {
  if (this.grid[pos[1]][pos[0]] === null) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.tieGame = function () {
  var board = this;
  return !this.grid.some( function (row, rIndex) {
    return row.some ( function (cell, cIndex) {
      return board.validMove([rIndex, cIndex]);
    });
  });
};

Board.prototype.gameOver = function () {
  var lines = this.grid.concat(this.verticals()).concat(this.diagonals());

  return lines.some(function (row) {
    return row.every(function (cell) {
      return cell === row[0] && row[0] !== null;
    } );
  } );
};

Board.prototype.verticals = function() {
  var result = [[], [], []];

  for (var row = 0; row < this.grid.length; row++) {
    for (var col = 0; col < this.grid[row].length; col++) {
       result[row].push( this.grid[col][row] );
    }
  }

  return result;
};

Board.prototype.diagonals = function() {
  var result = [[], []];

  var mapify = function (pos) {
    return this.grid[pos[1]][pos[0]];
  }.bind(this);

  result[0] = [[0,0], [1,1], [2,2]].map(mapify);

  result[1] = [[2,0], [1,1], [0,2]].map(mapify);

  return result;
};

module.exports = Board;
