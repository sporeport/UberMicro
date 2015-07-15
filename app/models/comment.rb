# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  game_id    :integer          not null
#  author_id  :integer          not null
#  body       :text             not null
#  created_at :datetime
#  updated_at :datetime
#

class Comment < ActiveRecord::Base
  validates :game_id, :author_id, :body, presence: true

  belongs_to :game
  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
end
