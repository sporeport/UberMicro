UberMicro.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "games": "gamesIndex",
    "my_games": "myGamesIndex"
  },

  gamesIndex: function () {
    var games = new UberMicro.Collections.Games();
    games.fetch();
    var gamesIndexView = new UberMicro.Views.GamesIndex({ collection: games });
    this._swapView(gamesIndexView);
  },

  myGamesIndex: function () {
    var myGames = new UberMicro.Collections.MyGames();
    myGames.fetch()
    var myGamesIndexView = new UberMicro.Views.MyGamesIndex({ collection: myGames });
    this._swapView(myGamesIndexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
