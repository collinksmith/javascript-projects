(function($) {
  $.Carousel = function (el) {
    this.$el = $(el);
    this.activeIdx = 0;
    $('div.items img:first-child').addClass('active');

    this.$el.on('click', '.slide-right', this.slide.bind(this, -1));
    this.$el.on('click', '.slide-left', this.slide.bind(this, 1));
  };

  $.Carousel.prototype.slide = function (dir) {
    var childNum = this.activeIdx + 1;
    var $activeItem = $('div.items img:nth-child(' + childNum + ')');
    $activeItem.removeClass('active');

    this.changeActiveIdx(dir);
    var $items = $('div.items').children();
    $items.eq(this.activeIdx).addClass('active');
    this.setLeftOrRight(dir);

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

  $.Carousel.prototype.setLeftOrRight = function (dir) {
    var $items = $('div.items').children();
    $items.removeClass('left').removeClass('right');

    var newIdx = this.wrapIdx(this.activeIdx + dir);
    if (dir === 1) {
      $items.eq(this.activeIdx).addClass('right');
    } else {
      $items.eq(this.activeIdx).addClass('left');
    }
  };

  $.fn.carousel = function () {
    return this.each(function () {
      new $.Carousel(this);
    });
  };
})(jQuery);
