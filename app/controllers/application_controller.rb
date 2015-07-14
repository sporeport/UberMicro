class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def signed_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def sign_in(user)
    user.reset_token!
    session[:session_token] = user.session_token
  end

  def sign_out
    current_user.reset_token!
    session[:session_token] = nil
  end
end
