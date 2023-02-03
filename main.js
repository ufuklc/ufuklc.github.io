const addTaskButton = document.querySelector(".addTask");
const clearButton = document.querySelector(".clear");
const todoInput = document.querySelector(".todoInput");
const todoContainer = document.querySelector('.todos');
const inputContents = document.querySelector(".inputContents");


class Task {
    constructor(id, content, date, completionDate = null, isCompleted = false) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.isCompleted = isCompleted;
        this.completionDate = completionDate;

    }


}


const clearTasks = () => {
    if (todoContainer.childNodes.length >= 1) {
        while (todoContainer.childNodes.length > 0) {
            todoContainer.firstChild.remove();
            localStorage.clear();
        }
    } else {
        alert("Silinecek task yok");

    }

}


const toggleComplete = (event) => {
    const element = event.target.parentElement;
    const task = JSON.parse(localStorage.getItem(element.id));
    console.log(task)
    if (task.isCompleted === false) {
        element.classList.add("completed")
        event.target.nextSibling.nextSibling.classList.add("unvisible");
        let completionDate = new Date().toLocaleString("tr-TR");
        task.completionDate = completionDate
        task.isCompleted = true;
        localStorage.setItem(element.id, JSON.stringify(task))
        event.target.innerText = "Uncomplete";
        event.target.previousSibling.innerText = `Başlangıç Tarihi : ${task.date}
        Bitiş Tarihi : ${task.completionDate}`;



    } else {
        element.classList.remove("completed")
        event.target.innerText = "Complete"
        event.target.nextSibling.nextSibling.classList.remove("unvisible");
        task.isCompleted = false;
        event.target.previousSibling.innerText = `Oluşturulma Tarihi : ${task.date}`
        localStorage.setItem(element.id, JSON.stringify(task))
    }
}

const deleteTask = (del) => {
    del.target.parentElement.remove();
    localStorage.removeItem(del.target.parentElement.id)

}




const renderTodoItem = (todoText) => {

    const todoItemElement = document.createElement('li');
    todoItemElement.classList.add("todoItem");
    todoContainer.appendChild(todoItemElement);

    const textElement = document.createElement('p')
    const date = document.createElement('p');
    const space = document.createElement('br');
    date.classList.add("date")
    let createDate = new Date().toLocaleString("tr-TR");

    const newTask = new Task(todoContainer.childNodes.length - 1, capitalizeFirstLetter(todoText), createDate)
    textElement.innerText = newTask.content;
    todoItemElement.id = newTask.id;
    textElement.classList.add("todoText");
    date.innerText = `Oluşturulma Tarihi : ${newTask.date}`;
    todoItemElement.appendChild(textElement);
    todoItemElement.appendChild(space);
    todoItemElement.appendChild(date);

    localStorage.setItem(newTask.id, JSON.stringify(newTask))


    const completeButton = document.createElement("button");
    completeButton.classList.add("completeButton")
    completeButton.classList.add("completed")
    completeButton.innerText = "Complete";
    todoItemElement.appendChild(completeButton)
    completeButton.addEventListener('click', toggleComplete);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton")
    deleteButton.innerText = "Delete";
    todoItemElement.appendChild(deleteButton)
    deleteButton.addEventListener("click", deleteTask)

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerText = "Edit";
    todoItemElement.appendChild(editButton);
    editButton.addEventListener("click", editTask);




    todoContainer.appendChild(todoItemElement);
    todoInput.value = '';
    todoInput.focus();
}





const addTask = () => {
    if (todoInput.value === "") {
        alert("Bu alan boş olamaz.")
    } else {
        renderTodoItem(todoInput.value);
    }
}

const editTask = (edit) => {
    let p = edit.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    let date = edit.target.previousSibling.previousSibling.previousSibling;

    const editInput = document.createElement('input');
    editInput.classList.add("editInput");
    editInput.value = p.innerHTML

    p.replaceWith(p, editInput);
    p.remove()



    editInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            let newTask = editInput.value;
            if (newTask != "") {
                let newP = document.createElement('p');
                let dateP = document.createElement('p');
                let currentDate = new Date().toLocaleString("tr-TR");
                let editDate = `Düzenlenme Tarihi : ${currentDate}`
                dateP.classList.add("date");
                dateP.innerText = editDate;
                newP.innerText = capitalizeFirstLetter(newTask);
                newP.classList.add("todoText");
                date.replaceWith(dateP, date);
                date.remove();
                editInput.replaceWith(newP, editInput);
                editInput.remove();
                const task = new Task(edit.target.parentElement.id, newTask, currentDate);
                localStorage.setItem(task.id, JSON.stringify(task));


            } else {
                alert("Boş olamaz")
            }
        }
    })

};

const loadTasks = (taskId) => {
    let task = JSON.parse(localStorage.getItem(taskId));

    const todoItemElement = document.createElement('li');
    todoItemElement.id = taskId
    todoItemElement.classList.add("todoItem");
    todoContainer.appendChild(todoItemElement);

    const textElement = document.createElement('p')
    const date = document.createElement('p');
    const space = document.createElement('br');
    date.classList.add("date")
    let createDate = task.date;

    textElement.innerText = task.content;
    textElement.classList.add("todoText");
    date.innerText = `Oluşturulma Tarihi : ${createDate}`;
    textElement.classList.add("todoText");

    todoItemElement.appendChild(textElement);
    todoItemElement.appendChild(space);
    todoItemElement.appendChild(date);
    const completeButton = document.createElement("button");
    completeButton.classList.add("completeButton")
    completeButton.classList.add("completed")
    completeButton.innerText = "Complete";
    todoItemElement.appendChild(completeButton)
    completeButton.addEventListener('click', toggleComplete);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton")
    deleteButton.innerText = "Delete";
    todoItemElement.appendChild(deleteButton)
    deleteButton.addEventListener("click", deleteTask)

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerText = "Edit";
    todoItemElement.appendChild(editButton);
    editButton.addEventListener("click", editTask);

    if (task.isCompleted === true) {
        todoItemElement.classList.add("completed")
        editButton.classList.add("unvisible");
        completeButton.innerText = "Uncomplete";
        date.innerText = `Başlangıç Tarihi : ${task.date}
        Bitiş Tarihi : ${task.completionDate}`;
    };




    todoContainer.appendChild(todoItemElement);
    todoInput.value = '';
    todoInput.focus();

}

const sortedId = [];
for (var id of Object.keys(localStorage)) {
    sortedId.push(parseInt(id));
}

sortedId.sort((a, b) => a - b)

for (var id of sortedId) loadTasks(id);





addTaskButton.addEventListener('click', addTask);
clearButton.addEventListener('click', clearTasks);


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


