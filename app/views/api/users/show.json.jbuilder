json.extract! @user, :id, :email, :name, :created_at
json.avatar_url asset_path(@user.avatar.url(:original))
