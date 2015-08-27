var my_uniq = function () {
  var result = []
  this.forEach(function(el) {
    if (result.indexOf(el) < 0) {
      result.push(el)
    }
  })
  return result
}

var a = [1,1,2,3,1,2,4]

a.constructor.prototype.my_uniq = my_uniq

function two_sum() {
  var result = []
  var elems = {}
  for (var i = 0; i < this.length; i++) {
    if (this[i] in elems){
        result.push([elems[this[i]], i])
    }
     elems[-this[i]] = i
  }
  return result
}

Array.prototype.two_sum = two_sum

function my_transpose(matrix){
  var result = []
  for (var i = 0; i < matrix[0].length; i++) {
    result.push([])
  }
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      result[j][i] = matrix[i][j]
    }
  }
  return result
}

function best_days(stock_values){
  var best_profit = 0
  var best_days = [0,0]
  for (var i = 0; i < stock_values.length; i++) {
    for (var j = i + 1; j < stock_values.length; j++) {
      if (stock_values[j] - stock_values[i] > best_profit){
        best_profit = stock_values[j] - stock_values[i]
        best_days = [i,j]
      }
    }
  }
  return best_days
}

console.log(best_days([5,2,6,16,14]))
