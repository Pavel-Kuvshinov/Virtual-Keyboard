const keyLayouts = {
  keyCodes: [
    192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
    9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
    17, 999, 18, 32, 18, 37, 40, 39, 17,
  ],
  functionableKeyCodes: [
    8, 9, 46, 20, 13, 38, 16, 17, 999, 18, 32, 37, 40, 39,
  ],
  en: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
    'CapsLK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', 'Shift',
    'Ctrl', 'Lang', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl',
  ],
  ru: [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'CapsLK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift',
    'Ctrl', 'Lang', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl',
  ],
};

const keyboardSettings = {
  lang: 'en',
  value: '',
  capsLock: false,
  shift: false,
};

function createElements() {
  const main = document.createElement('main');
  main.classList.add('main');
  document.querySelector('body').prepend(main);

  const textArea = document.createElement('textarea');
  textArea.classList.add('input_field');
  document.querySelector('.main').prepend(textArea);

  const description = document.createElement('section');
  description.classList.add('description');
  document.querySelector('.main').append(description);

  const descriptionText = document.createElement('p');
  descriptionText.classList.add('description_text');
  document.querySelector('.description').append(descriptionText);
  descriptionText.innerText = 'Смена языка происходит с помощью кнопки с иконкой "глобуса" и сочетаниями клавиш "Ctrl" + "Shift" и "Alt" + "Shift".';

  const keyboard = document.createElement('section');
  keyboard.classList.add('keyboard');
  document.querySelector('.main').append(keyboard);
}

function createKeyboardKeys() {
  let keyLayout = keyLayouts.en;

  if (keyboardSettings.lang === 'en') {
    keyLayout = keyLayouts.en;
  }
  if (keyboardSettings.lang === 'ru') {
    keyLayout = keyLayouts.ru;
  }

  keyLayout.forEach((item, index) => {
    const keyElement = document.createElement('button');
    keyElement.classList.add('button');
    keyElement.classList.add('keyboard_key');
    keyElement.setAttribute('data-key', `${keyLayouts.keyCodes[index]}`);
    document.querySelector('.keyboard').append(keyElement);
    if (item === 'Backspace') {
      keyElement.classList.add('keyboard_key-wide');
      keyElement.textContent = item;
    } else if (item === 'CapsLK') {
      keyElement.classList.add('keyboard_key-medium');
      keyElement.textContent = item;
    } else if (item === 'Enter') {
      keyElement.classList.add('keyboard_key-wider');
      keyElement.textContent = item;
    } else if (item === 'Shift') {
      keyElement.classList.add('keyboard_key-wide');
      keyElement.textContent = item;
    } else if (item === 'Alt') {
      keyElement.classList.add('keyboard_key-medium');
      keyElement.textContent = item;
    } else if (item === 'Space') {
      keyElement.classList.add('keyboard_key-widest');
      keyElement.textContent = item;
    } else {
      keyElement.textContent = item;
    }
  });
}

function capslockToggle() {
  keyboardSettings.capsLock = !keyboardSettings.capsLock;
  Array.from(document.querySelectorAll('.keyboard_key')).forEach((item) => {
    const keyItem = item;
    if (!keyLayouts.functionableKeyCodes.includes(Number(keyItem.dataset.key))) {
      if (keyboardSettings.capsLock) keyItem.textContent = keyItem.textContent.toUpperCase();
      if (!keyboardSettings.capsLock) keyItem.textContent = keyItem.textContent.toLowerCase();
    }
  });
}

function keysCheckCode(code, text) {
  if (code === 13) {
    keyboardSettings.value += '\n';
  } else if (code === 8) {
    const propValue = keyboardSettings.value;
    keyboardSettings.value = propValue.substring(0, propValue.length - 1);
    console.log(keyboardSettings.value);
  } else if (code === 46) {
    console.log('Del'); // Delete button
  } else if (code === 9) {
    keyboardSettings.value += '    ';
  } else if (code === 20) {
    capslockToggle();
  } else if (code === 16) {
    console.log('Shift'); // Shift button
  } else if (code === 17) {
    console.log('Ctrl'); // Ctrl button
  } else if (code === 18) {
    console.log('Alt'); // Alt button
  } else if (code === 32) {
    keyboardSettings.value += ' ';
  } else if (code === 38) {
    console.log('Up'); // Up button
  } else if (code === 37) {
    console.log('Left'); // Left button
  } else if (code === 40) {
    console.log('Down'); // Down button
  } else if (code === 39) {
    console.log('Right'); // Right button
  } else if (code === 999) {
    console.log('Lang'); // Lang button
  } else {
    keyboardSettings.value += text;
    console.log(keyboardSettings.value);
  }
}

function keyboardKeysClick() {
  document.querySelector('.keyboard').addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
      keysCheckCode(Number(e.target.dataset.key), e.target.textContent);
      // console.log(e);
    }
  });
}

function keyboardKeysToggle() {
  document.addEventListener('keydown', (e) => {
    if (keyLayouts.keyCodes.includes(e.keyCode)) {
      keysCheckCode(e.keyCode, e.key);
      // console.log(e);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  createElements();
  createKeyboardKeys();
  keyboardKeysClick();
  keyboardKeysToggle();
});
