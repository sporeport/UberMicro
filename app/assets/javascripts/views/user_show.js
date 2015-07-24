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
    "click .profile-picture": "toggleChooseFile",
    "click .profile-name": "toggleNameInput",
    "click .profile-email": "toggleEmailInput"
  },

  toggleNameInput: function (event) {
    var $nameIn = this.$(".profile-name-input");
    var $nameTxt = this.$(".profile-name-txt");

    if ($nameIn.hasClass("inactive")) {
      $nameIn.removeClass("inactive");
      $nameTxt.addClass("inactive");
    } else {
      $nameIn.addClass("inactive");
      $nameTxt.removeClass("inactive");

      var formData = $nameIn.serializeJSON()["user"]
      this.model.save(formData)
    }
  },

  toggleEmailInput: function (event) {
    var $emailIn = this.$(".profile-email-input");
    var $emailTxt = this.$(".profile-email-txt")

    if ($emailIn.hasClass("inactive")) {
      $emailIn.removeClass("inactive");
      $emailTxt.addClass("inactive");
    } else {
      $emailIn.addClass("inactive");
      $emailTxt.removeClass("inactive");

      var formData = $emailIn.serializeJSON()["user"]
      this.model.save(formData)
    }
  },

  toggleChooseFile: function (event) {
    var $fileBtn = this.$(".avatar-upload-form");

    if ($fileBtn.hasClass("inactive")) {
      $fileBtn.removeClass("inactive");
    } else {
      $fileBtn.addClass("inactive");
    }
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
