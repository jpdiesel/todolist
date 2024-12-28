// Fetch das sugestões de tarefas. 

export async function getSuggestions() {
  const suggestions = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json())
  const uncompletedSuggestions = suggestions.filter((suggestion) => suggestion.completed === false)
  return uncompletedSuggestions;
}