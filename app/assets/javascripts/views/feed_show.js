UberMicro.Views.FeedShow = Backbone.View.extend({
  template: JST["feed/feed_show"],

  events: {
    "click button.want-button": "toggleWTPGame",
    "click button.submit-comment-button": "submitComment",
    "click button.want-button-options": "openOptions"
  },

  toggleWTPGame: function (event) {
    var myGame = this.model.myGame

    if (myGame) {
      myGame.destroy({
        success: function () {
          this.model.myGame = null;
        }.bind(this)
      });
      //change
      this.$(".want-button").removeClass("disabled-want-button");


    } else {
      myGame = new UberMicro.Models.MyGame({
        game_id: this.model.id,
        status: "wants-to-play"
      });
      ///change
      this.$(".want-button").addClass("disabled-want-button");

      myGame.save({}, {
        success: function () {
          this.model.myGame = myGame;
        }.bind(this)
      });
    }

  },

  openOptions: function () {
    var $button = this.$(".want-button-options-list")
    var $tri = this.$(".want-triangle")

    if ($button.hasClass("active")) {
      $button.removeClass("active");
      $tri.removeClass("active");
    } else {
      $button.addClass("active");
      $tri.addClass("active");
    }
  },

  render: function () {
    this.$el.html(this.template({ game: this.model }))

    if (this.model.myGame) {
      $(this.$(".want-button")).addClass("disabled-want-button")
    }

    return this;
  }
})
