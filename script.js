import { createElement } from './js/createElement.js';
import { Keyboard } from './js/createKeyboard.js';

// !creating body, wrapper, title, textarea
document.body = createElement('body', 'body');
const wrapper = createElement('div', 'wrapper');
const titleElement = createElement('h1', 'title', 'RSS Virtual Keyboard');
const keyboard = new Keyboard();
const OS = createElement('p', 'operational-system', 'This keyboard was created using MacOS');
const changeLanguage = createElement('p', 'change-language', 'Use Fn to change the language');

window.addEventListener('DOMContentLoaded', () => {
  document.body.append(wrapper);
  keyboard.createKeyboard();
  keyboard.createKeys();
  keyboard.textarea.autofocus = true;
  wrapper.append(titleElement, keyboard.textarea, keyboard.keyboard, changeLanguage, OS);
});
