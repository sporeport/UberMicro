# == Schema Information
#
# Table name: games
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  company     :string
#  genre       :string           not null
#  avg_rating  :integer          not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
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

  validates :title, :company, :genre, :avg_rating, :description, presence: true
  after_initialize :ensure_rating

  has_many :my_games
  has_many :comments
  has_many :users, through: :my_games, source: :user

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

  def user_my_game(user)
    self.my_games.where("user_id = ?", user.id).limit(1).first
  end

  private

  def ensure_rating
    self.avg_rating ||= 0
  end

end
