class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 12, scale: 2, null: false, default: 0

      t.timestamps
    end
  end
end
