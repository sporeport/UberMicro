UberMicro.Models.CurrentUser = Backbone.Model.extend({
  url: "api/session",

  signed_in: function () {
    return !this.isNew();
  }
})
