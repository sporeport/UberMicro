UberMicro.Views.UserShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(UberMicro.currentUser, "sync", this.render);
  },

  template: JST["users/user_show"],

  render: function () {
    this.$el.html(this.template({ user: UberMicro.currentUser }));
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
    this.model.saveFormData(formData, {
      success: function(){
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
})
