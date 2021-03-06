json.array! @rec_games do |rec_couple|
  json.extract! rec_couple[1], :id, :title, :genre, :company, :description, :avg_rating
  json.because_title rec_couple[0]
  json.image_url asset_path(rec_couple[1].image.url(:original))

  if rec_couple[1].user_my_game(@user)
    json.myGame rec_couple[1].user_my_game(@user)
  end
end
