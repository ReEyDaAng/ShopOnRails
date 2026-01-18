module Api
  module V1
    class BaseController < ApplicationController
      respond_to :json

      private

      def render_error(message, status: :unprocessable_entity, details: nil)
        payload = { error: message }
        payload[:details] = details if details
        render json: payload, status: status
      end
    end
  end
end