UberMicro.Collections.GbGames = Backbone.Collection.extend({
  url: "/api/games/gb_search",

  model: UberMicro.Models.GbGame,

  parse: function (resp) {
    return resp;
  }

})
