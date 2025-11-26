-- Simple Dialogue System in Lua (for Roblox or similar engines)

local Players = game:GetService("Players")
local player = Players.LocalPlayer
local UIS = game:GetService("UserInputService")

-- Dialogue data
local dialogues = {
    [1] = {text = "Hello there!", next = 2},
    [2] = {text = "Welcome to our world.", next = 3},
    [3] = {text = "Would you like to learn more?", choices = {
        {text = "Yes", next = 4},
        {text = "No", next = 5}
    }},
    [4] = {text = "Great! Let's get started.", next = nil},
    [5] = {text = "Alright, see you around!", next = nil}
}

-- UI setup
local screenGui = Instance.new("ScreenGui", player.PlayerGui)
local frame = Instance.new("Frame", screenGui)
frame.Size = UDim2.new(0.4,0,0.2,0)
frame.Position = UDim2.new(0.3,0,0.7,0)
frame.BackgroundColor3 = Color3.new(0,0,0)
frame.Visible = false

local textLabel = Instance.new("TextLabel", frame)
textLabel.Size = UDim2.new(1,0,0.7,0)
textLabel.Position = UDim2.new(0,0,0,0)
textLabel.BackgroundTransparency = 1
textLabel.TextColor3 = Color3.new(1,1,1)
textLabel.TextScaled = true
textLabel.Text = ""

local choiceButtons = {}

-- Auto-type effect
local function typeText(fullText)
    textLabel.Text = ""
    for i = 1, #fullText do
        textLabel.Text = string.sub(fullText, 1, i)
        wait(0.03)
    end
end

-- Show dialogue
local function showDialogue(id)
    frame.Visible = true
    for _, btn in ipairs(choiceButtons) do btn:Destroy() end
    choiceButtons = {}

    local data = dialogues[id]
    typeText(data.text)

    if data.choices then
        for i, choice in ipairs(data.choices) do
            local btn = Instance.new("TextButton", frame)
            btn.Size = UDim2.new(0.45,0,0.25,0)
            btn.Position = UDim2.new(0.05 + 0.5*(i-1),0,0.75,0)
            btn.Text = choice.text
            btn.MouseButton1Click:Connect(function()
                showDialogue(choice.next)
            end)
            table.insert(choiceButtons, btn)
        end
    elseif data.next then
        -- Click to continue
        local conn
        conn = UIS.InputBegan:Connect(function(input)
            if input.UserInputType == Enum.UserInputType.MouseButton1 or input.KeyCode == Enum.KeyCode.Space then
                conn:Disconnect()
                showDialogue(data.next)
            end
        end)
    else
        -- End of dialogue
        local conn
        conn = UIS.InputBegan:Connect(function(input)
            if input.UserInputType == Enum.UserInputType.MouseButton1 or input.KeyCode == Enum.KeyCode.Space then
                conn:Disconnect()
                frame.Visible = false
            end
        end)
    end
end

-- Proximity or click activation (example: click a part)
local part = workspace:FindFirstChild("DialoguePart")
if part then
    part.ClickDetector.MouseClick:Connect(function()
        showDialogue(1)
    end)
end

-- Or proximity activation (uncomment to use)
--[[
local proximityPrompt = Instance.new("ProximityPrompt", part)
proximityPrompt.ActionText = "Talk"
proximityPrompt.Triggered:Connect(function()
    showDialogue(1)
end)
]]