json.extract! @comment, :id, :body, :created_at, :game_id, :author_id
json.author @comment.author.name
