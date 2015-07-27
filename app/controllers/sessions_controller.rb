class SessionsController < ApplicationController

  def omniauth
    @user = User.find_by_omniauth(auth_hash[:uid].to_s, auth_hash[:provider])

    if !@user
      @user = User.new({uid: auth_hash[:uid].to_s, provider: auth_hash[:provider]})
      @user.name = auth_hash[:info][:name]
      @user.email = auth_hash[:info][:email]
      @user.password = SecureRandom.urlsafe_base64
      if @user.save!
        sign_in(@user)
        redirect_to root_url
      else
        flash.now[:errors] = @user.errors.full_messages
        redirect_to root_url
      end
    else
      sign_in(@user)
      redirect_to root_url
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])
    if @user
      sign_in(@user)
      redirect_to root_path
    else
      flash[:errors] = ["wrong email/password combination"]
      redirect_to root_path
    end
  end

  def destroy
    sign_out
    redirect_to root_path
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

end
