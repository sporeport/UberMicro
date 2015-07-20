# == Schema Information
#
# Table name: lists
#
#  id      :integer          not null, primary key
#  name    :string           not null
#  user_id :integer          not null
#

class List < ActiveRecord::Base
  validates :user_id, :name, presence: true
  validates :name, uniqueness: { scope: :user_id,
                                 message: "you can only have one list of that name." }

  belongs_to :user
end
