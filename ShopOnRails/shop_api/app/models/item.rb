class Item < ApplicationRecord
  has_many :orders_descriptions, dependent: :destroy
  has_many :orders, through: :orders_descriptions

  validates :name, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end