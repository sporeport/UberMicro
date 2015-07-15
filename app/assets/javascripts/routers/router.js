UberMicro.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    var searchBoxView = new UberMicro.Views.SearchBox();
    $(".search-box-container").html(searchBoxView.render().$el)

    this.$rootEl = options.$rootEl
    this.games = new UberMicro.Collections.Games();
  },

  routes: {
    "games/:id": "gamesShow",
    "games/search/:query": "gamesIndex",
    "games/search/": "gamesIndex", //**** DO NOT LEAVE IN!!!
    "my_games": "myGamesIndex"
  },

  gamesIndex: function (query) {
    this.games.fetch({ data: { query: query }});
    var gamesIndexView = new UberMicro.Views.GamesIndex({ collection: this.games });
    this._swapView(gamesIndexView);
  },

  gamesShow: function (id) {
    var game = this.games.getOrFetch(id);
    var gameShowView = new UberMicro.Views.GameShow({ model: game, showComments: true });
    this._swapView(gameShowView);
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
