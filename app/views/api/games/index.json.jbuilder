json.results do
  json.array! @games do |game|

    json.extract! game, :id, :title, :company, :genre, :description

    json.avg_rating(game.avg_rating)
    json.image_url asset_path(game.image.url(:original))

    if signed_in? && game.my_game_id
      json.myGame({status: game.status, my_rating: game.my_rating, id: game.my_game_id})
    end
  end
end

json.total_pages(@games.total_pages)

json.current_page(@games.current_page)

json.query(@query)
