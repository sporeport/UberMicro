UberMicro.Views.UserShow = Backbone.View.extend({
  initialize: function () {
    this.model = new UberMicro.Models.User()
    this.listenTo(this.model, "sync", this.render)

    if (UberMicro.currentUser.signed_in()) {
      this.fetchUser()
    } else {
      this.listenTo(UberMicro.currentUser, "sync", this.fetchUser)
    }
  },

  template: JST["users/user_show"],

  fetchUser: function () {
    this.model.set({ id: UberMicro.currentUser.id })
    this.model.fetch()
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  events: {
    "submit .avatar-upload-form": "submit",
  },

  submit: function(event){
    event.preventDefault();

    var file = this.$("#input-user-avatar")[0].files[0];

    var formData = new FormData();
    formData.append("user[avatar]", file);

    var that = this;
    this.model.saveFormData(formData, {});
  }
})
