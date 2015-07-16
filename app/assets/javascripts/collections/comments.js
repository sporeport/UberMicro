UberMicro.Collections.Comments = Backbone.Collection.extend({
  model: UberMicro.Models.Comment,

  comparator: function (comment) {
    return -comment.get("created_at");
  }
})
