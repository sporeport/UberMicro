
10.times do |x|
  title = Faker::Name.first_name
  company = Faker::Company.name
  genre = Faker::Lorem.word
  avg_rating = (x % 5)
  description = Faker::Lorem.paragraph
  Game.create(title: title,
              company: company,
              genre: genre,
              avg_rating: avg_rating,
              description: description)
end
