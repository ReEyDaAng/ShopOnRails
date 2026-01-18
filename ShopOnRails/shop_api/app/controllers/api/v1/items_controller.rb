module Api
  module V1
    class ItemsController < Api::V1::BaseController
      def index
        items = Item.all

        if params[:query].present?
          q = "%#{params[:query]}%"
          items = items.where("name ILIKE :q OR description ILIKE :q", q: q)
        end

        render json: items.order(:id)
      end

      def show
        item = Item.find(params[:id])
        render json: item
      rescue ActiveRecord::RecordNotFound
        render_error("Item not found", status: :not_found)
      end
    end
  end
end