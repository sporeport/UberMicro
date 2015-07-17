class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to :action => 'home'
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to root_path
    end
  end

  def home
    render :home
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
