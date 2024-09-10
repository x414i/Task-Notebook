
    // Initialize tasks array from localStorage or default to an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        {
            "title": "قراءة كتاب",
            "date": "00/00/0000",
            "isDone": false
        },
        {
            "title": "قراءة كتاب",
            "date": "00/00/0000",
            "isDone": true
        },
        {
            "title": "قراءة كتاب",
            "date": "00/00/0000",
            "isDone": true
        },
        {
            "title": "قراءة كتاب",
            "date": "00/00/0000",
            "isDone": false
        }
    ];

    function insertTsak() {
        document.getElementById('tasks').innerHTML = '';
        let index = 0;
        for (task of tasks) {
            let content = `<div class="task ${tasks[index].isDone ? 'done' : ''}">
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
                                <div style="display: flex;justify-content: space-between;align-items: center;width: 20%;">
                                    <button onclick="deleteTask(${index})" class="circler" style="background-color:rgb(114, 0, 0);color:white">
                                        <span class="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
                                    ${task.isDone ?
                                        `<button onclick="checkTask(${index})" class="circler" style="background-color:rgb(0, 150, 30);color:white">
                                            <span class="material-symbols-outlined">
                                                close
                                            </span>
                                        </button>`
                                        :
                                        `<button onclick="checkTask(${index})" class="circler" style="background-color:rgb(0, 150, 30);color:white">
                                            <span class="material-symbols-outlined">
                                                check
                                            </span>
                                        </button>`
                                    }
                                    <button onclick="editTask(${index})" class="circler" style="background-color:rgba(8, 16, 197,0.692);color:white">
                                        <span class="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                </div>
                                <!-- End Task Action -->
                            </div>`;
            index++;
            document.getElementById('tasks').innerHTML += content;
        }
    }
    insertTsak();

    document.getElementById("btn-add").addEventListener("click", () => {
        let taskName = prompt("اسم المهمة الجديدة");
        let now = new Date();
        let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
        let obj = {
            "title": taskName,
            "date": date,
            "isDone": false
        };
        tasks.push(obj);
        storeTask();
        insertTsak();
    });

    let deleteTask = (index) => {
        let x = confirm(`هل انت متاكد من حذف المهمه ؟! *${tasks[index].title}*`);
        if (x == true) {
            tasks.splice(index, 1);
            storeTask();
            insertTsak();
        }
    };

    let editTask = (index) => {
        let newTaskName = prompt(`اكتب الاسم الجديد`, tasks[index].title);
        tasks[index].title = newTaskName;
        storeTask();
        insertTsak();
    };

    let checkTask = (index) => {
        tasks[index].isDone = !tasks[index].isDone;
        storeTask();
        insertTsak();
    };

    //====================> STORE FUNCTION <==================
    
    let storeTask = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
