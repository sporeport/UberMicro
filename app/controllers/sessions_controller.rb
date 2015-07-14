class SessionsController < ApplicationController

  def new

  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])

    if @user
      sign_in(@user)
      redirect_to root_path
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to root_path
    end
  end

  def destroy
    sign_out
    render :destroy
  end

end
