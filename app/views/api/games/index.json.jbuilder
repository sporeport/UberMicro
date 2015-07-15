json.array! @games do |game|

  json.extract! game, :id, :title, :company, :genre, :avg_rating, :description
  if signed_in? && game.user_my_game(current_user)
    json.myGame game.user_my_game(current_user)
  end
end
