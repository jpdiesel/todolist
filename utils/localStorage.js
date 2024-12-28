// Função para salvar no localStorage
export function saveOnLocalStorage(tasks) {
  const tasksToSave = tasks.innerHTML
  localStorage.setItem('tasks', tasksToSave);
}

// Função para carregar do localStorage
export function getFromLocalStorage() {
  const tasksFromStorage = localStorage.getItem('tasks');
  return tasksFromStorage
}


// Função para remover do localStorage
export function removeFromLocalStorage() {
  localStorage.removeItem('tasks');
}