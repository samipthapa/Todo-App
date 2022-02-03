document.querySelector('.form').addEventListener('submit', addTask);

document.querySelector('.fa-plus-square').addEventListener('click', addTask);

document.body.addEventListener('click', deleteTask);

document.querySelector('.button').addEventListener('click', clearTasks);

function appendElement(task) {
    const div = document.createElement('div');
    div.className = 'liItem';

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const a = document.createElement('a');
    a.className = 'delete-item';
    a.setAttribute('href', '#');

    const i = document.createElement('i');
    i.className = 'fas fa-trash fa-lg';

    a.appendChild(i);
    div.appendChild(li);
    div.appendChild(a);
    document.querySelector('ul.task-list').appendChild(div);
}

function addTask(e) {
    const task = document.querySelector('.task');
    appendElement(task.value);
    addToLocalStorage(task.value);
    task.value = '';
    pendingTask();
    e.preventDefault();
}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        removeFromStorage(e.target.parentElement.parentElement.firstChild.textContent);
        e.target.parentElement.parentElement.remove();
    }
    pendingTask();
}

function clearTasks() {
    const ul = document.querySelector('ul.task-list');
    while (ul.firstChild) {
        ul.lastChild.remove();
    }
    localStorage.clear();
    pendingTask();
}

function pendingTask() {
    let heading = document.querySelector('h3');
    const count = document.querySelector('ul.task-list').childElementCount;
    heading.textContent = `You have ${count} pending tasks`;
}

function addToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks) {
        tasks.forEach(function(task) {
            appendElement(task);
        });
    }
    pendingTask();
}

pendingTask();
checkFromStorage();
