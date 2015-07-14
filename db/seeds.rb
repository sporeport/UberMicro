u1 = User.create(name: "sam", email: "sam", password: "samsam")

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


mg1 = MyGame.create(user_id: u1.id,
                    game_id: Game.first.id,
                    status: "wants-to-play")

mg2 = MyGame.create(user_id: u1.id,
                    game_id: Game.last.id,
                    status: "wants-to-play")
