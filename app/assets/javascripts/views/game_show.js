UberMicro.Views.GameShow = Backbone.View.extend({
  template: JST["games/game_show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.render);

    this.showComments = options.showComments || false;
    this.newComment = new UberMicro.Models.Comment();
  },

  events: {
    "click button.want-button": "toggleWTPGame",
    "click button.submit-comment-button": "submitComment",
    "click button.want-button-options": "openOptions",
    "click #add-list": "addList",
    "submit #list-form": "submitList",
    "click .want-button-options-list > li:not(#add-list)": "addToList"
  },

  addList: function (event) {
    $(event.currentTarget).addClass("inactive");
    this.$("#list-form").removeClass("inactive");
  },

  submitList: function (event) {

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

      if (this.model.myGame.get("status") === "played") {
        this.$("#played").addClass("disabled-option");
      }

      if (this.model.myGame.get("status") === "currently-playing") {
        this.$("#currently-playing").addClass("disabled-option");
      }
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

      this.$(".want-button").removeClass("disabled-want-button")


    } else {
      myGame = new UberMicro.Models.MyGame({
        game_id: this.model.id,
        status: "wants-to-play"
      });

      this.$(".want-button").addClass("disabled-want-button")

      myGame.save({}, {
        success: function () {
          this.model.myGame = myGame;
        }.bind(this)
      });
    }

  },

  submitComment: function (event) {
    event.preventDefault();
    var $form = $(this.$(".comments-container").find("form"))

    var formData = $form.serializeJSON()

    this.newComment.set(formData["comment"]);
    this.newComment.set({ "game_id": this.model.id })

    this.newComment.save({}, {
      success: function () {
        this.model.comments().add(this.newComment);
        this.newComment = new UberMicro.Models.Comment();
      }.bind(this)
    });

    $form.find("textarea").val("")
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
    this.$el.html(this.template({
      game: this.model,
      showComments: this.showComments,
      newComment: this.newComment
    }))

    if (this.model.myGame) {
      this.$(".want-button").addClass("disabled-want-button")
    }

    this.setOptionStatus();

    return this;
  }
})
