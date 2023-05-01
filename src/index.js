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
  enShiftKeys: [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?',
  ],
  enNonShiftKeys: [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/',
  ],
  ruShiftKeys: [
    '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '/', ',',
  ],
  ruNonShiftKeys: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\', '.',
  ],
};

const keyboardSettings = {
  lang: 'en',
  value: '',
  capsLock: false,
  shift: false,
  cursorPosition: 0,
  currentLine: 0,
  totalLines: 0,
  linesLength: [],
};

function createElements() {
  const main = document.createElement('main');
  main.classList.add('main');
  document.querySelector('body').prepend(main);

  const textArea = document.createElement('textarea');
  textArea.classList.add('input_field');
  document.querySelector('.main').prepend(textArea);
  document.querySelector('.input_field').autofocus = true;

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

function shiftToggle() {
  keyboardSettings.shift = !keyboardSettings.shift;
  Array.from(document.querySelectorAll('.keyboard_key')).forEach((item) => {
    const keyItem = item;
    if (keyItem.textContent.toLowerCase().match(/^[a-zа-яё]+$/) && keyItem.textContent.length < 2) {
      if (keyboardSettings.shift) keyItem.textContent = keyItem.textContent.toUpperCase();
      if (!keyboardSettings.shift) keyItem.textContent = keyItem.textContent.toLowerCase();
    }
    if (!keyItem.textContent.toLowerCase().match(/^[a-zа-яё]+$/) && keyItem.textContent.length < 2) {
      if (keyboardSettings.lang === 'en' && keyboardSettings.shift) {
        const memIndex = (keyLayouts.enNonShiftKeys).indexOf(keyItem.textContent);
        keyItem.textContent = keyLayouts.enShiftKeys[memIndex];
      }
      if (keyboardSettings.lang === 'en' && !keyboardSettings.shift) {
        const memIndex = (keyLayouts.enShiftKeys).indexOf(keyItem.textContent);
        keyItem.textContent = keyLayouts.enNonShiftKeys[memIndex];
      }
      if (keyboardSettings.lang === 'ru' && keyboardSettings.shift) {
        const memIndex = (keyLayouts.ruNonShiftKeys).indexOf(keyItem.textContent);
        keyItem.textContent = keyLayouts.ruShiftKeys[memIndex];
      }
      if (keyboardSettings.lang === 'ru' && !keyboardSettings.shift) {
        const memIndex = (keyLayouts.ruShiftKeys).indexOf(keyItem.textContent);
        keyItem.textContent = keyLayouts.ruNonShiftKeys[memIndex];
      }
    }
  });
}

function deleteToggle() {
  if (keyboardSettings.cursorPosition !== 0) {
    keyboardSettings.value = keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
      + keyboardSettings.value.slice(keyboardSettings.cursorPosition + 1);
  }
}

function getLang() {
  if (localStorage.getItem('langKeyboard') !== null) {
    keyboardSettings.lang = localStorage.getItem('langKeyboard');
  }
}

function langChange() {
  if (keyboardSettings.lang === 'en') {
    keyboardSettings.lang = 'ru';
    localStorage.setItem('langKeyboard', keyboardSettings.lang);
    Array.from(document.querySelectorAll('.keyboard_key')).forEach((item, index) => {
      const keyItem = item;
      keyItem.textContent = keyLayouts.ru[index];
    });
  } else if (keyboardSettings.lang === 'ru') {
    keyboardSettings.lang = 'en';
    localStorage.setItem('langKeyboard', keyboardSettings.lang);
    Array.from(document.querySelectorAll('.keyboard_key')).forEach((item, index) => {
      const keyItem = item;
      keyItem.textContent = keyLayouts.en[index];
    });
  }
}

function countTextfieldLines() {
  keyboardSettings.totalLines = 0;
  const textFieldInnerWidth = document.querySelector('.input_field').clientWidth
    - Number((window.getComputedStyle(document.querySelector('.input_field'), null).getPropertyValue('padding-left')).slice(0, -2)) * 2 - 1;
  const linesArr = keyboardSettings.value.split('\n');
  linesArr.forEach((item) => {
    keyboardSettings.linesLength.push(item.length + 1);
    const textMem = document.createElement('p');
    textMem.style.position = 'relative';
    document.querySelector('.main').prepend(textMem);
    textMem.textContent = item;
    const textFieldTextWidth = textMem.clientWidth;
    textMem.remove();
    if (textFieldTextWidth - textFieldInnerWidth > 0) {
      keyboardSettings.totalLines += Math.ceil(textFieldTextWidth / textFieldInnerWidth);
    } else {
      keyboardSettings.totalLines += 1;
    }
  });
  keyboardSettings.linesLength[keyboardSettings.linesLength.length
    - 1] = keyboardSettings.linesLength[keyboardSettings.linesLength.length - 1] - 1;
}

function upButtonToggle() {
  countTextfieldLines();
}

function keysCheckCode(code, text, event) {
  // language button
  if ((event.ctrlKey && event.shiftKey) || (event.altKey && event.shiftKey) || code === 999) {
    langChange();
  } else if (code === 38) {
    // console.log('Up');
    upButtonToggle();
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    }▲${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 1;
  } else if (code === 37) {
    // console.log('Left');
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    }◄${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 1;
  } else if (code === 40) {
    // console.log('Down');
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    }▼${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 1;
  } else if (code === 39) {
    // console.log('Right');
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    }►${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 1;
  } else if (code === 13) {
    // console.log('enter button');
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    }\n${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 1;
  } else if (code === 8) {
    // console.log('backspace button');
    const propValue = keyboardSettings.value;
    keyboardSettings.value = propValue.substring(0, propValue.length - 1);
    keyboardSettings.cursorPosition -= 1;
    if (keyboardSettings.cursorPosition < 0) {
      keyboardSettings.cursorPosition = 0;
    }
  } else if (code === 46) {
    // console.log('delete button');
    deleteToggle();
    document.querySelector('.input_field').focus();
    setTimeout(() => {
      document.querySelector('.input_field').selectionEnd = keyboardSettings.cursorPosition;
      document.querySelector('.input_field').selectionStart = keyboardSettings.cursorPosition;
    }, 1);
  } else if (code === 9) {
    // console.log('tab button');
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    }    ${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 4;
    setTimeout(() => {
      document.querySelector('.input_field').selectionEnd = keyboardSettings.cursorPosition;
      document.querySelector('.input_field').selectionStart = keyboardSettings.cursorPosition;
    }, 1);
  } else if (code === 20) {
    // console.log('capslock button');
    capslockToggle();
  } else if (code === 16) {
    // console.log('shift button');
    shiftToggle();
  } else if (code === 17) {
    // console.log('Ctrl button');
  } else if (code === 18) {
    // console.log('Alt button');
  } else if (code === 32) {
    // console.log('Space button');
    keyboardSettings.value = `${keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
    } ${keyboardSettings.value.slice(keyboardSettings.cursorPosition)}`;
    keyboardSettings.cursorPosition += 1;
    setTimeout(() => {
      document.querySelector('.input_field').selectionEnd = keyboardSettings.cursorPosition;
      document.querySelector('.input_field').selectionStart = keyboardSettings.cursorPosition;
    }, 1);
  } else {
    // console.log('text buttons');
    keyboardSettings.value = keyboardSettings.value.slice(0, keyboardSettings.cursorPosition)
      + text + keyboardSettings.value.slice(keyboardSettings.cursorPosition);
    keyboardSettings.cursorPosition += 1;
    setTimeout(() => {
      document.querySelector('.input_field').selectionEnd = keyboardSettings.cursorPosition;
      document.querySelector('.input_field').selectionStart = keyboardSettings.cursorPosition;
    }, 1);
  }
  event.preventDefault();
}

function textfieldValueUpdate() {
  document.querySelector('.input_field').value = keyboardSettings.value;
}

function textfieldCheck() {
  document.querySelector('.input_field').addEventListener('click', () => {
    keyboardSettings.cursorPosition = document.querySelector('.input_field').selectionStart;
  });
  document.querySelector('.input_field').addEventListener('input', () => {
    document.querySelector('.input_field').value = keyboardSettings.value;
  });
}

function keyboardKeysClick() {
  document.querySelector('.keyboard').addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
      keysCheckCode(Number(e.target.dataset.key), e.target.textContent, e);
      textfieldValueUpdate();
    }
  });
}

function keyboardKeysToggle() {
  document.addEventListener('keydown', (e) => {
    if (keyLayouts.keyCodes.includes(e.keyCode)) {
      const key = document.querySelector(`.keyboard_key[data-key="${e.keyCode}"]`);
      keysCheckCode(e.keyCode, key.textContent, e);
      textfieldValueUpdate();
      key.classList.add('keyboard_key-active');
      document.addEventListener('keyup', () => {
        key.classList.remove('keyboard_key-active');
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  getLang();
  createElements();
  createKeyboardKeys();
  textfieldCheck();
  keyboardKeysClick();
  keyboardKeysToggle();
});
