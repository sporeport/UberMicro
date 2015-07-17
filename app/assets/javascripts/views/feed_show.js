UberMicro.Views.FeedShow = Backbone.View.extend({
  template: JST["feed/feed_show"],


  render: function () {
    this.$el.html(this.template({ game: this.model }))
    return this;
  }
})
