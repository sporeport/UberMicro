json.extract! @game, :id, :title, :genre, :company, :description, :avg_rating

json.comments do
  json.array! @game.comments do |comment|
    json.extract! comment, :id, :body, :author_id, :game_id
    json.author comment.author.name
  end
end

if signed_in? && @game.user_my_game(current_user)
  json.myGame @game.user_my_game(current_user)
end
