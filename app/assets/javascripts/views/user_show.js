UberMicro.Views.UserShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(UberMicro.currentUser, "sync", this.render);
  },

  template: JST["users/show"],

  render: function () {
    this.$el.html(this.template({ user: UberMicro.currentUser }));
    return this;
  }
})
