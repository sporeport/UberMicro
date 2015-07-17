# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :name, :password_digest, :email, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :my_games
  has_many :games, through: :my_games, source: :game

  def self.generate_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)

    return @user if @user && @user.is_password?(password)
    nil
  end

  after_initialize :ensure_token

  attr_reader :password


  def get_rec_genre
    games = self.games
    rec_games = []

    i = 0
    while i < 5 || i < games.count

      game = games.sample
      rec_game =  Game.where("genre = ?", game.genre).sample
      rec_couple = [game.title, rec_game];

      rec_games << rec_couple
      i += 1
    end

    return rec_games
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = User.generate_token
    save!
  end

  private

  def ensure_token
    self.session_token ||= User.generate_token
  end
end
