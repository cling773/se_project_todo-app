export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;

    this._inputs = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputEl, message) {
    const errorEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorEl.textContent = message;
    errorEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._settings.errorClass);
  }

  _checkValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButton() {
    const hasInvalid = this._inputs.some((i) => !i.validity.valid);
    if (hasInvalid) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButton();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValidity(input);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", () => {
      this._toggleButton();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._form.reset();
    this._inputs.forEach((input) => this._hideInputError(input));
    this._toggleButton();
  }
}
