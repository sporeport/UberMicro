
json.array! @games do |game|
  json.extract! game, :id, :title, :genre, :company, :description, :avg_rating
  json.image_url asset_path(game.image.url(:original))

  if signed_in? && game.user_my_game(current_user)
    json.myGame game.user_my_game(current_user)
  end
end
