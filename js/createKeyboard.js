import { createElement } from './createElement.js';

const keyboardLayouts = {
  en: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
    'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Return',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift',
    'Fn', 'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Up', 'Down', 'Right',
  ],
  ru: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
    'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Return',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift',
    'Fn', 'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Up', 'Down', 'Right',
  ],
};

const shiftValues = {
  en: [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Delete',
    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
    'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Return',
    'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift',
    'Fn', 'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Up', 'Down', 'Right',
  ],
  ru: [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Delete',
    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
    'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Return',
    'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'Shift',
    'Fn', 'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Up', 'Down', 'Right',
  ],
};

const KEYS = {
  TAB: 'Tab',
  CAPS_LOCK: 'CapsLock',
  SHIFT: 'Shift',
  CTRL: 'Control',
  ALT: 'Alt',
  SPACE: ' ',
  RETURN: 'Return',
  DELETE: 'Delete',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  FN: 'Fn',
};

class Keyboard {
  constructor(language = 'eng') {
    this.language = language;
    this.keyboard = null;
    this.textarea = null;
    this.textarea.value = null;
    this.keysContainer = null;
    this.capslock = false;
    this.shift = false;
  }

  createKeyboard() {
    this.keyboard = createElement('div', 'keyboard');
    this.textarea = createElement('textarea', 'textarea');
    this.keysContainer = createElement('div', 'keys__container');
    this.keyboard.append(this.textarea, this.createKeys());
  }

  createKeys() {
    const layout = keyboardLayouts[this.language];

    layout.forEach((layoutKey) => {
      const key = createElement('button', 'key');
      key.setAttribute('type', 'button');

      switch (layoutKey) {
        case KEYS.DELETE:
          key.classList.add('delete-btn');
          key.innerText = layoutKey;
          key.addEventListener('click', () => {
            this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1);
          });
          break;

        case KEYS.TAB:
          key.classList.add('tab-btn');
          key.innerText = layoutKey;
          key.addEventListener('click', () => this.textarea.value += '\t');
          break;


        case KEYS.CAPS_LOCK:
          key.classList.add('caps-lock-btn');
          key.innerText = layoutKey;
          key.addEventListener('click', () => {
            this.capslock = !this.capslock;
            toggleCapsLock();
          });
          break;

        case KEYS.SHIFT:
          key.classList.add('shift-btn');
          key.innerText = layoutKey;
          key.addEventListener('click', () => toggleShift());
          break;

        case KEYS.RETURN:
          key.classList.add('return-btn');
          key.innerText = layoutKey;
          key.addEventListener('click', () => { this.textarea.value += '\n'; });
          break;

        case KEYS.SPACE:
          key.classList.add('space-btn');
          key.addEventListener('click', () => { this.textarea.value += ' '; });
          break;

        case KEYS.FN:
          key.classList.add('fn-btn');
          key.addEventListener('click', toggleFn);
          break;

        default:
          key.textContent = layoutKey;
          key.addEventListener(('click', () => {
            if (this.capslock) {
              this.textarea.value += layoutKey.toUpperCase();
            } else {
              this.textarea.value += layoutKey.toLowerCase();
            }
          }));
      }
    });
  }
}

export { Keyboard };
