export function saveOnLocalStorage(tasks) {
  const tasksToSave = tasks.innerHTML
  localStorage.setItem('tasks', tasksToSave);
}

export function getFromLocalStorage() {
  const tasksFromStorage = localStorage.getItem('tasks');
  return tasksFromStorage
}

export function removeFromLocalStorage() {
  localStorage.removeItem('tasks');
}