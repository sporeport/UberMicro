class MyRatingAndAvgRatingColumns < ActiveRecord::Migration
  def change
    remove_column(:my_games, :my_rating, :integer)
    remove_column(:games, :avg_rating, :integer)
  end
end
