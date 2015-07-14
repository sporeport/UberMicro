class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to :action => 'welcome'
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to root_path
    end
  end

  def welcome
    @user = User.new
    render :welcome
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
