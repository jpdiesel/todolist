import { addNewTask } from "../scripts.js";
import {
  saveOnLocalStorage,
} from "../utils/localStorage.js";

jest.mock("../utils/localStorage.js", () => ({
  saveOnLocalStorage: jest.fn(),
  getFromLocalStorage: jest.fn(),
  removeFromLocalStorage: jest.fn(),
}));

describe("1 - Adicionar Tarefa e Salvar no localStorage", () => {

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
    // createNewTask = document.getElementById("create-task");

    // Inicializar a lista de tarefas
    // createNewTask.addEventListener("click", addNewTask);

    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  it("1.1 - Deve adicionar uma tarefa", () => {
    const taskInput = document.getElementById("task-text");
    const createNewTask = document.getElementById("create-task");
    const taskList = document.getElementById("task-list");

    // Simular a entrada de texto no input
    taskInput.value = "Nova tarefa";
    console.log('teste input',taskInput.value);
    // Simular o clique no botão de adicionar tarefa
    createNewTask.click();
   
    // Verificar se a tarefa foi adicionada ao DOM
    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].innerText).toBe("Nova tarefa");
  });

  it("1.2 - Local storage é atualizado", () => {
    // Mockar o conteúdo salvo no localStorage
    const taskInput = document.getElementById("task-text");
    const taskList = document.getElementById("task-list");
    taskInput.value = "Tarefa a salvar";

    addNewTask();

    expect(saveOnLocalStorage).toHaveBeenCalledWith(taskList);
  });
});
