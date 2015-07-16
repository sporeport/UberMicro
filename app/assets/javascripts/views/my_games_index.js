UberMicro.Views.MyGamesIndex = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

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


  render: function () {
    this.$el.html(this.template({ myGames: this.collection }))
    return this;
  }
})
