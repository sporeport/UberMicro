json.array! @my_games do |my_game|
  json.extract! my_game, :id, :user_id, :game_id, :status, :created_at, :updated_at, :my_rating
  json.game do
    json.extract! my_game.game, :id, :title, :company, :genre, :description
    json.avg_rating(my_game.game.avg_rating)
  end
end
