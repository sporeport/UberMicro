json.array! @games do |game|

  json.extract! game, :id, :title, :company, :genre, :avg_rating, :description

  json.myGame game.my_games.first
  # if signed_in?
  #   json.myGame @myGames.select { |my_game| my_game.game_id == game.id }.first
  # end
end
