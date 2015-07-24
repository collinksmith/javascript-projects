var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game() {
  this.stacks = [[3, 2, 1], [], []];
}

Game.prototype.moveDisc = function(fromStack, toStack) {
  fromStack = this.stacks[fromStack];
  toStack = this.stacks[toStack];

  if (fromStack.length === 0 ) {
    console.log("Inavlid move. Choose a stack with a disc.");
  } else if ( fromStack[fromStack.length-1] > toStack[toStack.length-1] ) {
    console.log("Can't move a disc onto a smaller disc.");
  } else {
    toStack.push(fromStack.pop());
  }
};

Game.prototype.gameOver = function() {
  if (this.stacks[0].length === 0) {
    if ((this.stacks[1].length === 0) || (this.stacks[2].length === 0)) {
      return true;
    }
  }
  return false;
};

Game.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

Game.prototype.promptMove = function (callback) {
  this.print();
  reader.question("What is your move?", function (input) {
    var move = input.split(" ").map(function (el) { return parseInt(el); });
    callback(move[0], move[1]);
  });
};

Game.prototype.run = function (completionCallback) {
  var game = this;

  this.promptMove( function (idx1, idx2) {
    game.moveDisc(idx1, idx2);

    if (!game.gameOver()) {
      game.run(completionCallback);
    } else {
      console.log("Congratulations, you win!");
      completionCallback();
    }
  });
};

var game = new Game();
game.run(function () {
  reader.close();
});
