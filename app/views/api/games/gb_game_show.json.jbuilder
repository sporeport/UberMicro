json.array! @results do |game|
  json.gbid(game["id"])
  json.description(game["deck"])
  json.title(game["name"])

  if game["image"] && game["image"]["small_url"]
    json.image_url(game["image"]["small_url"])
  end
end
