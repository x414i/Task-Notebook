// Initialize tasks array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    title: "إنهاء تقرير المشروع",
    date: "15/10/2023",
    isDone: true,
  },
  {
    title: "اجتماع مع فريق العمل",
    date: "18/10/2023",
    isDone: false,
  },
  {
    title: "مراجعة التصميمات الجديدة",
    date: "20/10/2023",
    isDone: false,
  },
  {
    title: "تحديث قاعدة البيانات",
    date: "12/10/2023",
    isDone: true,
  },
  {
    title: "كتابة خطة التسويق",
    date: "22/10/2023",
    isDone: false,
  },
];

// DOM elements
const tasksContainer = document.getElementById("tasks");
const pendingTasksList = document.getElementById("pending-tasks-list");
const completedTasksList = document.getElementById("completed-tasks-list");
const addButton = document.getElementById("btn-add");
const filterButtons = document.querySelectorAll(".filter-btn");
const pendingSection = document.getElementById("pending-section");
const completedSection = document.getElementById("completed-section");

// Current filter state
let currentFilter = "all";

// Set up event listeners
function setupEventListeners() {
  addButton.addEventListener("click", addNewTask);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      // Update filter
      currentFilter = button.getAttribute("data-filter");
      // Apply filter
      applyFilter();
    });
  });
}

// Render tasks
function renderTasks() {
  // Clear existing tasks
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  // Counters for statistics
  let total = tasks.length;
  let completed = 0;
  let pending = 0;

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed") return task.isDone;
    if (currentFilter === "pending") return !task.isDone;
    return true; // 'all' filter
  });

  // Group tasks by status
  tasks.forEach((task, index) => {
    if (task.isDone) {
      completed++;
    } else {
      pending++;
    }

    if (
      (currentFilter === "all" || currentFilter === "pending") &&
      !task.isDone
    ) {
      renderTask(task, index, pendingTasksList);
    }

    if (
      (currentFilter === "all" || currentFilter === "completed") &&
      task.isDone
    ) {
      renderTask(task, index, completedTasksList);
    }
  });

  // Update statistics
  document.getElementById("total-tasks").textContent = total;
  document.getElementById("completed-tasks").textContent = completed;
  document.getElementById("pending-tasks").textContent = pending;

  // Update section counters
  document.getElementById("pending-count").textContent = pending;
  document.getElementById("completed-count").textContent = completed;

  // Show/hide sections based on filter
  applyFilter();

  // Show empty state if needed
  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
                    <span class="material-symbols-outlined">assignment</span>
                    <h3>لا توجد مهام</h3>
                    <p>انقر على زر الإضافة لإنشاء مهمة جديدة</p>
                `;
    tasksContainer.appendChild(emptyState);
  }
}

// Render a single task
function renderTask(task, index, container) {
  const taskElement = document.createElement("div");
  taskElement.className = `task ${task.isDone ? "done" : ""}`;
  taskElement.innerHTML = `
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-date">
                        <span class="material-symbols-outlined">calendar_month</span>
                        <span>${task.date}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-btn delete-btn" onclick="deleteTask(${index})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                    <button class="action-btn check-btn" onclick="toggleTaskStatus(${index})">
                        <span class="material-symbols-outlined">${
                          task.isDone ? "close" : "check"
                        }</span>
                    </button>
                    <button class="action-btn edit-btn" onclick="editTask(${index})">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                </div>
            `;
  container.appendChild(taskElement);
}

// Apply current filter to sections
function applyFilter() {
  if (currentFilter === "all") {
    pendingSection.style.display = "block";
    completedSection.style.display = "block";
  } else if (currentFilter === "pending") {
    pendingSection.style.display = "block";
    completedSection.style.display = "none";
  } else if (currentFilter === "completed") {
    pendingSection.style.display = "none";
    completedSection.style.display = "block";
  }
}

// Add new task
function addNewTask() {
  const taskTitle = prompt("أدخل عنوان المهمة الجديدة:");
  if (taskTitle) {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    tasks.push({
      title: taskTitle,
      date: date,
      isDone: false,
    });

    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  if (confirm(`هل تريد حذف المهمة "${tasks[index].title}"؟`)) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Toggle task status
function toggleTaskStatus(index) {
  tasks[index].isDone = !tasks[index].isDone;
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newTitle = prompt("عدل عنوان المهمة:", tasks[index].title);
  if (newTitle) {
    tasks[index].title = newTitle;
    saveTasks();
    renderTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderTasks();
});
