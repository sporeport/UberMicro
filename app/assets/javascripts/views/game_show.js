UberMicro.Views.GameShow = Backbone.View.extend({
  template: JST["games/game_show"],

  tagName: "figure",

  className: "game-instance",
  
  events: {
    "click button.want-button": "toggleWTPGame",
  },

  toggleWTPGame: function (event) {
    var myGame = this.model.myGame

    if (myGame) {
      myGame.destroy({
        success: function () {
          this.model.myGame = null;
        }.bind(this)
      });
      $(event.currentTarget).text("want to play");
    } else {
      myGame = new UberMicro.Models.MyGame({
        "game_id": this.model.id,
        "status": "wants-to-play"
      });

      $(event.currentTarget).text("unwant to play");
      myGame.save({}, {
        success: function () {
          this.model.myGame = myGame;
        }.bind(this)
      });
    }

  },

  render: function () {
    this.$el.html(this.template({ game: this.model }))
    return this;
  }
})
