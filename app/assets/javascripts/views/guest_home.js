UberMicro.Views.GuestHome = Backbone.View.extend({

  template: JST["homes/guest_home"],

  events: {
    "submit form": "signUpUser"
  },

  signUpUser: function (event) {
    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData["user"])
    this.model.save({}, {
      success: function () {
        Backbone.currentUser = this.model
        Backbone.history.navigate("", { trigger: true })
      }.bind(this)
    })
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }

})
