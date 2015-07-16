UberMicro.Views.MyGamesIndex = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
  },

  className: "my-games-container",

  template: JST["my_games/my_games_index"],

  addSubViews: function () {
    this.collection.forEach(function (model) {
      var showView = new UberMicro.Views.MyGameShow({
        model: model,
        collection: this.collection
      });

      this.addSubview(".my-games-list", showView);
    }.bind(this))
  },

  render: function () {
    this.$el.html(this.template());
    this.addSubViews();
    return this;
  }
})
