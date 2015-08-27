;(function ($) {
  $.Thumbnails = function (el) {
    this.$el = $(el);
    this.$activeImg = $('.gutter-images').children().eq(0);
    this.activate(this.$activeImg);
    this.gutterIdx = 0;
    this.$images = $('.gutter-images img');

    this.fillGutterImages();

    // Event listeners
    this.$el.on('click', '.gutter-images img', this.swapActiveImg.bind(this));
    this.$el.on('mouseenter', '.gutter-images img', this.mouseEnter.bind(this));
    this.$el.on('mouseleave', '.gutter-images img', this.mouseLeave.bind(this));
    this.$el.on('click', 'a.nav', this.changeGutterIdx.bind(this));
  };

  $.Thumbnails.prototype.fillGutterImages = function () {
    $('.gutter-images').empty();

    for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
      var itemIdx = this.wrapIdx(i);
      $('.gutter-images').append(this.$images.eq(itemIdx));
    }
  };

  // Wrap the given idx around the length of the list of images
  $.Thumbnails.prototype.wrapIdx = function (idx) {
    if (idx >= this.$images.length) {
      return idx - this.$images.length;
    } else if (idx < 0) {
      return idx + this.$images.length;
    } else {
      return idx;
    }
  };

  // Add a clone of the given image to the 'active' div.
  // If there is already an item there, replace it with the new one.
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
    this.activate(this.$activeImg);
  };

  $.Thumbnails.prototype.swapActiveImg = function (event) {
    var $newImg = $(event.currentTarget);
    this.$activeImg = $newImg;
    this.activate(this.$activeImg);
  };

  $.Thumbnails.prototype.changeGutterIdx = function (event) {
    var $button = $(event.currentTarget);

    // Increment or decrement current gutter index depending on
    // which nav button was pressed.
    var newIdx;
    if ($button.hasClass("left")) {
      newIdx = this.gutterIdx -= 1;
    } else {
      newIdx = this.gutterIdx += 1;
    }

    this.gutterIdx = this.wrapIdx(newIdx);
    this.fillGutterImages();
  };

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnails(this);
    });
  };
})(jQuery);
