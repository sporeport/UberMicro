UberMicro.Views.MyGamesIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["my_games/my_games_index"],

  render: function () {
    this.$el.html(this.template({ myGames: this.collection }))
    return this;
  }
})
