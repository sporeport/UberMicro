# == Schema Information
#
# Table name: games
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  company     :string
#  genre       :string           not null
#  avg_rating  :integer          not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image_url   :string
#

require 'test_helper'

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
