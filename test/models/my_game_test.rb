# == Schema Information
#
# Table name: my_games
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  game_id    :integer          not null
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  my_rating  :float
#

require 'test_helper'

class MyGameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
