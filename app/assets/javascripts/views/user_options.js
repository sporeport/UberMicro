UberMicro.Views.UserOptions = Backbone.View.extend({
  initialize: function () {
    this.listenTo(UberMicro.currentUser, "sync", this.render)
  },

  className: "nav-links",
  template: JST["user_options/user_options"],

  events: {
    "click .user-link": "toggleUserOptions"
  },

  toggleUserOptions: function () {
    Backbone.history.navigate("#/user/show", { trigger: true } )
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
})
