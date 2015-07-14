Rails.application.routes.draw do
  root to: "users#home"

  resources :users, only: :create
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :games, only: [:index, :show, :create, :destroy]
  end
end
