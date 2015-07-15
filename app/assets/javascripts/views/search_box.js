UberMicro.Views.SearchBox = Backbone.View.extend({

  template: JST["search_box/search_box"],

  events: {
    "click .search-box-button": "search"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  search: function () {
    Backbone.history.navigate("#/games", { trigger: true })
  }
})
