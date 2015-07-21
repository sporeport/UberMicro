Rails.application.routes.draw do
  root to: "users#home"

  #omni auth
  get '/auth/:provider/callback', to: 'sessions#omniauth'

  resources :users, only: :create
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: 'json' } do
    resources :games, only: [:show, :create, :destroy] do
      collection do
        get "search"
        get "popular"
        get "recommended_for"
      end
    end
    resources :my_games, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: :show
    resources :comments, only: :create
    resources :users, only: :create
    resources :lists, only: :create
  end
end
