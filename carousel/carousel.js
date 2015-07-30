(function($) {
  $.Carousel = function (el) {
    this.$el = $(el);
    this.activeIdx = 0;
    $('div.items img:first-child').addClass('active');

    this.$el.on('click', '.slide-right', this.slide.bind(this, 1));
    this.$el.on('click', '.slide-left', this.slide.bind(this, -1));
  };

  $.Carousel.prototype.slide = function (dir) {
    var childNum = this.activeIdx + 1;
    var $activeItem = $('div.items img:nth-child(' + childNum + ')');
    $activeItem.removeClass('active');
    this.changeActiveIdx(dir);
    $('div.items').children().eq(this.activeIdx).addClass('active');
  };

  $.Carousel.prototype.changeActiveIdx = function (dir) {
    var maxIdx = $('div.items').children().length - 1;
    this.activeIdx += dir;

    if (this.activeIdx < 0) {
      this.activeIdx = maxIdx;
    } else if (this.activeIdx > maxIdx) {
      this.activeIdx = 0;
    }
  };

  $.fn.carousel = function () {
    return this.each(function () {
      new $.Carousel(this);
    });
  };
})(jQuery);
