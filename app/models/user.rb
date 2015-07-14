class User < ActiveRecord::Base
  validates :name, :password_digest, :email, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  def self.generate_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_cedentials(email, password)
    @user = User.find_by(email: email)

    return @user if @user && @user.is_password?(password)
    nil
  end

  after_initialze :ensure_token



  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = User.generate_token
  end

  private

  def ensure_token
    self.session_token ||= User.generate_token
  end
end
