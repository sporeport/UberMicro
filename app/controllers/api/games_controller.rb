class Api::GamesController < ApplicationController

  def search
    @query = params[:query]

    if signed_in?
      my_user_games = <<-SQL
        LEFT OUTER JOIN (
          #{current_user.my_games.to_sql}
          ) AS my_user_games ON my_user_games.game_id = games.id
      SQL


      my_games_select = <<-SQL
        games.*,
        my_user_games.status as status,
        my_user_games.my_rating as my_rating,
        my_user_games.id as my_game_id
      SQL

      @games = Game.joins(my_user_games).select(my_games_select)
    else
      @games = Game.all
    end

    if !@query.blank?
      @games = @games.where("title = ? OR company = ? OR genre = ?", @query, @query, @query)
    end

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
      render json: []
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
