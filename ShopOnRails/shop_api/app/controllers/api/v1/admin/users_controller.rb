module Api
  module V1
    module Admin
      class UsersController < Api::V1::Admin::BaseController
        def index
          render json: User.order(:id).map { |u| user_payload(u) }
        end

        def show
          user = User.find(params[:id])
          render json: user_payload(user)
        rescue ActiveRecord::RecordNotFound
          render json: { error: "User not found" }, status: :not_found
        end

        def create
          user = User.new(user_params)
          user.save!
          render json: user_payload(user), status: :created
        rescue ActiveRecord::RecordInvalid => e
          render json: { error: "Validation failed", details: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def update
          user = User.find(params[:id])

          attrs = user_params.to_h
          if attrs["password"].blank?
            attrs.delete("password")
            attrs.delete("password_confirmation")
          end

          user.update!(attrs)
          render json: user_payload(user)
        rescue ActiveRecord::RecordNotFound
          render json: { error: "User not found" }, status: :not_found
        rescue ActiveRecord::RecordInvalid => e
          render json: { error: "Validation failed", details: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        def destroy
          user = User.find(params[:id])
          user.destroy!
          head :no_content
        rescue ActiveRecord::RecordNotFound
          render json: { error: "User not found" }, status: :not_found
        end

        private

        def user_params
          params.require(:user).permit(
            :first_name, :last_name, :email, :role,
            :password, :password_confirmation
          )
        end

        def user_payload(u)
          {
            id: u.id,
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            role: u.role,
            created_at: u.created_at,
            updated_at: u.updated_at
          }
        end
      end
    end
  end
end