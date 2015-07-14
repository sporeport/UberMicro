UberMicro.Views.GamesIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["games/game_index"],

  events: {
    "click button.want-button": "wtpGame"
  },

  wtpGames: {
    // var myGame = new UberMicro.Models.MyGame();
  },

  render: function () {
    this.$el.html(this.template({ games: this.collection }));
    return this;
  }
})
