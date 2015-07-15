UberMicro.Views.GamesIndex = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["games/games_index"],

  events: {
    "click button.want-button": "toggleWTPGame",
  },

  toggleWTPGame: function (event) {
    var gameId = $(event.currentTarget).data("id")
    var game = this.collection.getOrFetch(gameId)
    var myGame = game.myGame

    if (game.myGame){
      myGame.destroy();
      $(event.currentTarget).text("unwant to play");
    } else {
      myGame = new UberMicro.Models.MyGame({
        "game_id": gameId,
        "status": "wants-to-play"
      });

      $(event.currentTarget).text("unwant to play");
      myGame.save();
    }

  },

  render: function () {
    this.$el.html(this.template({ games: this.collection }));
    return this;
  }
})
