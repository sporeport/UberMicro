json.extract! @current_user, :name, :email, :id, :created_at

json.lists do
  json.array! @current_user.lists
end
