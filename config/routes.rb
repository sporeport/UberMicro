Rails.application.routes.draw do
  resources :users, only: :create
  resources :session, only: :new, :create, :destroy
end
