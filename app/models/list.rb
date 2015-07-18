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
  validates :name, uniqueness: true

  belongs_to :user
end
