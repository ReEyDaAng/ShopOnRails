class Order < ApplicationRecord
  belongs_to :user

  has_many :orders_descriptions, dependent: :destroy
  has_many :items, through: :orders_descriptions

  validates :amount, numericality: { greater_than_or_equal_to: 0 }, presence: true
end