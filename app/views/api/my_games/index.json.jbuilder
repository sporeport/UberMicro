json.array! @my_games do |my_game|
  json.extract! my_game, :id, :user_id, :game_id, :status, :created_at, :updated_at, :my_rating
  json.game my_game.game
end
