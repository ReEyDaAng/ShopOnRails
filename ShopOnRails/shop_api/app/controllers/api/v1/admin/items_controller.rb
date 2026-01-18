module Api
  module V1
    module Admin
      class ItemsController < Api::V1::Admin::BaseController
        def index
          render json: Item.order(:id)
        end

        def show
          item = Item.find(params[:id])
          render json: item
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Item not found" }, status: :not_found
        end

        def create
          item = Item.create!(item_params)
          render json: item, status: :created
        rescue ActiveRecord::RecordInvalid => e
          render json: { error: "Validation failed", details: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def update
          item = Item.find(params[:id])
          item.update!(item_params)
          render json: item
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Item not found" }, status: :not_found
        rescue ActiveRecord::RecordInvalid => e
          render json: { error: "Validation failed", details: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def destroy
          item = Item.find(params[:id])
          item.destroy!
          head :no_content
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Item not found" }, status: :not_found
        end

        private

        def item_params
          params.require(:item).permit(:name, :description, :price)
        end
      end
    end
  end
end