UberMicro.Collections.GbGames = Backbone.Collection.extend({
  url: "/api/games/gb_search",

  model: UberMicro.Models.GbGame,

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
