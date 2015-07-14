Rails.application.routes.draw do
  root to: "users#welcome"

  resources :users, only: :create
  resources :session, only: [:new, :create, :destroy]
end
