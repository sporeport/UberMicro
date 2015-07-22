UberMicro.Collections.Games = Backbone.Collection.extend({
  url: "/api/games/search",

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
  },

  parse: function (resp) {
    if (resp.query || resp.query === "") {
      this.query = resp.query;
    }
    if (resp.total_pages || resp.total_pages === 0) {
      this.total_pages = resp.total_pages;
    }
    if (resp.current_page) {
      this.current_page = resp.current_page;
    }

    return resp.results;
  }

})
