import Bubble from './Bubble.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Класс "Чайник"
 * Содержит массив пузырьков.
 * Сортирует массив пузырьков с задержками, необходимыми для анимации.
 */
export default class SortingKettle extends HTMLElement {
  #size;

  #min;

  #max;

  #delay;

  constructor({ size = 10, min = 0, max = 100, delay = 250 } = {}) {
    if (typeof size !== 'number' || !Number.isInteger(size)) {
      throw new TypeError('"size" must be an integer number');
    }
    if (typeof min !== 'number' || !Number.isFinite(min)) {
      throw new TypeError('"min" must be a real number');
    }
    if (typeof max !== 'number' || !Number.isFinite(max)) {
      throw new TypeError('"max" must be a real number');
    }
    if (max < min) {
      throw new Error('"max" must be greater than "min" or equal to it');
    }
    if (typeof delay !== 'number' || !Number.isFinite(delay) || delay < 0) {
      throw new TypeError('"delay" must be a real positive number');
    }

    super();
    this.#size = size;
    this.#min = min;
    this.#max = max;
    this.#delay = delay;
    this.reset();
  }

  reset() {
    this.innerHTML = '';
    for (let i = 0; i < this.#size; i += 1) {
      const value = Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
      this.appendChild(new Bubble(value));
    }
  }

  /**
   * "Кипячение", оно же - сортировка.
   * @return {Promise}
   */
  async boil() {
    /* eslint-disable no-await-in-loop */
    for (let sorted = this.children.length - 1; sorted > 0; sorted -= 1) {
      for (let i = 0; i < sorted; i += 1) {
        const A = this.children[i];
        const B = this.children[i + 1];

        // Включаем подсветку двух сравниваемых пузырьков.
        A.active = true;
        B.active = true;
        await wait(this.#delay);

        if (A.value > B.value) {
          // Перемещаем пузырьки визуально.
          await Promise.all([
            A.down(this.#delay * 2),
            B.up(this.#delay * 2),
          ]);
          // Фиксируем перемещение в DOM-дереве.
          A.parentNode.insertBefore(A, B);
        }

        // Выключаем подсветку пузырьков.
        A.active = false;
        B.active = false;
        await wait(this.#delay);
      }
      this.children[sorted].sorted = true;
      await wait(this.#delay);
    }
    this.firstElementChild.sorted = true;
    await wait(this.#delay);
    /* eslint-enable no-await-in-loop */
    return true;
  }
}

customElements.define('sorting-kettle', SortingKettle);
