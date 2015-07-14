class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.string :company
      t.string :genre, null: false
      t.integer :avg_rating, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
