UberMicro.Views.GamesIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["games/game_index"],

  events: {
    "click button.want-button": "wtpGame"
  },

  wtpGame: function (event) {
    var gameId = $(event.currentTarget).date("id")
    var myGame = new UberMicro.Models.MyGame({
      "game_id": game_id,
      "status": "wants-to-play"
    });

    myGame.save();
    
  },

  render: function () {
    this.$el.html(this.template({ games: this.collection }));
    return this;
  }
})
