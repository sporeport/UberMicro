class Api::ListsController < ApplicationController

  def create
    @list = current_user.lists.create(list_params)

    if @list
      render json: @list
    else
      render json: @list.errors.full_messages
    end
  end


  private

  def list_params
    params.require(:list).permit(:name)
  end
end
