var my_uniq2 = function () {
  var result = []
  this.forEach(function(el) {
    if (result.indexOf(el) < 0) {
      result.push(el)
    }
  })
  return result
}

var a = [1,1,2,3,1,2,4]

a.constructor.prototype.my_uniq = my_uniq2

console.log(a.my_uniq())
