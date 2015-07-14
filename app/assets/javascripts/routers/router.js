UberMicro.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "games": "index"
  },

  index: function () {
    var games = new UberMicro.Collections.Games;
    games.fetch();
    var indexView = new UberMicro.Views.GamesIndex({ collection: games });
    this._swapView(indexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
