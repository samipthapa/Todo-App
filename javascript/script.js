document.querySelector('.form').addEventListener('submit', addTask);

document.querySelector('.fa-plus-square').addEventListener('click', addTask);

document.body.addEventListener('click', deleteTask);

document.querySelector('.button').addEventListener('click', clearTasks);


function addTask(e) {
    const task = document.querySelector('.task');

    const div = document.createElement('div');
    div.className = 'liItem';

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task.value));

    const a = document.createElement('a');
    a.className = 'delete-item';
    a.setAttribute('href', '#');

    const i = document.createElement('i');
    i.className = 'fas fa-trash fa-lg';

    a.appendChild(i);
    div.appendChild(li);
    div.appendChild(a);
    document.querySelector('ul.task-list').appendChild(div);

    task.value = '';
    pendingTask();
    e.preventDefault();
}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }
    pendingTask();
}

function clearTasks() {
    const ul = document.querySelector('ul.task-list');
    while (ul.firstChild) {
        ul.lastChild.remove();
    }
    pendingTask();
}

function pendingTask() {
    let heading = document.querySelector('h3');
    const count = document.querySelector('ul.task-list').childElementCount;
    heading.textContent = `You have ${count} pending tasks`;
}

pendingTask();