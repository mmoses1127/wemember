@memories.each do |memory|
  json.set! memory.id do
    json.extract! memory, :id, :title, :description, :date, :author_id
  end
end