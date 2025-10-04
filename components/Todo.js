export class Todo {
  constructor(data, templateSelector) {
    this._data = { completed: false, date: null, ...data };
    this._templateSelector = templateSelector;

    this._element = null;
    this._checkbox = null;
    this._nameEl = null;
    this._dateEl = null;
    this._deleteBtn = null;
    this._label = null;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    if (!template)
      throw new Error(`Template not found: ${this._templateSelector}`);
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _formatDateForDisplay(dateValue) {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return "";
    return `Due: ${d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  _applyData() {
    this._nameEl.textContent = this._data.name;
    this._checkbox.checked = Boolean(this._data.completed);

    const checkboxId = `todo-${this._data.id}`;
    this._checkbox.id = checkboxId;
    this._label.setAttribute("for", checkboxId);

    this._dateEl.textContent = this._formatDateForDisplay(this._data.date);

    if (this._checkbox.checked) {
      this._element.classList.add("todo_done");
    }
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._element.classList.toggle("todo_done", this._checkbox.checked);
      this._data.completed = this._checkbox.checked;
    });

    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._checkbox = this._element.querySelector(".todo__completed");
    this._nameEl = this._element.querySelector(".todo__name");
    this._dateEl = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");
    this._label = this._element.querySelector(".todo__label");

    this._applyData();
    this._setEventListeners();
    return this._element;
  }
}
