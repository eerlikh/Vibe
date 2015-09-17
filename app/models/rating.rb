# has many to one relationship to User

class Rating < ActiveRecord::Base
  belongs_to :user
end
