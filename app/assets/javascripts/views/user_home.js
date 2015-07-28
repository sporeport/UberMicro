UberMicro.Views.UserHome = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.mostPopularGames = new UberMicro.Collections.PopGames();
    this.userRecommended = new UberMicro.Collections.RecGames();
    this.games = new UberMicro.Collections.Games();

    if (UberMicro.currentUser.signed_in()){
      this.loadRecGames();
    } else {
      this.listenTo(UberMicro.currentUser, "sync", this.loadRecGames);
    }

    this.listenTo(this.mostPopularGames, "sync", this.waitForRender);
    this.listenTo(this.userRecommended, "sync", this.waitForRender);
  },

  waitForRender: function () {
    if (this.userRecommended && this.mostPopularGames) {
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

  events: {
    "click .about-close": "closeAbout",
    "click .about-open": "openAbout"
  },

  closeAbout: function () {
    this.$(".about-container").addClass("leave-left");
    this.$(".about-close").addClass("inactive");
    this.$(".about-open").addClass("active");

    UberMicro.about_open = false;
  },

  openAbout: function () {
    this.$(".about-container").removeClass("leave-left");
    this.$(".about-close").removeClass("inactive");
    this.$(".about-open").removeClass("active");

    UberMicro.about_open = true;
  },

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

    if (UberMicro.currentUser.get("name") !== "guest" ||
        !UberMicro.currentUser.signed_in()) {
      this.$(".about-container").addClass("inactive");
    }

    if (!UberMicro.about_open) {
      this.closeAbout();
    }

    this.addSubViews();
    return this;
  }

})
