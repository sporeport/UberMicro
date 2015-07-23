class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      @new_user = true
      # redirect_to :action => 'home'
      render :home
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to root_path
    end
  end

  def home
    if signed_in?
      @user = current_user
    else
      @user = User.new
    end
    render :home
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
