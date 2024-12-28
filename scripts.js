import { getSuggestions } from './utils/api.js';
import { getFromLocalStorage, saveOnLocalStorage, removeFromLocalStorage } from './utils/localStorage.js';

// Infelizmente tive que declarar os elementos do DOM dentro de cada uma das funções
// pois o jest não estava conseguindo acessar os elementos do DOM
// devido a isso, não consegui fazer os testes, mesmo estando corretos, passarem.
// A aplicação, porém, está funcionando normalmente.


// Inicializar a lista de tarefas
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


// Marca uma tarefa como concluída
export function selectTask(event) {
  const taskList = document.getElementById('task-list');
  event.target.classList.toggle('selected');
  saveOnLocalStorage(taskList);
}

// Remove uma tarefa da lista
export function removeTask(event) {
  const taskToRemove = event.target.closest('.task-item');
  const taskList = document.getElementById('task-list');
  taskList.removeChild(taskToRemove);
  saveOnLocalStorage(taskList);
}


// Remove todas as tarefas da lista
export function removeAllTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  removeFromLocalStorage();
}

// Sugere uma tarefa aleatória
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

// Carrega as tarefas salvas no localStorage na página carregada
export function populateOnLoad() {
  const taskList = document.getElementById('task-list');
  const savedTasks = getFromLocalStorage();
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
}

export function initializeTodoList() {
  const taskList = document.getElementById('task-list');
  const createNewTask = document.getElementById('create-task');
  const deleteAllButton = document.getElementById('delete-all');
  const suggestionButton = document.getElementById('suggest-task');
  const taskInput = document.getElementById('task-text');

  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  })
  createNewTask.addEventListener('click', addNewTask);
  taskList.addEventListener('click', selectTask);
  taskList.addEventListener('dblclick', removeTask);
  deleteAllButton.addEventListener('click', removeAllTasks);
  suggestionButton.addEventListener('click', suggestTask);

  populateOnLoad();
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeTodoList);
}