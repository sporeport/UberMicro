UberMicro.Models.Game = Backbone.Model.extend({
  urlRoot: "/api/games",

  parse: function (response) {
    if (response.myGame) {
      var myGame = new UberMicro.Models.MyGame(response.myGame);
      this.myGame = myGame;
      delete response.myGame;
    }

    return response;
  }
})
