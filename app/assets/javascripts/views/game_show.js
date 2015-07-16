UberMicro.Views.GameShow = Backbone.View.extend({
  template: JST["games/game_show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(UberMicro.currentUser, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.render);

    this.showComments = options.showComments || false;
    this.newComment = new UberMicro.Models.Comment();
  },

  events: {
    "click button.want-button": "toggleWTPGame",
    "click button.submit-comment": "submitComent"
  },

  toggleWTPGame: function (event) {
    var myGame = this.model.myGame

    if (myGame) {
      myGame.destroy({
        success: function () {
          this.model.myGame = null;
        }.bind(this)
      });
      $(event.currentTarget).text("want to play");
    } else {
      myGame = new UberMicro.Models.MyGame({
        "game_id": this.model.id,
        "status": "wants-to-play"
      });

      $(event.currentTarget).text("unwant to play");
      myGame.save({}, {
        success: function () {
          this.model.myGame = myGame;
        }.bind(this)
      });
    }

  },

  submitComent: function (event) {
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

  render: function () {
    this.$el.html(this.template({
      game: this.model,
      showComments: this.showComments,
      newComment: this.newComment
    }))

    return this;
  }
})
