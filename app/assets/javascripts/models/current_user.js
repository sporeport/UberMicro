UberMicro.Models.CurrentUser = Backbone.Model.extend({
  url: "api/session",

  lists: function () {
    if (!this._lists) {
      this._lists = new UberMicro.Collections.Lists();
    }
    return this._lists;
  },

  signed_in: function () {
    return !this.isNew();
  },

  parse: function (response) {
    if (response.lists) {
      this.lists().set(response.lists);
      delete response.lists;
    }

    return response
  }
})
