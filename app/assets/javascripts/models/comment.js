UberMicro.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",

  parse: function (response) {
    if (response.created_at) {
      var created_at = Date.parse(response.created_at.slice(0, -5));
      this.set({"created_at": created_at});
      delete response.created_at;
    }

    return response
  }
})
