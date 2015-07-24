function Clock () {
}

Clock.TICK = 50;

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  var time = new Date();
  this.hours = time.getHours();
  this.minutes = time.getMinutes();
  this.seconds = time.getSeconds();
  // 2. Call printTime.
  this.printTime();
  // 3. Schedule the tick interval.

  var that = this;

  setInterval(function () {
    that._tick();
  }, Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  this.seconds += 5;
  this._handleTick();
  // 2. Call printTime.
  this.printTime();
};

Clock.prototype._handleTick = function () {
  if (this.seconds >= 60) {
    this.seconds = 0;
    this.minutes++;
  }
  if (this.minutes >= 60) {
    this.minutes = 0;
    this.hours++;
  }
};

var clock = new Clock();
clock.run();
