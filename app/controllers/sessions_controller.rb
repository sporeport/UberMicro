class SessionsController < ApplicationController

  def new

  end

  def omniauth

    fail
  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])
    if @user
      sign_in(@user)
      redirect_to root_path
    else
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
