class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :game_id, null: false
      t.integer :author_id, null: false
      t.text :body, null: false

      t.timestamps
    end
    add_index :comments, :game_id
    add_index :comments, :author_id
  end
end
