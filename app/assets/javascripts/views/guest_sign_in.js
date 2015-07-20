UberMicro.Views.GuestSignIn = Backbone.View.extend({

  template: JST["guest_sign_in/guest_sign_in"],

  className: "guest-button-container",

  events: {
    "click .guest-sign-in-button" : "fillInGuestCred"
  },

  fillInGuestCred: function () {
    var username = "guest@example.com";
    var password = "password";
    var uIdx = 1;
    var pIdx = 1;

    function fillInLetter() {
      window.setTimeout(function() {
        if (uIdx <= username.length) {
          $("#sign-in-email").val(username.slice(0, uIdx));
          uIdx++;
        } else if (pIdx <= password.length) {
          $("#sign-in-password").val(password.slice(0, pIdx));
          pIdx++;
        }
        if (!(uIdx === username.length + 1) || !(pIdx === password.length + 1)) {
          fillInLetter()
        }
      }, 100)
    }

    fillInLetter();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
})
