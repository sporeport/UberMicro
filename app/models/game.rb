# == Schema Information
#
# Table name: games
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  company            :string
#  genre              :string           not null
#  description        :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Game < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_tcg,
    using: {
      tsearch: { dictionary: "english" }
    },
    against: {
      title: 'A',
      company: 'B',
      genre: 'C'
    }

  has_attached_file :image, default_url: "question-mark.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :title, :company, :genre, :description, presence: true

  has_many :my_games
  has_many :comments
  has_many :users, through: :my_games, source: :user

  def self.get_gb_game(gbid)
    params_hash = {
      format: "json",
      api_key: ENV['GIANT_BOMB_API_KEY'],
      field_list: "name,deck,image,genres,developers",
    }

    results = RestClient.get "http://www.giantbomb.com/api/game/#{gbid}", params: params_hash
    JSON.parse(results)["results"]
  end

  def self.search_in_gb(query)
    params_hash = {
      format: "json",
      api_key: ENV['GIANT_BOMB_API_KEY'],
      resources: "game",
      field_list: "name,deck,id,image",
      query: query
    }

    results = RestClient.get "http://www.giantbomb.com/api/search", params: params_hash
    JSON.parse(results)["results"]
  end

  def self.with_my_games(user)
    my_user_games = <<-SQL
      LEFT OUTER JOIN (
        #{user.my_games.to_sql}
        ) AS my_user_games ON my_user_games.game_id = games.id
    SQL


    my_games_select = <<-SQL
      games.*,
      my_user_games.status as status,
      my_user_games.my_rating as my_rating,
      my_user_games.id as my_game_id
    SQL

    @games = Game.joins(my_user_games).select(my_games_select)
  end

  def avg_rating
    ratings = self.my_games.select("my_games.my_rating").where("my_games.my_rating > 0")

    sum = ratings.inject(0) do |sum, my_game|
      sum + my_game.my_rating
    end

    if ratings.count == 0
      0
    else
      (sum / ratings.count)
    end
  end

  def user_my_game(user)
    self.my_games.where("user_id = ?", user.id).limit(1).first
  end
end
