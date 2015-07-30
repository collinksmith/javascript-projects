(function($) {
  $.Carousel = function (el) {
    this.$el = $(el);
    this.activeIdx = 0;
    $('div.items img:first-child').addClass('active');

    this.$el.on('click', '.slide-right', this.slide.bind(this, -1));
    this.$el.on('click', '.slide-left', this.slide.bind(this, 1));
    this.$el.on('transitionend', this.removeClasses.bind(this, event));
  };

  $.Carousel.prototype.slide = function (dir) {
    // set old active item as an instance variable
    var childNum = this.activeIdx + 1;
    this.$oldActiveItem = $('div.items img:nth-child(' + childNum + ')');

    // change active idx and assign new active item to variable
    this.changeActiveIdx(dir);
    var $newActiveItem = $('div.items').children().eq(this.activeIdx);

    // update classes on new active item
    $newActiveItem.addClass('active');
    this.setLeftAndRight(dir, this.$oldActiveItem, $newActiveItem);
    setTimeout(function () {
      $newActiveItem.removeClass('right').removeClass('left');
    }.bind(this), 0);
  };

  $.Carousel.prototype.changeActiveIdx = function (dir) {
    var maxIdx = $('div.items').children().length - 1;
    var newActiveIdx = this.activeIdx + dir;

    this.activeIdx = this.wrapIdx(newActiveIdx);
  };

  $.Carousel.prototype.wrapIdx = function (newIdx) {
    var maxIdx = $('div.items').children().length - 1;

    if (newIdx < 0) {
      newIdx = maxIdx;
    } else if (newIdx > maxIdx) {
      newIdx = 0;
    }

    return newIdx;
  };

  $.Carousel.prototype.setLeftAndRight =
    function (dir, $oldActiveItem, $newActiveItem) {
      var $items = $('div.items').children();
      $items.removeClass('left').removeClass('right');

      var newIdx = this.wrapIdx(this.activeIdx + dir);
      if (dir === 1) {
        $newActiveItem.addClass('right');
        $oldActiveItem.addClass('left');
      } else {
        $newActiveItem.addClass('left');
        $oldActiveItem.addClass('right');
      }
  };

  $.Carousel.prototype.removeClasses = function (event) {
    this.$oldActiveItem.removeClass('active')
                       .removeClass('left')
                       .removeClass('right');
  };

  $.fn.carousel = function () {
    return this.each(function () {
      new $.Carousel(this);
    });
  };
})(jQuery);
