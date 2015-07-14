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
#

class Game < ActiveRecord::Base
  validates :title, :company, :genre, :avg_rating, :description, presence: true

  after_initialize :ensure_rating

  has_many :users

  private

  def ensure_rating
    self.avg_rating ||= 0
  end

end
