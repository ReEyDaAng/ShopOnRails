module Api
  module V1
    class ProfilesController < Api::V1::BaseController
      before_action :authenticate_user!

      def show
        render json: user_payload(current_user)
      end

      def update
        user = current_user

        attrs = profile_params.to_h

        if attrs["password"].blank?
          attrs.delete("password")
          attrs.delete("password_confirmation")
        end

        user.update!(attrs)

        render json: user_payload(user)
      rescue ActiveRecord::RecordInvalid => e
        render_error("Validation failed", details: e.record.errors.full_messages)
      end

      private

      def profile_params
        params.require(:user).permit(
          :first_name, :last_name, :email,
          :password, :password_confirmation
        )
      end

      def user_payload(user)
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      end
    end
  end
end