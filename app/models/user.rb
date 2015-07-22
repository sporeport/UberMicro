# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  name                :string           not null
#  email               :string           not null
#  session_token       :string           not null
#  password_digest     :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  uid                 :string
#  provider            :string
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :name, :password_digest, :email, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :email, uniqueness: true

  has_many :my_games
  has_many :lists
  has_many :games, through: :my_games, source: :game

  has_attached_file :avatar, default_url: "default-user.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  def self.generate_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)

    return @user if @user && @user.is_password?(password)
    nil
  end

  def self.find_by_omniauth(uid, provider)
    @user = User.find_by(uid: uid)

    if !@user
      return nil
    elsif @user.provider != provider
      return nil
    else
      return @user
    end
  end

  after_initialize :ensure_token

  after_create :ensure_lists

  attr_reader :password


  def get_rec_genre
    return nil if (self.games.blank?)
    games = self.games

    rec_games = []
    i = 0
    while i < 5 || i < games.count

      game = games.sample
      rec_game =  Game.where("genre = ?", game.genre).sample

      if rec_game != game
        rec_couple = [game.title, rec_game];
        rec_games << rec_couple
      end
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

  def ensure_lists
    self.lists.create!(name: "played")
    self.lists.create!(name: "currently-playing")
  end
end
