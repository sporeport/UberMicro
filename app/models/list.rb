class List < ActiveRecord::Base
  validates :user_id, :name, presence: true
  validates :name, uniqueness: true

  
end
