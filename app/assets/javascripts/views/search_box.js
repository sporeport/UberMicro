UberMicro.Views.SearchBox = Backbone.View.extend({

  template: JST["search_box/search_box"],

  events: {
    "click .search-box-button": "search",
    "keyup": "tryToSearch"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  search: function (event) {
    var query = this.$(".search-field").val()
    Backbone.history.navigate("#/games/search/" + query, { trigger: true })
  },

  tryToSearch: function (event) {
    if (event.keyCode === 13) {
      var query = this.$(".search-field").val()
      Backbone.history.navigate("#/games/search/" + query, { trigger: true })
    }
  }
})
