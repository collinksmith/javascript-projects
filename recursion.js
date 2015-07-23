function range(start, end) {
  if ( end < start ) {
    return [];
  } else {
    var result = [start];
    return result.concat(range(start +1, end));
  }
}
// a = range(1, 10);
// console.log(a);

function sum_rec(array) {
  if ( array.length === 0 ) {
    return 0;
  } else {
    return array[0] + sum_rec(array.slice(1));
  }
}

// a = sum_rec([1,2,3,4]);
// console.log(a);

function sum_it(array) {
  result = 0;
  array.forEach( function (el) {
    result += el;
  });
  return result;
}

// a = sum_it([1,2,3,4]);
// console.log(a);

function exp1(num, x) {
  if (x === 0) {
    return 1;
  } else {
    return num * exp1(num, x - 1);
  }
}

function exp2(num, x) {
  if (x === 0) {
    return 1;
  } else if (x === 1){
    return num;
  } else if (x%2 === 0){
    var exponent = exp2(num, x/2)
    return exponent * exponent;
  } else{
    var exponent = exp2(num, (x-1)/2)
    return num * (exponent*exponent);
  }
}

// a = exp1(2, 3);
// console.log(a);

function fib(n) {
  if (n == 1){
    return [1];
  }else if (n ==2) {
    return [1,1];
  } else {
    var prev_fibs = fib(n-1);
    return prev_fibs.concat([prev_fibs[prev_fibs.length-1] + prev_fibs[prev_fibs.length-2]]);
  }
}
// a = fib(6)
// console.log(a);

function bsearch(array, target) {
  if (array.length === 0){
    return null;
  }
  var mid = Math.floor(array.length / 2)

  if (array[mid] === target){
    return mid;
  } else if (array[mid] > target) {
    return bsearch(lower_array, target);
  } else {
    var upper_array = array.slice((mid + 1));
    var result = bsearch(upper_array, target);
    if (result === null) {
      return null;
    } else {
      return mid + 1 + result;
    }
  }
}

// console.log(bsearch([1, 2, 3], 1))
// console.log(bsearch([2, 3, 4, 5], 3))
// console.log(bsearch([2, 4, 6, 8, 10], 6))
// console.log(bsearch([1, 3, 4, 5, 9], 5))
// console.log(bsearch([1, 2, 3, 4, 5, 6], 6))
// console.log(bsearch([1, 2, 3, 4, 5, 6], 0))
// console.log(bsearch([1, 2, 3, 4, 5, 7], 6))

function makeChange(aim, coins) {
  if (aim === 0){
    return []
  }
  var best_length = aim
  var best_coins = []
  for (var i = 0; i < coins.length; i++) {
    if (aim - coins[i] < 0){
      var result = makeChange(aim, coins.slice(i+1));
    } else {
      var result = [coins[i]].concat(makeChange(aim - coins[i], coins.slice(i)));
    }
    if (result.length < best_length){
      best_coins = result;
      best_length = result.length;
    }
  }
  return best_coins;
}

// var a = makeChange(14, [10, 7, 1]);
// console.log(a);

Array.prototype.mergeSort = function () {
  if (this.length <= 1) {
    return this;
  }

  var mid = Math.floor(this.length / 2);

  var bottom_array = this.slice(0, mid).mergeSort();
  var top_array = this.slice(mid).mergeSort();

  return merge(bottom_array, top_array)
}

function merge(bottom_array, top_array) {
  if (bottom_array.length === 0 ) {
    return top_array;
  } else if (top_array.length === 0 ) {
    return bottom_array;
  } else if (bottom_array[0] < top_array[0]) {
    var first_el = [bottom_array[0]];
    return first_el.concat(merge(bottom_array.slice(1), top_array))
  } else {
    var first_el = [top_array[0]];
    return first_el.concat(merge(bottom_array, top_array.slice(1)));
  }
}

// var a = [5,1,78,13,4,6];
// console.log(a.mergeSort());

function subsets(array) {
  if (array.length === 0) {
    return [[]];
  }
  var without_first = subsets(array.slice(1));
  var first = [array[0]];
  var with_first = without_first.map( function (el){
    return first.concat(el);
  })
  return without_first.concat(with_first);
}

// var a = [1,2,3];
// console.log(subsets(a).map( function (el){
//   return el.toString();
// }));
