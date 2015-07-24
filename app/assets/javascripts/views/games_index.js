UberMicro.Views.GamesIndex = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.gbGames = new UberMicro.Collections.GbGames();

    this.listenTo(this.gbGames, "sync", this.render.bind(this, true));
    this.listenTo(this.collection, "sync", this.render.bind(this, false));
  },

  template: JST["games/games_index"],

  events: {
    "click .previous-page-button": "previousPage",
    "click .next-page-button": "nextPage",
    "click .search-gb-button": "searchGb"
  },

  searchGb: function (event) {
    $(event.currentTarget).text("loading games...")

    this.gbGames.fetch({
      data: {
        query: this.collection.query
      }
    })
  },

  addGbSubViews: function () {
    this.gbGames.forEach(function (model) {
      var gbGameShowView = new UberMicro.Views.GbGameShow({
        model: model,
      });

      this.addSubview(".games-list", gbGameShowView);
    }.bind(this))
  },

  nextPage: function () {
    if (this.gbGames.isEmpty()) {
      if (this.collection.current_page < this.collection.total_pages) {
        this.collection.reset();
        this.collection.fetch({
          data: {
            query: this.collection.query,
            page: this.collection.current_page + 1
          }
        });
      }
    } else {
      if (this.gbGames.current_page < this.gbGames.total_pages) {
        this.gbGames.reset();
        this.gbGames.fetch({
          data: {
            query: this.gbGames.query,
            page: parseInt(this.gbGames.current_page) + 1
          }
        });
      }
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
    } else {
      if (this.gbGames.current_page > 1) {
        this.gbGames.reset();
        this.gbGames.fetch({
          data: {
            query: this.gbGames.query,
            page: parseInt(this.gbGames.current_page) - 1
          }
        });
      }
    }
  },

  addSubViews: function () {
    //first empty gbGames so there is no conflict
    //check
    this.gbGames.reset();

    this.collection.forEach(function (model) {
      var showView = new UberMicro.Views.GameShow({
        model: model,
        collection: this.collection,
      });

      this.addSubview(".games-list", showView);
    }.bind(this))
  },

  render: function (gbRender) {
    this.$el.html(this.template({ games: this.collection, gbGames: this.gbGames }));

    if (!this.collection.isEmpty() && !gbRender) {
      this.addSubViews();
    }

    if (gbRender) {
      this.addGbSubViews();
    }

    return this;
  }
})
