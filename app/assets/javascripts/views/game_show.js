UberMicro.Views.GameShow = Backbone.View.extend({
  template: JST["games/game_show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.myGame, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.render);
    this.listenTo(UberMicro.currentUser.lists(), "add", this.render);

    this.optionsListIsOpen = false

    this.showComments = options.showComments || false;
    this.newComment = new UberMicro.Models.Comment();
  },

  events: {
    "click button.want-button": "toggleWTPGame",
    "click button.submit-comment-button": "submitComment",
    "click button.want-button-options": "toggleOptions",
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
          this.optionsListIsOpen = false;
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
          this.optionsListIsOpen = false;
          this.render();
        }.bind(this)
      });
    }

    // this.setOptionStatus()
  },

  // broken function
  //
  // setOptionStatus: function () {
  //   if (this.model.myGame) {
  //     //doesn't work for two or more word status
  //     var status = this.model.myGame.get("status");
  //     this.$("#" + status).addClass("disabled-option");
  //   }
  // },

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

  submitComment: function (event) {
    event.preventDefault();

    var $form = $(this.$(".comments-container").find("form"));
    var formData = $form.serializeJSON();

    this.newComment.set(formData["comment"]);
    this.newComment.set({ "game_id": this.model.id });

    this.newComment.save({}, {
      success: function () {
        this.model.comments().add(this.newComment);
        this.newComment = new UberMicro.Models.Comment();
      }.bind(this)
    });

    $form.find("textarea").val("")
  },

  toggleOptions: function () {
    var $button = this.$(".want-button-options-list")
    var $tri = this.$(".want-triangle")

    if ($button.hasClass("inactive")) {
      $button.removeClass("inactive");
      $tri.removeClass("inactive");
    } else {
      $button.addClass("inactive");
      $tri.addClass("inactive");
    }
  },

  openOptions: function () {
    var $button = this.$(".want-button-options-list")
    var $tri = this.$(".want-triangle")

    $button.removeClass("inactive");
    $tri.removeClass("inactive");
  },

  closeOptions: function () {
    var $button = this.$(".want-button-options-list")
    var $tri = this.$(".want-triangle")

    $button.addClass("inactive");
    $tri.addClass("inactive");
  },

  addStarRatings: function () {
    $("#jRateAvg" + this.model.id).jRate({
      rating: this.model.get("avg_rating"),
      startColor: '#efad06',
      endColor: '#efad06',
      backgroundColor: '#cccccc',
      width: 12,
  		height: 12,
      readOnly: true
    });

    if (this.model.myGame &&
        this.model.myGame.get("status") !== "wants-to-play") {

      $("#jRate" + this.model.id).jRate({
        rating: this.model.myGame.get("my_rating"),
        startColor: '#efad06',
        endColor: '#efad06',
        backgroundColor: '#cccccc',
        precision: 0.5,
        width: 12,
    		height: 12,

        onSet: function(rating) {
          this.model.myGame.set({ "my_rating": rating });
          this.model.myGame.save();
        }.bind(this)
      });
    }
  },

  render: function () {
    this.$el.html(this.template({
      game: this.model,
      showComments: this.showComments,
      newComment: this.newComment,
    }))

    this.addStarRatings();

    if (this.optionsListIsOpen) {
      this.openOptions();
    } else {
      this.closeOptions();
    }

    if (this.model.myGame) {
      this.$(".want-button").addClass("disabled-want-button")
    }

    // this.setOptionStatus();

    return this;
  }
})
