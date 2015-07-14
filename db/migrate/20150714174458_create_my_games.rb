class CreateMyGames < ActiveRecord::Migration
  def change
    create_table :my_games do |t|
      t.integer :user_id, null: false
      t.integer :game_id, null: false
      t.integer :my_rating, default: 0
      t.string :status

      t.timestamps null: false
    end
    
    add_index :my_games, :user_id
    add_index :my_games, :game_id
    add_index :my_games, [:user_id, :game_id], unique: true
  end
end
