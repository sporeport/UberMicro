class Api::GamesController < ApplicationController

  def index
    @query = params[:query]

    if !@query.blank?
      @games = Game.where("title = ? OR genre = ? OR company = ?",
                              @query, @query, @query)
    else
      @games = Game.all
    end

    @myGames = MyGame.my_games_by_user_games(current_user, @games)
    render :index
  end

  def popular
    @games = Game.joins('JOIN my_games ON my_games.game_id = games.id')
                 .group('games.id')
                 .order('COUNT(games.*)')
                 .limit(5)

    render :popular
  end

  def recommended_for
    @user = User.find(params[:user_id])

    @rec_games = @user.get_rec_genre
    if @rec_games
      render :recommended_for
    else
      render json: {}
    end
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
