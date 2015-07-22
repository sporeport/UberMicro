UberMicro.Views.GamesIndex = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.gbGames = new UberMicro.Collections.GbGames();

    this.listenTo(this.gbGames, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST["games/games_index"],

  events: {
    "click .previous-page-button": "previousPage",
    "click .next-page-button": "nextPage",
    "click .search-gb-button": "searchGb"
  },

  searchGb: function (event) {
    this.gbGames.fetch({
      data: {
        query: this.collection.query
      }
    })
  },

  addGbSubview: function () {
    this.gbGames.forEach(function (model) {
      var gbGameShowView = new UberMicro.Views.GbGameShow({
        model: model,
        collection: this.collection,
      });

      this.addSubview(".games-list", showView);
    }.bind(this))
  },

  nextPage: function () {
    if (this.collection.current_page < this.collection.total_pages) {
      this.collection.reset();
      this.collection.fetch({
        data: {
          query: this.collection.query,
          page: this.collection.current_page + 1
        }
      });
    }
  },

  previousPage: function () {
    if (this.collection.current_page > 1) {
      this.collection.reset();
      this.collection.fetch({
        data: {
          query: this.collection.query,
          page: this.collection.current_page - 1
        }
      });
    }
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
    this.$el.html(this.template({ games: this.collection }));

    if (!this.collection.isEmpty()) {
      this.addSubViews();
    }

    return this;
  }
})
