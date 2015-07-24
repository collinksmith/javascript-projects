var Board = require("./board");

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.currentMark = "X";
}

Game.prototype.run = function (completionCallback) {
  if (this.board.gameOver() || this.board.tieGame()) {
    completionCallback();
    this.reader.close();
    this.board.print();
    if (this.board.gameOver()) {
      console.log("YOU WINNER, YOU!");
    } else {
      console.log("TIE GAME!");
    }
  } else {
    this.board.print();

    this.promptMove(function(move) {
      if (this.board.validMove(move)) {
        this.board.placeMark(move, this.currentMark);
        this.switchMark();
      } else {
        console.log("Invalid move!");
      }
      this.run(completionCallback);
    }.bind(this));
  }
};

Game.prototype.switchMark = function () {
  this.currentMark = this.currentMark === "X" ? "O" : "X";
};

Game.prototype.promptMove = function (callback) {
  var message = "Player, " + this.currentMark + ", where do you want to move?";
  reader.question( message, function (input) {
    var move = input.split(" ").map( function(el) {
      return parseInt(el);
    } );

    callback(move);
  });
};

var game = new Game(reader);
game.run(function() {
  console.log("Pizza!");
} );
