class Api::SessionsController < ApplicationController

  def show
    @current_user = current_user

    if @current_user
      render :show
    else
      render json: {}
    end
  end

end
