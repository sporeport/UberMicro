UberMicro.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function () {
    var json = { user: _.clone(this.attributes) }
    return json;
  },

  signed_in: function () {
    return !this.isNew();
  },


  saveFormData: function(formData, options){
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  }
})
