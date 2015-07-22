UberMicro.Models.GbGame = Backbone.Model.extend({

  addToUberMicro: function () {
    $.ajax({
      url: "/api/games",
      method: "POST",
      data: { gbid: this.get("gbid") },
      success: function (data) {
        Backbone.history.navigate("#/games/" + data.id, { trigger: true })
      }
    })
  }
})
