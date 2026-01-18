class AddUniqueIndexToOrdersDescriptions < ActiveRecord::Migration[7.1]
  def change
    add_index :orders_descriptions, [:order_id, :item_id], unique: true
  end
end