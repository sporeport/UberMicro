class Api::GamesController < ApplicationController

  def index
    @query = params[:query]

    if !@query.blank?
      @games = Game.where("title = ? OR genre = ? OR company = ?",
                              @query, @query, @query)
    else
      @games = Game.all
    end

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
