json.array! @games do |game|

  json.extract! game, :id, :title, :company, :genre, :avg_rating, :description

  if signed_in? && game.my_game_id
    json.myGame({status: game.status, my_rating: game.my_rating, id: game.my_game_id})
  end
end
