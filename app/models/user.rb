class User < ActiveRecord::Base
<<<<<<< HEAD
has_secure_password

has_many :ratings

before_create :generate_token

def generate_token
  self.token = SecureRandom.urlsafe_base64(nil, false)
end
=======
  has_secure_password
>>>>>>> 01aa402b89719d9352b887bf00ea8b4394d88441
end
