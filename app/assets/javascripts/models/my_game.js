UberMicro.Models.MyGame = Backbone.Model.extend({
  urlRoot: "/api/my_games",
  parse: function (response) {
    if (response.game) {
      var game = new UberMicro.Models.Game(response.game);
      this.game = game;
      delete response.game;
    }

    return response;
  }
})
