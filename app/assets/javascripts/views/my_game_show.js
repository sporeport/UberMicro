UberMicro.Views.MyGameShow = Backbone.View.extend({

  template: JST["my_games/my_game_show"],

  render: function () {
    this.$el.html(this.template({ myGame: this.model }))
    return this;
  }
})
