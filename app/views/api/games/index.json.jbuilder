

json.array! @games do |game|

  json.extract! game, :id, :title, :company, :genre, :avg_rating, :description
  if game.user_my_games(current_user)
    json.my_games do
      json.array! game.user_my_games(current_user)
    end
  end
end
#  title       :string           not null
#  company     :string
#  genre       :string           not null
#  avg_rating  :integer          not null
#  description :text
