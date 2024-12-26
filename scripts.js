import { getSuggestions } from './utils/api.js';
import { getFromLocalStorage, saveOnLocalStorage, removeFromLocalStorage } from './utils/localStorage.js';

const taskInput = document.getElementById('task-text');
const taskList = document.getElementById('task-list');
const createNewTask = document.getElementById('create-task');
const deleteAllButton = document.getElementById('delete-all');
const suggestionButton = document.getElementById('suggest-task');

function addNewTask() {
  const newTask = document.createElement('li');
  newTask.classList.add('task-item');
  taskList.appendChild(newTask);
  newTask.innerText = taskInput.value;
  taskInput.value = '';
  saveOnLocalStorage(taskList);
}

function selectTask(event) {
  event.target.classList.toggle('selected');
  saveOnLocalStorage(taskList);
}

function removeTask(event) {
  const taskToRemove = event.target.closest('.task-item');
  taskList.removeChild(taskToRemove);
  saveOnLocalStorage(taskList);
}

function removeAllTasks() {
  taskList.innerHTML = '';
  removeFromLocalStorage();
}

async function suggestTask() {
  const suggestions = await getSuggestions();
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  const newTask = document.createElement('li');
  newTask.classList.add('task-item');
  taskList.appendChild(newTask);
  newTask.innerText = randomSuggestion.title;
  saveOnLocalStorage(taskList);
}

function populateOnLoad() {
  const savedTasks = getFromLocalStorage();
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
}


createNewTask.addEventListener('click', addNewTask);
taskList.addEventListener('click', selectTask);
taskList.addEventListener('dblclick', removeTask);
deleteAllButton.addEventListener('click', removeAllTasks);
suggestionButton.addEventListener('click', suggestTask);

window.onload = populateOnLoad
