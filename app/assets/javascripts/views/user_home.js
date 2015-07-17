UberMicro.Views.UserHome = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.mostPopularGames = new UberMicro.Collections.PopGames();
    this.userRecommended = new UberMicro.Collections.RecGames();
    this.games = new UberMicro.Collections.Games();

    this.games.fetch();

    this.listenTo(UberMicro.currentUser, "sync", this.loadRecGames);

    this.listenTo(this.mostPopularGames, "sync", this.waitForRender);
    this.listenTo(this.userRecommended, "sync", this.waitForRender);
  },

  waitForRender: function () {
    if (this.userRecommended && (this.mostPopularGames)) {
      this.userRecommended.add(this.mostPopularGames.models, { merge: true })
      this.render();
    }
  },

  loadRecGames: function () {
    if (UberMicro.currentUser.signed_in()) {
      user_id = UberMicro.currentUser.id

      this.mostPopularGames.fetch();
      this.userRecommended.fetch({ data: {"user_id": user_id }});
    }
  },

  template: JST["homes/user_home"],

  addSubViews: function () {
    this.userRecommended.shuffle().forEach(function (model) {
      var showView = new UberMicro.Views.FeedShow({
        model: model,
        collection: this.games
      });

      this.addSubview(".home-feed", showView);
    }.bind(this))
  },

  render: function () {
    this.$el.html(this.template());
    this.addSubViews();
    return this;
  }

})
