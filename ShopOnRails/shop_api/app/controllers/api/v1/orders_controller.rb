module Api
  module V1
    class OrdersController < Api::V1::BaseController
      before_action :authenticate_user!

      # GET /api/v1/orders
      def index
        orders = current_user.orders
                             .includes(orders_descriptions: :item)
                             .order(id: :desc)

        render json: orders.map { |o| order_payload(o) }
      end

      # GET /api/v1/orders/:id
      def show
        order = current_user.orders.includes(orders_descriptions: :item).find(params[:id])
        render json: order_payload(order)
      rescue ActiveRecord::RecordNotFound
        render_error("Order not found", status: :not_found)
      end

      # POST /api/v1/orders
      # body:
      # { "items":[{"item_id":4,"quantity":2},{"item_id":6,"quantity":1}] }
      def create
        items_param = params.require(:items)

        unless items_param.is_a?(Array) && items_param.any?
          return render_error("Items must be a non-empty array")
        end

        normalized = items_param.map do |row|
          {
            item_id: row[:item_id].to_i,
            quantity: row[:quantity].to_i
          }
        end

        if normalized.any? { |r| r[:item_id] <= 0 || r[:quantity] <= 0 }
          return render_error("Each item must have item_id > 0 and quantity > 0")
        end

        items_by_id = Item.where(id: normalized.map { |r| r[:item_id] }).index_by(&:id)

        missing_ids = normalized.map { |r| r[:item_id] }.uniq - items_by_id.keys
        if missing_ids.any?
          return render_error("Some items not found", details: missing_ids)
        end

        order = nil

        ActiveRecord::Base.transaction do
          amount = normalized.sum do |r|
            items_by_id[r[:item_id]].price.to_d * r[:quantity]
          end

          order = current_user.orders.create!(amount: amount)

          normalized.each do |r|
            OrdersDescription.create!(
              order: order,
              item: items_by_id[r[:item_id]],
              quantity: r[:quantity]
            )
          end
        end

        order = current_user.orders.includes(orders_descriptions: :item).find(order.id)
        render json: order_payload(order), status: :created
      rescue ActionController::ParameterMissing => e
        render_error(e.message)
      rescue ActiveRecord::RecordInvalid => e
        render_error("Validation failed", details: e.record.errors.full_messages)
      end

      private

      def order_payload(order)
        {
          id: order.id,
          amount: order.amount.to_s,
          created_at: order.created_at,
          items: order.orders_descriptions.map do |od|
            {
              item_id: od.item_id,
              name: od.item.name,
              price: od.item.price.to_s,
              quantity: od.quantity
            }
          end
        }
      end
    end
  end
end