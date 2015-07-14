class UsersController < ApplicationController

  def create

  end

  def welcome
    @user = User.new
    render :welcome
  end
end
