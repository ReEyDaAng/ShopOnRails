class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :orders, dependent: :destroy

  ROLES = %w[admin user].freeze

  validates :first_name, :last_name, presence: true
  validates :role, inclusion: { in: ROLES }

  before_validation :set_default_role, on: :create
  before_create :ensure_jti!

  def admin?
    role == "admin"
  end

  private

  def set_default_role
    self.role = "user" if role.blank?
  end

  def ensure_jti!
    self.jti ||= SecureRandom.uuid
  end
end