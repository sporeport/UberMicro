UberMicro.Views.GbGameShow = Backbone.View.extend({

  template: JST["gb_games/gb_game_show"],

  className: "gb-game-instance group",

  events: {
    "click .add-game-to-ubermicro": "addGameToUberMicro"
  },

  addGameToUberMicro: function (event) {
    $(event.currentTarget).text("adding...")
    this.model.save({}, {
      success: function (data) {
        var $success_message =
            $("<span>" + data.get("title") + " has been added to UberMicro</span>")
            .addClass("backbone-flash-notice");

        Backbone.history.navigate("#/games/" + data.id, { trigger: true });

        $(".backbone-flash-notices-container").html($success_message);
      },
      error: function () {
        var $error_message =
            $("<span>sorry we are unable to add that game</span>")
            .addClass("backbone-flash-error");

        $(".backbone-flash-notices-container").html($error_message);
      }
    })
  },

  render: function () {
    this.$el.html(this.template({ game: this.model }))
    return this;
  }
})
