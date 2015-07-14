class API::GamesController < ApplicationController

  def index
    @games = Games.all
    render :index
  end


  def show

  end

  def create

  end

  def update

  end

end
