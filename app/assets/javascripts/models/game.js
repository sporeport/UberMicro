UberMicro.Models.Game = Backbone.Model.extend({
  urlRoot: "/api/games",

  comments: function () {
    if (!this._comments) {
      this._comments = new UberMicro.Collections.Comments();
    }
    return this._comments;
  },

  parse: function (response) {
    if (response.myGame) {
      var myGame = new UberMicro.Models.MyGame(response.myGame);
      this.myGame = myGame;
      delete response.myGame;
    }

    if (response.comments) {
      var comments = new UberMicro.Collections.Comments(response.comments);
      this._comments = comments
      delete response.comments
    }

    return response;
  }
})
