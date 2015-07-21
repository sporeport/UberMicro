UberMicro.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.games = new UberMicro.Collections.Games();

    var searchBoxView = new UberMicro.Views.SearchBox();
    var guestSignInView = new UberMicro.Views.GuestSignIn();
    var userOptionsView = new UberMicro.Views.UserOptions();

    $(".sign-in-form").append(guestSignInView.render().$el);
    $(".search-box-container").html(searchBoxView.render().$el);
    $("#main-nav").prepend(userOptionsView.render().$el);
  },

  routes: {
    "": "home",
    "users/show": "userShow",
    "games/:id": "gamesShow",
    "games/search/:query": "gamesSearch",
    "games/search/": "gamesSearch", //**** DO NOT LEAVE IN!!!
    "my_games": "myGamesIndex"
  },

  userShow: function () {
    var userShow = new UberMicro.Views.UserShow();
    this._swapView(userShow);
  },

  home: function () {
    var homeView = new UberMicro.Views.UserHome();
    this._swapView(homeView);
  },

  gamesSearch: function (query) {
    this.games.fetch({ data: { query: query }});

    var gamesIndexView = new UberMicro.Views.GamesIndex({
      collection: this.games,
    });

    this._swapView(gamesIndexView);
  },

  gamesShow: function (id) {
    var game = this.games.getOrFetch(id);

    var gameShowView = new UberMicro.Views.GameShow({
      model: game,
      showComments: true,
    });

    this._swapView(gameShowView);
  },

  myGamesIndex: function () {
    var myGames = new UberMicro.Collections.MyGames();
    myGames.fetch()

    var myGamesIndexView = new UberMicro.Views.MyGamesIndex({
      collection: myGames
    });

    this._swapView(myGamesIndexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
