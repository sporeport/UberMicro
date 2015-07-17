u1 = User.create(name: "sam", email: "sam", password: "samsam")


genres = ["action", "strategy", "sim"]
companies = ["sony", "Atari", "Arkane Studios", "BioWare", "ArenaNet", "Blizzard Entertainment"]


30.times do |x|
  title = Faker::Name.first_name
  company = companies[x % 5]
  genre = Faker::Lorem.word
  avg_rating = (x % 5)
  description = Faker::Lorem.paragraph
  Game.create(title: title,
              company: company,
              genre: genres[x % 3],
              avg_rating: avg_rating,
              description: description)
end


mg1 = MyGame.create(user_id: u1.id,
                    game_id: Game.first.id,
                    status: "wants-to-play")

mg2 = MyGame.create(user_id: u1.id,
                    game_id: Game.last.id,
                    status: "wants-to-play")

c1 = Comment.create(author_id: u1.id, game_id: Game.first.id,
                    body: Faker::Lorem.paragraph(3))
c2 = Comment.create(author_id: u1.id, game_id: Game.first.id,
                    body: Faker::Lorem.paragraph(3))
c3 = Comment.create(author_id: u1.id, game_id: Game.first.id,
                    body: Faker::Lorem.paragraph(3))
