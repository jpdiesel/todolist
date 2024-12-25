const taskInput = document.getElementById('task-text');
const taskList = document.getElementById('task-list');
const createNewTask = document.getElementById('create-task');

function addNewTask() {
  const newTask = document.createElement('li');
  newTask.classList.add('task-item');
  taskList.appendChild(newTask);
  newTask.innerText = taskInput.value;
  taskInput.value = '';
}

function selectTask(event) {
  event.target.classList.toggle('selected');
}

function removeTask(event) {
  const taskToRemove = event.target.closest('.task-item');
  taskList.removeChild(taskToRemove);
}


createNewTask.addEventListener('click', addNewTask);
taskList.addEventListener('click', selectTask);
taskList.addEventListener('dblclick', removeTask);
