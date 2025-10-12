export default class TodoCounter {
  constructor(todos = [], selector = ".counter__text") {
    this._element = document.querySelector(selector);
    if (!this._element) {
      throw new Error(`TodoCounter: element not found: ${selector}`);
    }
    this._completed = Array.isArray(todos)
      ? todos.filter((t) => t.completed).length
      : 0;
    this._total = Array.isArray(todos) ? todos.length : 0;
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    if (this._completed < 0) this._completed = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    if (this._total < 0) this._total = 0;
    if (!increment && this._completed > this._total) {
      this._completed = this._total;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
