class Api::GamesController < ApplicationController

  def index
    @games = Game.all
    render :index
  end


  def show
    @game = Game.find(params[:id])
    render :show
  end

  def create

  end

  def update

  end

end
