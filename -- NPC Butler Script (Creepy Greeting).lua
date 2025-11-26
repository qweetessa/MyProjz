-- NPC Butler Script (Creepy Greeting)

local Butler = {}

function Butler:greet(playerName)
    local greetings = {
        "Welcome, "..playerName..". We've been expecting you...",
        "Ah, another guest... How delightful.",
        "Please, do come in. The shadows have missed your company.",
        "The master will be so pleased to see you... alive.",
        "May I take your coat... or perhaps your soul?"
    }
    -- Pick a random creepy greeting
    local greeting = greetings[math.random(#greetings)]
    print(greeting)
end

-- Example usage:
math.randomseed(os.time())
Butler:greet("Sir/Madam")