
json.extract! @game, :id, :title, :genre, :company, :description

json.avg_rating(@game.avg_rating)
json.image_url asset_path(@game.image.url(:original))

json.comments do
  json.array! @game.comments do |comment|
    json.extract! comment, :id, :body, :author_id, :game_id, :created_at
    json.author comment.author.name
    json.author_avatar_url asset_path(comment.author.avatar.url(:original))
  end
end

if signed_in? && @game.user_my_game(current_user)
  json.myGame @game.user_my_game(current_user)
end
