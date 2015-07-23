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
        Backbone.history.navigate("#/games/" + data.id, { trigger: true })
      }
    })
  },

  render: function () {
    this.$el.html(this.template({ game: this.model }))
    return this;
  }
})
