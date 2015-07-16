Rails.application.routes.draw do
  root to: "users#home"

  resources :users, only: :create
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: 'json' } do
    resources :games, only: [:index, :show, :create, :destroy]
    resources :my_games, only: [:index, :show, :create, :destroy]
    resource :session, only: :show
    resources :comments, only: :create
  end
end
