class UsersController < ApplicationController

  def create
    if params[:regular]
      @user = User.new(user_params)

      if @user.save
        sign_in(@user)
        @new_user = true
        flash.now[:notice] = ["Welcome to UberMicro, #{@user.name}."]
        render :home
      else
        flash[:errors] = @user.errors.full_messages
        redirect_to root_path
      end
    elsif params[:guest]
      @user = User.find_by(email: "guest@example.com")

      if @user
        sign_in(@user)
        redirect_to root_path
      else
        redirect_to root_path
      end
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
