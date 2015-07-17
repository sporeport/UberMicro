UberMicro.Views.GuestHome = Backbone.View.extend({

  initialize: function (options) {
    this.mostPopularGames = new UberMicro.Collections.PopGames();
    this.mostPopularGames.fetch();
    this.userRecommended = new UberMicro.Collections.
  },

  template: JST["homes/home"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }

})
