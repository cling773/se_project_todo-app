import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const parseLocalDate = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const createTodoElement = (todoData) => {
  const todo = new Todo(todoData, "#todo-template");
  return todo.getView();
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = createTodoElement(item);
    todoSection.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
todoSection.renderItems();

const todosListElement = todoSection.getContainer();

// Checkbox toggles completed count
todosListElement.addEventListener("change", (event) => {
  const todoCheckbox = event.target.closest(".todo__completed");
  if (!todoCheckbox) return;
  todoCounter.updateCompleted(todoCheckbox.checked);
});

todosListElement.addEventListener("todo:delete", (event) => {
  const todoItem = event.detail.element || event.target.closest(".todo");
  if (!todoItem) return;

  const wasCompleted = !!todoItem.querySelector(".todo__completed")?.checked;

  todoCounter.updateTotal(false);
  if (wasCompleted) todoCounter.updateCompleted(false);

  if (todoItem.isConnected) todoItem.remove();
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (formValues) => {
  const newTodo = {
    id: uuidv4(),
    name: (formValues.name || "").trim(),
    date: formValues.date ? parseLocalDate(formValues.date) : null,
    completed: false,
  };

  const newTodoElement = createTodoElement(newTodo);
  todoSection.addItem(newTodoElement, { toStart: true });

  todoCounter.updateTotal(true);

  formValidator.resetValidation();
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  formValidator.resetValidation();
  addTodoPopup.open();
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
