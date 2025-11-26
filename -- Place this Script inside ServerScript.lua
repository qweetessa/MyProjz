-- Place this Script inside ServerScriptService

game.Players.PlayerAdded:Connect(function(player)
    -- Create a folder named 'leaderstats' (required for leaderboard)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- Example stat: Chapter
    local chapter = Instance.new("IntValue")
    chapter.Name = "Chapter"
    chapter.Value = 1 -- Starting chapter
    chapter.Parent = leaderstats

    -- Example stat: Survived
    local survived = Instance.new("BoolValue")
    survived.Name = "Survived"
    survived.Value = false -- Default value
    survived.Parent = leaderstats

    -- Example stat: Score
    local score = Instance.new("IntValue")
    score.Name = "Score"
    score.Value = 0 -- Starting score
    score.Parent = leaderstats
end)