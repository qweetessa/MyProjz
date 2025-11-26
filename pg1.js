<script>
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const dueDate = document.getElementById("dueDate");
  const addBtn = document.getElementById("addBtn");
  const taskGrid = document.querySelector(".task-grid");
  const toggleDark = document.getElementById("toggleDark");

  // Load tasks and theme
  window.addEventListener("load", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskCard(task.text, task.priority, task.due, task.completed));
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
  });

  // Add new task
  addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    const due = dueDate.value || "No date";
    if (text === "") return;

    createTaskCard(text, priority, due, false);
    saveTasks();
    taskInput.value = "";
    dueDate.value = "";
  });

  // Create task card
  function createTaskCard(text, priority, due, completed) {
    const card = document.createElement("div");
    card.className = `task-card ${priority}`;
    card.innerHTML = `
      <h3>${text}</h3>
      <p>Due: ${due} • Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
      <button class="complete-btn">✅</button>
      <button class="delete-btn">🗑️</button>
    `;
    if (completed) {
      card.style.opacity = "0.5";
      card.style.textDecoration = "line-through";
    }
    taskGrid.appendChild(card);
  }

  // Handle complete and delete
  taskGrid.addEventListener("click", (e) => {
    const card = e.target.parentElement;
    if (e.target.classList.contains("complete-btn")) {
      card.style.opacity = "0.5";
      card.style.textDecoration = "line-through";
    }
    if (e.target.classList.contains("delete-btn")) {
      card.remove();
    }
    saveTasks();
  });

  // Save tasks
  function saveTasks() {
    const cards = document.querySelectorAll(".task-card");
    const tasks = [];
    cards.forEach(card => {
      const text = card.querySelector("h3").textContent;
      const priority = card.classList.contains("high") ? "high" :
                       card.classList.contains("medium") ? "medium" : "low";
      const due = card.querySelector("p").textContent.split("•")[0].replace("Due: ", "").trim();
      const completed = card.style.textDecoration === "line-through";
      tasks.push({ text, priority, due, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Dark mode toggle
  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
</script>