UberMicro.Views.GamesIndex = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    this.currentUser = options.currentUser;
  },

  template: JST["games/games_index"],

  addSubViews: function () {
    this.collection.forEach(function (model) {
      var showView = new UberMicro.Views.GameShow({
        model: model,
        collection: this.collection,
        currentUser: this.currentUser
      });

      this.addSubview(".games-list", showView);
    }.bind(this))
  },

  render: function () {
    this.$el.html(this.template());
    this.addSubViews();
    return this;
  }
})
