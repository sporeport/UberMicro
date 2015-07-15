json.extract! @game, :id, :title, :company, :description, :created_at, :updated_at

json.comments @game.comments
