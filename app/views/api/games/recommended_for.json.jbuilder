json.array! @rec_games do |rec_couple|
  json.extract! rec_couple[1], :id, :title, :genre, :company, :description, :avg_rating
  json.because_title rec_couple[0]
end
