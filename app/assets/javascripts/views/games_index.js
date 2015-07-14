UberMicro.Views.GamesIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["games/game_index"],

  render: function () {
    this.$el.html(this.template({ games: this.collection }));
    return this;
  }
})
