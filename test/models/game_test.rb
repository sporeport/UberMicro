# == Schema Information
#
# Table name: games
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  company            :string
#  genre              :string           not null
#  description        :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'test_helper'

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
