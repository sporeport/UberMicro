json.array! @results do |game|
  if game["image"] && game["image"]["thumb_url"] && game["deck"]
    json.gbid(game["id"])
    json.description(game["deck"])
    json.title(game["name"])
    json.image_url(game["image"]["thumb_url"])
  end
end
