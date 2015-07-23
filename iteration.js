Array.prototype.bubbleSort = function () {
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this.length - 1; j++) {
      if (this[j] > this[j+1]){
        var placeholder = this[j+1]
        this[j+1] = this[j];
        this[j] = placeholder;
      }
    }
  }
  return this;
}

// var a = [1,5,2,4,7,1,5];
// var b = a.bubbleSort();
//
// console.log(b);

String.prototype.subStrings = function () {
  result = [];
  for (var beginning = 0; beginning < this.length; beginning++) {
    for (var end = beginning + 1; end < this.length + 1; end++) {
      result.push(this.slice(beginning, end));
    }
  }
  return result
}

var a = "cat";
var b = a.subStrings();
console.log(b);
