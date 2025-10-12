import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const parseLocalDate = (yyyyMmDd) => {
  if (!yyyyMmDd) return null;
  const [year, month, day] = yyyyMmDd.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const createTodoElement = (todoData) => {
  const todo = new Todo(todoData, "#todo-template");
  return todo.getView();
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const node = createTodoElement(item);
    todoSection.addItem(node);
  },
  containerSelector: ".todos__list",
});
todoSection.renderItems();

const listEl = todoSection.getContainer();

listEl.addEventListener("change", (e) => {
  const cb = e.target.closest(".todo__completed");
  if (!cb) return;
  todoCounter.updateCompleted(cb.checked);
});

listEl.addEventListener("click", (e) => {
  const del = e.target.closest(".todo__delete-btn");
  if (!del) return;

  const item = del.closest(".todo");
  const wasCompleted = !!item?.querySelector(".todo__completed")?.checked;

  todoCounter.updateTotal(false);
  if (wasCompleted) todoCounter.updateCompleted(false);

  item?.remove();
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (values) => {
  const newTodo = {
    id: uuidv4(),
    name: (values.name || "").trim(),
    date: values.date ? parseLocalDate(values.date) : null,
    completed: false,
  };

  const node = createTodoElement(newTodo);
  todoSection.addItem(node, { toStart: true });

  todoCounter.updateTotal(true);

  validator.resetValidation();
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  validator.resetValidation();
  addTodoPopup.open();
});

const addTodoForm = document.querySelector("#add-todo-form");
const validator = new FormValidator(validationConfig, addTodoForm);
validator.enableValidation();
