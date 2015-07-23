class AddMyRatingToMyGames < ActiveRecord::Migration
  def change
    add_column(:my_games, :my_rating, :float)
  end
end
