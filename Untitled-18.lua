-- Simple Lua script: Players spawn in a bus, then arrive at a mansion

-- Table to hold player objects
local players = {}

-- Bus and Mansion positions
local busSpawn = {x = 100, y = 0, z = 50}
local mansionEntrance = {x = 500, y = 0, z = 200}

-- Function to spawn player in the bus
function spawnPlayerInBus(player)
    player.position = {busSpawn.x, busSpawn.y, busSpawn.z}
    player.inBus = true
    print(player.name .. " spawned in the bus.")
end

-- Function to move all players to the mansion
function arriveAtMansion()
    for _, player in ipairs(players) do
        if player.inBus then
            player.position = {mansionEntrance.x, mansionEntrance.y, mansionEntrance.z}
            player.inBus = false
            print(player.name .. " arrived at the mansion.")
        end
    end
end

-- Example usage:
-- Add players
table.insert(players, {name = "Alice"})
table.insert(players, {name = "Bob"})

-- Spawn all players in the bus
for _, player in ipairs(players) do
    spawnPlayerInBus(player)
end

-- Simulate bus arriving at the mansion after some time
-- (In a real game, use a timer or event)
arriveAtMansion()