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
end
