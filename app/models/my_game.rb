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

class MyGame < ActiveRecord::Base
  validates :user_id, :game_id, :my_rating, :status, presence: true

  after_initialize :ensure_my_rating

  belongs_to :user
  belongs_to :game

  private

  def ensure_my_rating
    self.my_rating ||= 0
  end

end
