# creates user class model, has many relationship to ratings, generates token with bcrypt

class User < ActiveRecord::Base

has_secure_password

has_many :ratings

validates :username, uniqueness: { case_sensitive: true, message: "user name already taken" }

validates :password, confirmation: true
validates :password_confirmation, presence: true

before_create :generate_token

def generate_token
  self.token = SecureRandom.urlsafe_base64(nil, false)
end

end
