UberMicro.Views.FeedShow = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(UberMicro.currentUser.lists(), "add", this.render);
  },

  template: JST["feeds/feed_show"],

  events: {
    "click button.want-button": "toggleWTPGame",
    "click button.submit-comment-button": "submitComment",
    "click button.want-button-options": "openOptions",
    "click .want-button-options-list > li": "addToList",
    "click #add-list": "addList",
    "submit #list-form": "submitList"
  },

  addList: function (event) {
    $(event.currentTarget).find("small").addClass("inactive");
    this.$("#list-form").removeClass("inactive");
  },

  submitList: function (event) {
    event.preventDefault();

    this.optionsListIsOpen = true;

    var formData = $(event.currentTarget).serializeJSON();
    var list = new UberMicro.Models.List(formData["list"]);
    $(event.currentTarget).find("input").val("");

    list.save({}, {
      success: function () {
        UberMicro.currentUser.lists().add(list);
      }
    });
  },

  addToList: function (event) {
    var myGame = this.model.myGame
    var status = $(event.currentTarget).attr('id')

    if (myGame) {
      myGame.save({status: status}, {
        success: function () {
          this.render();
        }.bind(this)
      })
    } else {
      myGame = new UberMicro.Models.MyGame({
        game_id: this.model.id,
        status: status
      });

      this.$(".want-button").addClass("disabled-want-button")

      myGame.save({}, {
        success: function () {
          this.model.myGame = myGame;
          this.render();
        }.bind(this)
      });
    }

    this.setOptionStatus()
  },

  setOptionStatus: function () {
    if (this.model.myGame) {
      //doesn't work for two or more word status
      var status = this.model.myGame.get("status");
      this.$("#" + status).addClass("disabled-option");
    }
  },

  toggleWTPGame: function (event) {
    var myGame = this.model.myGame

    if (myGame) {
      myGame.destroy({
        success: function () {
          this.model.myGame = null;
          this.render();
        }.bind(this)
      });

      this.$(".want-button").removeClass("disabled-want-button");


    } else {
      myGame = new UberMicro.Models.MyGame({
        game_id: this.model.id,
        status: "wants-to-play"
      });

      this.$(".want-button").addClass("disabled-want-button");

      myGame.save({}, {
        success: function () {
          this.model.myGame = myGame;
        }.bind(this)
      });
    }

  },

  openOptions: function () {
    var $button = this.$(".want-button-options-list")
    var $tri = this.$(".want-triangle")

    if ($button.hasClass("active")) {
      $button.removeClass("active");
      $tri.removeClass("active");
    } else {
      $button.addClass("active");
      $tri.addClass("active");
    }
  },

  render: function () {
    this.$el.html(this.template({ game: this.model }))

    if (this.optionsListIsOpen) {
      this.openOptions();
    }

    if (this.model.myGame) {
      this.$(".want-button").addClass("disabled-want-button")
    }


    this.setOptionStatus();

    return this;
  }
})
