import { getSuggestions } from './utils/api.js';
import { getFromLocalStorage, saveOnLocalStorage, removeFromLocalStorage } from './utils/localStorage.js';

export function initializeTodoList() {
  const taskList = document.getElementById('task-list');
  const createNewTask = document.getElementById('create-task');
  const deleteAllButton = document.getElementById('delete-all');
  const suggestionButton = document.getElementById('suggest-task');

  createNewTask.addEventListener('click', addNewTask);
  taskList.addEventListener('click', selectTask);
  taskList.addEventListener('dblclick', removeTask);
  deleteAllButton.addEventListener('click', removeAllTasks);
  suggestionButton.addEventListener('click', suggestTask);

  populateOnLoad();
}
export function addNewTask() {
  const taskInput = document.getElementById('task-text');
  const taskList = document.getElementById('task-list');
  const newTask = document.createElement('li');
  newTask.classList.add('task-item');
  taskList.appendChild(newTask);
  newTask.innerText = taskInput.value;
  saveOnLocalStorage(taskList);
  taskInput.value = '';
}

export function selectTask(event) {
  const taskList = document.getElementById('task-list');
  event.target.classList.toggle('selected');
  saveOnLocalStorage(taskList);
}

export function removeTask(event) {
  const taskToRemove = event.target.closest('.task-item');
  const taskList = document.getElementById('task-list');
  taskList.removeChild(taskToRemove);
  saveOnLocalStorage(taskList);
}

export function removeAllTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  removeFromLocalStorage();
}

export async function suggestTask() {
  const taskList = document.getElementById('task-list');
  const suggestions = await getSuggestions();
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  const newTask = document.createElement('li');
  newTask.classList.add('task-item');
  taskList.appendChild(newTask);
  newTask.innerText = randomSuggestion.title;
  saveOnLocalStorage(taskList);
}

export function populateOnLoad() {
  const taskList = document.getElementById('task-list');
  const savedTasks = getFromLocalStorage();
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeTodoList);
}