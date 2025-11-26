-- Simple UI Manager for showing/hiding inventory, decisions, and pop-up hints in Lua

local UIManager = {
    inventoryVisible = false,
    decisionsVisible = false,
    hintVisible = false,
    hintText = ""
}

function UIManager:toggleInventory()
    self.inventoryVisible = not self.inventoryVisible
end

function UIManager:toggleDecisions()
    self.decisionsVisible = not self.decisionsVisible
end

function UIManager:showHint(text)
    self.hintText = text or ""
    self.hintVisible = true
end

function UIManager:hideHint()
    self.hintVisible = false
    self.hintText = ""
end

function UIManager:draw()
    if self.inventoryVisible then
        -- Draw inventory UI
        print("[Inventory UI Visible]")
    end
    if self.decisionsVisible then
        -- Draw decisions UI
        print("[Decisions UI Visible]")
    end
    if self.hintVisible then
        -- Draw pop-up hint
        print("[Hint]: " .. self.hintText)
    end
end

-- Example usage:
UIManager:toggleInventory()
UIManager:showHint("Press E to interact.")
UIManager:draw()
UIManager:hideHint()
UIManager:draw()

return UIManager