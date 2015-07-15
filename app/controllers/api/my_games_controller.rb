class Api::MyGamesController < ApplicationController

  def index
    if signed_in?
      @my_games = current_user.my_games
      render :index
    else
      redirect_to root
    end
  end

  def show
  end

  def create
    @myGame = MyGame.new(my_game_params)
    @myGame.user_id = current_user.id

    if !@myGame.save
      render json: @myGame.errors.full_messages
    else
      render json: nil
    end
  end

  private

  def my_game_params
    params.require(:my_game).permit(:game_id, :my_rating, :status)
  end
end
