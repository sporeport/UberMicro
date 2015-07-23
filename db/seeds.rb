u1 = User.create!(name: "sam", email: "sam", password: "samsam")

guest = User.create!(name: "guest", email: "guest@example.com", password: "password")


genres = ["action", "strategy", "sim"]
companies = ["sony", "Atari", "Arkane Studios", "BioWare", "ArenaNet", "Blizzard Entertainment"]
game_names = ["Advance Wars: Dual Strike",
              "Alan Wake",
              "Angry Birds",
              "Assassin's Creed II",
              "Batman: Arkham Asylum",
              "Battlefield: Bad Company 2",
              "Bionic Commando Rearmed",
              "BioShock",
              "Borderlands",
              "Braid",
              "Brain Age",
              "Burnout Paradise",
              "Call of Duty 4: Modern Warfare",
              "Castle Crashers",
              "Castlevania: Dawn of Sorrow",
              "Company of Heroes",
              "Crysis",
              "Cut the Rope",
              "Dead Rising",
              "Dead Space",
              "Demon’s Souls",
              "DJ Hero",
              "Donkey Kong Country Returns",
              "Dragon Age: Origins",
              "Elder Scrolls IV: Oblivion",
              "Elite Beat Agents",
              "Fable II",
              "Fallout 3",
              "Far Cry 2",
              "FIFA 11",
              "Flower"]


30.times do |x|
  title = game_names[x % 30]
  company = companies[x % 5]
  genre = Faker::Lorem.word
  description = Faker::Lorem.paragraph
  Game.create(title: title,
              company: company,
              genre: genres[x % 3],
              description: description)
end




mg1 = MyGame.create(user_id: u1.id,
                    game_id: Game.first.id,
                    status: "wants-to-play")

mg2 = MyGame.create(user_id: u1.id,
                    game_id: Game.last.id,
                    status: "wants-to-play")

mg3 = MyGame.create(user_id: guest.id,
                    game_id: Game.first.id,
                    status: "wants-to-play")

mg4 = MyGame.create(user_id: guest.id,
                    game_id: Game.last.id,
                    status: "currently-playing")


c1 = Comment.create(author_id: u1.id, game_id: Game.first.id,
                    body: Faker::Lorem.paragraph(3))
c2 = Comment.create(author_id: u1.id, game_id: Game.first.id,
                    body: Faker::Lorem.paragraph(3))
c3 = Comment.create(author_id: u1.id, game_id: Game.first.id,
                    body: Faker::Lorem.paragraph(3))
