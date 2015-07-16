UberMicro.Views.SearchBox = Backbone.View.extend({

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.currentUser, "sync", this.render);
  },

  template: JST["search_box/search_box"],

  events: {
    "click .search-box-button": "search",
    "keyup": "tryToSearch"
  },

  render: function () {
    this.$el.html(this.template({ currentUser: this.currentUser }));
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
