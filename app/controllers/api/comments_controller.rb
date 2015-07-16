class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_param)
    @comment.author_id = current_user.id

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  private

  def comment_param
    params.require(:comment).permit(:body, :game_id)
  end
end
