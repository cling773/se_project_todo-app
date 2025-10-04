import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (m) => m.classList.add("popup_visible");
const closeModal = (m) => m.classList.remove("popup_visible");

const parseLocalDate = (yyyyMmDd) => {
  if (!yyyyMmDd) return null;
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const renderTodo = (data, { prepend = false } = {}) => {
  const todo = new Todo(data, "#todo-template");
  const el = todo.getView();
  prepend ? todosList.prepend(el) : todosList.append(el);
};

initialTodos.forEach((item) => renderTodo(item));

addTodoButton.addEventListener("click", () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

const validator = new FormValidator(validationConfig, addTodoForm);
validator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value.trim();
  const date = parseLocalDate(evt.target.date.value);

  const newTodo = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };

  renderTodo(newTodo, { prepend: true });

  validator.resetValidation();
  closeModal(addTodoPopup);
});
