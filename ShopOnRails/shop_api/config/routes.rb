Rails.application.routes.draw do
  devise_for :users,
    defaults: { format: :json },
    controllers: {
      registrations: "users/registrations",
      sessions: "users/sessions"
    }

  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :show]

      resources :orders, only: [:index, :show, :create]
      resource  :profile, only: [:show, :update]

      namespace :admin do
        resources :users
        resources :items
      end
    end
  end
end