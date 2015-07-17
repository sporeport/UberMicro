UberMicro.Collections.RecGames = Backbone.Collection.extend({
  url: "/api/games/recommended_for",

  model: UberMicro.Models.Game,

  getOrFetch: function (id) {
    var game = this.get(id);

    if (game) {
      game.fetch();
    } else {
      game = new UberMicro.Models.Game({ id: id });
      game.fetch({
        success: function () {
          this.add(game)
        }.bind(this)
      });
    };

    return game
  }
})
