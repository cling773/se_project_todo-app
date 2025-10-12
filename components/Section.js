export class Section {
  constructor({ items = [], renderer, containerSelector }) {
    this._items = Array.isArray(items) ? items : [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    if (!this._container) {
      throw new Error(`Section: container not found: ${containerSelector}`);
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(domElement, { toStart = false } = {}) {
    if (!(domElement instanceof Element)) return;
    toStart
      ? this._container.prepend(domElement)
      : this._container.append(domElement);
  }

  getContainer() {
    return this._container;
  }
}
