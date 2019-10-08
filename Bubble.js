const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Класс "Пузырек"
 * Содержит некое целое число.
 * Отвечает за свою анимацию перемещения вверх/вниз.
 */
export default class Bubble extends HTMLElement {
  #value;

  #active = false;

  #sorted = false;

  constructor(value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError('"value" must be a real number');
    }

    super();
    this.#value = value;
    this.textContent = this.#value;
    this.#move = this.#move.bind(this);
  }

  get value() {
    return this.#value;
  }

  get active() {
    return this.#active;
  }

  set active(value) {
    if (typeof value !== 'boolean') {
      throw new TypeError('"active" must be a boolean');
    }
    this.#active = value;
    this.toggleAttribute('active', this.#active);
  }

  get sorted() {
    return this.#sorted;
  }

  set sorted(value) {
    if (typeof value !== 'boolean') {
      throw new TypeError('"sorted" must be a boolean');
    }
    this.#sorted = value;
    this.toggleAttribute('sorted', this.#sorted);
  }

  // Всплытие
  up(ms) {
    return this.#move(1, ms);
  }

  // Погружение
  down(ms) {
    return this.#move(-1, ms);
  }

  /**
   * @param {number} direction Направление движения. 1 - наверх, -1 - вниз.
   * @param {number=} [ms=500] Длительность анимации
   * @return {Promise}
   */
  #move = async function move(direction, ms = 500) {
    this.style.transformOrigin = direction > 0 ? 'top' : 'bottom';
    this.style.transition = `transform ${ms}ms linear`;
    this.style.transform = 'rotate(180deg)';
    await wait(ms);
    this.style.transform = '';
    this.style.transformOrigin = '';
    this.style.transition = '';
  }
}

customElements.define('sorting-bubble', Bubble);
