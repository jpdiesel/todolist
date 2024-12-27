import { populateOnLoad } from "../scripts.js";

describe("1 - Adicionar Tarefa e Salvar no localStorage", () => {
  // Referências globais
  let taskInput, createNewTask, taskList;

  beforeEach(() => {
    // Configurar o DOM simulado
    document.body.innerHTML = `
    <input id="task-text" type="text">
    <button id="create-task">Adicionar</button>
    <button id="delete-all">Deletar Tudo</button>
    <button id="suggest-task">Sugerir Tarefa</button>
    <ol id="task-list"></ol>
  `;

    // Redefinir referências globais
    taskInput = document.getElementById("task-text");
    createNewTask = document.getElementById("create-task");
    taskList = document.getElementById("task-list");

    document.dispatchEvent(new Event("DOMContentLoaded"));

    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
  });

  it("1.1 - Deve adicionar uma tarefa", () => {
    // Simular a entrada de texto no input
    taskInput.value = "Nova tarefa";
  
    // Simular o clique no botão de adicionar tarefa
    createNewTask.click();
   
    // Verificar se a tarefa foi adicionada ao DOM
    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].innerText).toBe("Nova tarefa");
  });

  it("1.2 - Local storage é atualizado", () => {
    // Mockar o conteúdo salvo no localStorage
    taskInput.value = "Tarefa a salvar";

    // Simular o clique no botão de adicionar tarefa
    createNewTask.click();

    // Verificar se o localStorage foi chamado
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', taskList.innerHTML);

    populateOnLoad();

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
