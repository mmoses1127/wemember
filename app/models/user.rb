class User < ApplicationRecord

    has_secure_password

    before_validation :ensure_session_token,

    validates :username, :password_digest, :session_token, presence: true, uniqueness: true

    def self.find_by_credentials(email, password)
        user = nil
        user = User.find_by(email: email)

        if user && user.authenticate(password)
        return user
        else
        return nil 
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    def generate_default_pic
        unless self.profile_pic.attached?
        file = URI.open("https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/wheelie.jpg")
        self.profile_pic.attach(io: file, filename: "default")
        end
    end

    private
    def generate_unique_session_token
        while true
        token = SecureRandom::urlsafe_base64(16)
        return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

end


