UberMicro.Collections.Games = Backbone.Collection.extend({
  url: "/api/games",

  model: UberMicro.Models.Game,

  getOrFetch: function (id) {
    var game = this.get(id);

    if (game) {
      game.fetch();
    } else {
      game = new UberMicro.Model.Game({ id: id });
      game.fetch({
        success: function () {
          this.add(game)
        }.bind(this)
      });
    };

    return game
  }
})
