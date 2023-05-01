import { createElement } from './createElement.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';

const keyboardLayouts = {
  en: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
    'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return',
    'left shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'right shift',
    'fn', 'control', 'option', 'cmd', 'space', 'cmd', 'option', '◄', '▼', '►',
  ],
  ru: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
    'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
    'left shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'right shift',
    'fn', 'control', 'option', 'cmd', 'space', 'cmd', 'option', '◄', '▼', '►',
  ],
};

const shiftValues = {
  en: [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'delete',
    'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
    'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'return',
    'left shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'right shift',
    'fn', 'control', 'option', 'cmd', 'space', 'cmd', 'option', '◄', '▼', '►',
  ],
  ru: [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'delete',
    'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
    'caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'return',
    'left shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'right shift',
    'fn', 'control', 'option', 'cmd', 'space', 'cmd', 'option', '◄', '▼', '►',
  ],
};

const KEYS = {
  TAB: 'tab',
  CAPS_LOCK: 'caps lock',
  LEFT_SHIFT: 'left shift',
  RIGHT_SHIFT: 'right shift',
  COMMAND: 'cmd',
  CONTROL: 'control',
  OPTION: 'option',
  SPACE: 'space',
  RETURN: 'return',
  DELETE: 'delete',
  ARROW_LEFT: '◄',
  ARROW_UP: '▲',
  ARROW_DOWN: '▼',
  ARROW_RIGHT: '►',
  FN: 'fn',
};

class Keyboard {
  constructor() {
    this.language = getLocalStorage();
    this.keyboard = null;
    this.textarea = null;
    this.keysContainer = null;
    this.capslock = false;
    this.shift = false;
    this.toggleCapsLock = this.toggleCapsLock.bind(this);
    this.toggleShift = this.toggleShift.bind(this);
    this.toggleFn = this.toggleFn.bind(this);
  }

  createKeyboard() {
    this.keyboard = createElement('div', 'keyboard');
    this.textarea = createElement('textarea', 'textarea');
    this.textarea.focus();
    this.keysContainer = createElement('div', 'keys__container');
    this.keyboard.prepend(this.textarea);
    this.keyboard.append(this.createKeys());
  }

  createKeys() {
    const layout = keyboardLayouts[this.language];
    const fragment = document.createDocumentFragment();
    const breakpoints = [layout.indexOf(KEYS.DELETE), layout.indexOf('\\'), layout.indexOf(KEYS.RETURN), layout.indexOf(KEYS.RIGHT_SHIFT)];

    layout.forEach((layoutKey) => {
      const key = createElement('button', 'key');
      key.setAttribute('type', 'button');

      switch (layoutKey) {
        case KEYS.DELETE:
          key.classList.add('delete-btn');
          key.textContent = layoutKey;
          key.addEventListener('click', () => {
            this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1);
          });
          break;

        case KEYS.TAB:
          key.classList.add('tab-btn');
          key.textContent = layoutKey;
          key.addEventListener('click', () => { this.textarea.value += '\t'; });
          break;

        case KEYS.CAPS_LOCK:
          key.classList.add('caps-lock-btn');
          key.textContent = layoutKey;
          key.addEventListener('click', this.toggleCapsLock);
          break;

        case KEYS.RETURN:
          key.classList.add('return-btn');
          key.textContent = layoutKey;
          this.textarea.value += '';
          key.addEventListener('click', () => { this.textarea.value += '\n'; });
          break;

        case KEYS.LEFT_SHIFT:
        case KEYS.RIGHT_SHIFT:
          key.classList.add('shift-btn');
          key.textContent = layoutKey;
          key.addEventListener('click', this.toggleShift);
          break;

        case KEYS.FN:
          key.classList.add('fn-btn');
          key.textContent = layoutKey;
          key.addEventListener('click', this.toggleFn);
          break;

        case KEYS.CONTROL:
          key.classList.add('.ctrl-btn');
          key.textContent = layoutKey;

          break;

        case KEYS.OPTION:
          key.classList.add('option-btn');
          key.textContent = layoutKey;

          break;

        case KEYS.COMMAND:
          key.classList.add('cmd-btn');
          key.textContent = layoutKey;
          break;

        case KEYS.SPACE:
          key.classList.add('space-btn');
          key.textContent = layoutKey;
          key.addEventListener('click', () => { this.textarea.value += ' '; });
          break;

        default:
          key.textContent = layoutKey;
          key.classList.add('alphanum');
          key.addEventListener('click', () => {
            if (this.capslock || this.shift) {
              this.textarea.value += layoutKey.toUpperCase();
            } else {
              this.textarea.value += layoutKey.toLowerCase();
            }
          });
      }
      fragment.append(key);

      if (breakpoints.includes(layout.indexOf(layoutKey))) {
        fragment.append(createElement('br', 'linebreak'));
      }
    });
    return fragment;
  }

  toggleCapsLock() {
    this.capslock = !this.capslock;
    const alphanumKeys = document.querySelectorAll('.alphanum');
    alphanumKeys.forEach((element) => {
      const key = element;
      if (this.capslock) {
        key.textContent = key.textContent.toUpperCase();
      } else {
        key.textContent = key.textContent.toLowerCase();
      }
    });
    return this.capslock;
  }

  toggleShift() {
    this.shift = !this.shift;
    const keys = document.querySelectorAll('.key');
    keys.forEach((element, index) => {
      const key = element;
      const keyTextContent = this.shift ? shiftValues[this.language][index]
        : keyboardLayouts[this.language][index];
      key.textContent = keyTextContent;
    });
  }

  toggleFn() {
    const keys = document.querySelectorAll('.key');

    if (this.language === 'en') {
      this.language = 'ru';
    } else {
      this.language = 'en';
    }
    setLocalStorage(this.language);

    keys.forEach((element, index) => {
      const key = element;
      const keyTextContent = keyboardLayouts[this.language][index];
      key.textContent = keyTextContent;
    });
  }
}

export { Keyboard };
