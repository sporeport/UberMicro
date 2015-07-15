json.extract! @game, :id, :title, :company, :description, :created_at, :updated_at

json.comments do
  json.array! @game.comments do |comment|
    json.extract! comment, :id, :body, :author_id, :game_id
    json.author comment.author.name
  end
end
