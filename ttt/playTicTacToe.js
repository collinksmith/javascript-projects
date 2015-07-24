var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var ttt = require("./index");

var game = new ttt.Game(reader);
game.run( function () {
  reader.close();
});
