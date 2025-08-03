// Initialize tasks array from localStorage or default to an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    title: "قراءة كتاب",
    date: "00/00/0000",
    isDone: false,
  },
  {
    title: "قراءة كتاب",
    date: "00/00/0000",
    isDone: true,
  },
];

function insertTask() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `<div class="task ${tasks[index].isDone ? "done" : ""}">
                            <!-- Task info -->
                            <div style="width: 70%;">
                                <h2 style="color: black;"> ${task.title}</h2>
                                <!-- Date -->
                                <div style="color: black;">
                                    <span class="material-symbols-outlined">
                                        calendar_month
                                    </span>
                                    <span>${task.date}</span>
                                </div>
                            </div>
                            <!--End Task info -->
                            <!-- Task Action --> 
                            <div class="task-action">
                                <button onclick="deleteTask(${index})" class="circler" style="background-color:#d9534f;color:white">
                                    <span class="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                                ${
                                  task.isDone
                                    ? `<button onclick="checkTask(${index})" class="circler" style="background-color:#5cb85c;color:white">
                                        <span class="material-symbols-outlined">
                                            close
                                        </span>
                                    </button>`
                                    : `<button onclick="checkTask(${index})" class="circler" style="background-color:#5cb85c;color:white">
                                        <span class="material-symbols-outlined">
                                            check
                                        </span>
                                    </button>`
                                }
                                <button onclick="editTask(${index})" class="circler" style="background-color:#428bca;color:white">
                                    <span class="material-symbols-outlined">
                                        edit
                                    </span>
                                </button>
                            </div>
                            <!-- End Task Action -->
                        </div>`;
    index++;
    document.getElementById("tasks").innerHTML += content;
  }
}
insertTask();

// Modal elements
const addModal = document.getElementById("add-modal");
const confirmModal = document.getElementById("confirm-modal");
const closeModalBtns = document.querySelectorAll(".close-btn");
const modalConfirmBtn = document.getElementById("modal-confirm-btn");
const taskInput = document.getElementById("task-input");
const modalTitle = document.getElementById("modal-title");
const confirmMsg = document.getElementById("confirm-msg");
const confirmYesBtn = document.getElementById("confirm-yes-btn");
const confirmNoBtn = document.getElementById("confirm-no-btn");

let currentEditIndex = null;
let currentDeleteIndex = null;

// Open add modal
document.getElementById("btn-add").addEventListener("click", () => {
  currentEditIndex = null;
  modalTitle.innerText = "إضافة مهمة جديدة";
  taskInput.value = "";
  addModal.style.display = "block";
});

// Close modals
closeModalBtns.forEach((btn) => {
  btn.onclick = () => {
    addModal.style.display = "none";
    confirmModal.style.display = "none";
  };
});

window.onclick = (event) => {
  if (event.target == addModal || event.target == confirmModal) {
    addModal.style.display = "none";
    confirmModal.style.display = "none";
  }
};

// Add or Edit task
modalConfirmBtn.onclick = () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    if (currentEditIndex !== null) {
      // Edit task
      tasks[currentEditIndex].title = taskName;
    } else {
      // Add new task
      let now = new Date();
      let date =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let obj = {
        title: taskName,
        date: date,
        isDone: false,
      };
      tasks.push(obj);
    }
    storeTask();
    insertTask();
    addModal.style.display = "none";
  }
};

// Delete task
function deleteTask(index) {
  currentDeleteIndex = index;
  confirmMsg.innerText = `هل انت متاكد من حذف المهمه ؟! *${tasks[index].title}*`;
  confirmModal.style.display = "block";
}

confirmYesBtn.onclick = () => {
  if (currentDeleteIndex !== null) {
    tasks.splice(currentDeleteIndex, 1);
    storeTask();
    insertTask();
    confirmModal.style.display = "none";
    currentDeleteIndex = null;
  }
};

confirmNoBtn.onclick = () => {
  confirmModal.style.display = "none";
  currentDeleteIndex = null;
};

// Edit task
function editTask(index) {
  currentEditIndex = index;
  modalTitle.innerText = "تعديل المهمة";
  taskInput.value = tasks[index].title;
  addModal.style.display = "block";
}

// Check task
function checkTask(index) {
  tasks[index].isDone = !tasks[-index].isDone;
  storeTask();
  insertTask();
}

//====================> STORE FUNCTION <==================

let storeTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
