class Api::GamesController < ApplicationController

  def search
    @query = params[:query]
    @page = params[:page] || 1

    if signed_in?
      @games = Game.with_my_games(current_user).page(@page)
    else
      @games = Game.all.page(@page)
    end

    if !@query.blank?
      @games = @games.search_by_tcg(@query)
    end

    render :index
  end

  def popular
    @games = Game
      .joins(:my_games)
      .group('games.id')
      .order('COUNT(games.*)')
      .limit(5)

    render :popular
  end

  def recommended
    @user = User.find(params[:user_id])

    @rec_games = @user.get_rec_genre
    if @rec_games
      render :recommended
    else
      render json: []
    end
  end

  def gb_search
    @query = params[:query]

    @results = Game.search_in_gb(@query)

    if @results.blank?
      render json: []
    else
      render :gb_game_index
    end
  end

  def show
    @game = Game.find(params[:id])
    render :show
  end

  def create
    @gbid = params[:gbid]
    game_data = Game.get_gb_game(@gbid)

    @game = Game.new
    @game.description = game_data["deck"]
    @game.company = game_data["developers"][0]["name"]
    @game.title = game_data["name"]
    @game.genre = game_data["genres"][0]["name"]

    if game_data["image"] && game_data["image"]["thumb_url"]
      @game.image = game_data["image"]["thumb_url"]
    end

    if @game.save
      render json: @game
    else
      render json: @game.errors.full_messages
    end
  end

  def update

  end

end
