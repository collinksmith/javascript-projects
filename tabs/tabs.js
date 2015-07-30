(function($) {
  $.Tabs = function(el) {
    this.$el = $(el);
    this.$contentTabs = $('ul[data-content-tabs]');
    this.$activeTab = $('#content-tabs > .active');
    this.$el.on('click', 'a', this.clickTab.bind(this));
    this.$el.on('transitionend', this.endTransition.bind(this));
  };

  $.Tabs.prototype.clickTab = function () {
    event.preventDefault();

    this.$activeTab.removeClass('active');
    $("[for=#" + this.$activeTab.attr('id') + "]").removeClass('active');
    this.$clickedLink = $(event.target);
    this.$clickedLink.addClass('active');
    this.$activeTab.addClass('transitioning');
  };

  $.Tabs.prototype.endTransition = function () {
    this.$activeTab.removeClass('transitioning');
    var tabId = this.$clickedLink.attr('for');
    this.$activeTab = $(tabId);
    this.$activeTab.addClass('active').addClass('transitioning');
    var that = this;
    setTimeout(function() {
      that.$activeTab.removeClass('transitioning');
    }, 0);
  };

  $.fn.tabs = function() {
    return this.each(function() {
      new $.Tabs(this);
    });
  };

})(jQuery);
