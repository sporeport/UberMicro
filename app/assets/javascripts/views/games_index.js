UberMicro.Views.GamesIndex = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["games/games_index"],

  addSubViews: function () {
    this.collection.forEach(function (model) {
      var showView = new UberMicro.Views.GameShow({
        model: model,
        collection: this.collection,
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
