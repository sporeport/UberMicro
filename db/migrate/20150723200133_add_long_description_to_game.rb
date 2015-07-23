class AddLongDescriptionToGame < ActiveRecord::Migration
  def change
    add_column :games, :description_long, :text
  end
end
