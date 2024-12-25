const newTask = document.getElementById('task-text');
const taskList = document.getElementById('task-list');
const createNewTask = document.getElementById('create-task');

function addNewTask() {
  const taskListItem = document.createElement('li');
  taskList.appendChild(taskListItem);
  taskListItem.innerText = newTask.value;
  newTask.value = '';
}

createNewTask.addEventListener('click', addNewTask);