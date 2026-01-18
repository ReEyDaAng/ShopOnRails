admin_email = "admin@example.com"
admin_password = "adminadmin"

admin = User.find_or_initialize_by(email: admin_email)
admin.first_name = "Admin"
admin.last_name  = "Admin"
admin.role       = "admin"
admin.password   = admin_password
admin.password_confirmation = admin_password
admin.save!

puts "Admin: #{admin.email} / #{admin_password}"

items_data = [
  { name: "iPhone",    description: "Phone",      price: 999.99 },
  { name: "Gigabyte",  description: "Laptop",     price: 1299.99 },
  { name: "Sven",      description: "Headphones", price: 199.50 }
]

items_data.each do |data|
  Item.find_or_create_by!(name: data[:name]) do |i|
    i.description = data[:description]
    i.price = data[:price]
  end
end

puts "Items: #{Item.count}"
puts "Seed done!"