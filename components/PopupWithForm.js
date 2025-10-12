import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    if (!this._form) throw new Error("PopupWithForm: .popup__form not found");
    this._inputs = Array.from(
      this._form.querySelectorAll("input, textarea, select")
    );
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => (values[input.name] = input.value));
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._form);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
