class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
    end

    add_index :lists, :user_id
  end
end
