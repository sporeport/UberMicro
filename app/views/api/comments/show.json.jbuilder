json.extract! @comment, :id, :body, :created_at, :game_id, :author_id
json.author @comment.author.name
json.author_avatar_url asset_path(@comment.author.avatar.url(:original))
