UberMicro.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    var searchBoxView = new UberMicro.Views.SearchBox();
    $(".search-box-container").html(searchBoxView.render().$el)

    this.$rootEl = options.$rootEl
    this.games = new UberMicro.Collections.Games();
  },

  routes: {
    "games": "gamesIndex",
    "games/:id": "gamesShow",
    "my_games": "myGamesIndex"
  },

  gamesIndex: function () {
    var query = $(".search-field").val()
    $(".search-field").val("")

    this.games.fetch({ data: { query: query }});
    var gamesIndexView = new UberMicro.Views.GamesIndex({ collection: this.games });
    this._swapView(gamesIndexView);
  },

  gamesShow: function (id) {
    var game = this.games.getOrFetch(id);
    var gameShowView = new UberMicro.Views.GameShow();
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
