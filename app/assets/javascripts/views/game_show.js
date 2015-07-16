UberMicro.Views.GameShow = Backbone.View.extend({
  template: JST["games/game_show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.currentUser = options.currentUser;
    this.showComments = options.showComments || false;
  },

  events: {
    "click button.want-button": "toggleWTPGame"
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
    var signed_in = true
    if (jQuery.isEmptyObject(this.currentUser.attributes)) {
      signed_in = false
    }


    this.$el.html(this.template({
      game: this.model,
      showComments: this.showComments,
      signed_in: signed_in
    }))

    return this;
  }
})
