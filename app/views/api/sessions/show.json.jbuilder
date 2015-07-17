json.extract! @current_user, :name, :email, :id

json.lists do
  json.array! @current_user.lists
end
