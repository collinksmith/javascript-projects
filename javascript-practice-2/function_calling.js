Function.prototype.myBind = function(context) {
  var fn = this;
  return function() {
    fn.apply(context);
  };
};

var obj = {
  xeno: 7,
  lenny: function() {
    console.log(this.xeno);
  }
};

obj.lenny();

function callLenny(lenny) {
  lenny();
}

callLenny(obj.lenny.myBind(obj));
