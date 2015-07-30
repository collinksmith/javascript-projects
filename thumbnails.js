;(function ($) {
  $.Thumbnails = function (el) {
    this.$el = $(el);
    this.$activeImg = $('.gutter-images').children().eq(0);
    this.activate(this.$activeImg);
    this.gutterIdx = 0;
    this.$images = $('.gutter-images img');

    this.fillGutterImages();

    this.$el.on('click',
                '.gutter-images img',
                this.swapActiveImg.bind(this));
    this.$el.on('mouseenter',
                '.gutter-images img',
                this.mouseEnter.bind(this));
    this.$el.on('mouseleave',
                '.gutter-images img',
                this.mouseLeave.bind(this));
  };

  $.Thumbnails.prototype.fillGutterImages = function () {
    
  };

  $.Thumbnails.prototype.activate = function ($img) {
    var $clonedImg = $img.clone();
    if ($('.active').children().length > 0) {
      $('.active').children().replaceWith($clonedImg);
    } else {
      $('.active').append($clonedImg);
    }
  };

  $.Thumbnails.prototype.mouseEnter = function (event) {
    var $newImg = $(event.currentTarget);
    this.activate($newImg);
  };

  $.Thumbnails.prototype.mouseLeave = function (event) {
    console.log("got to mouse leave");
    this.activate(this.$activeImg);
  };

  $.Thumbnails.prototype.swapActiveImg = function (event) {
    var $newImg = $(event.currentTarget);
    this.$activeImg = $newImg;
    this.activate(this.$activeImg);
  };

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnails(this);
    });
  };
})(jQuery);
