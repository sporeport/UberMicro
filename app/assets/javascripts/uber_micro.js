window.UberMicro = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new UberMicro.Models.CurrentUser();
    this.currentUser.fetch();

    this.about_open = true;

    var $rootEl = $("#content");
    var router = new UberMicro.Routers.Router({ $rootEl: $rootEl });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  UberMicro.initialize();
});
