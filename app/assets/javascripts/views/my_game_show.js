UberMicro.Views.MyGameShow = Backbone.View.extend({

  template: JST["my_games/my_game_show"],

  addStarRatings: function () {
    $("#jRateAvg" + this.model.game.id).jRate({
      rating: this.model.game.get("avg_rating"),
      startColor: '#efad06',
      endColor: '#efad06',
      backgroundColor: '#cccccc',
      width: 15,
      height: 15,
      readOnly: true
    });

    $("#jRate" + this.model.id).jRate({
      rating: this.model.get("my_rating"),
      startColor: '#efad06',
      endColor: '#efad06',
      backgroundColor: '#cccccc',
      precision: 0.5,
      width: 15,
      height: 15,

      onSet: function(rating) {
        this.model.set({ "my_rating": rating })
        this.model.save()
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({ myGame: this.model }))
    this.addStarRatings();
    return this;
  }

})
