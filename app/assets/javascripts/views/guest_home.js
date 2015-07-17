UberMicro.Views.GuestHome = Backbone.View.extend({

  template = JST["homes/guest_home"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }

})
