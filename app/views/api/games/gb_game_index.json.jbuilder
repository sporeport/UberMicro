
json.results do
  json.array! @results do |game|
    if game["image"] && game["image"]["thumb_url"] &&
       !game["deck"].nil? && !game["deck"].empty?

      json.gbid(game["id"])
      json.description(game["deck"])
      json.title(game["name"])
      json.image_url(game["image"]["thumb_url"])
    end
  end
end

json.total_pages(@total_pages)
json.current_page(@page)
json.query(@query)
