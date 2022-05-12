// Virtual keyboard
class Keyboard {
  // Init array
  // Symbol keys - [normal, shifted, ru, ru shifted]
  // Special keys - [name, visible name, width]
  kies = [
    [['`', '~', 'ё', 'Ё', 'Backquote'], ['1', '!', '1', '!', 'Digit1'], ['2', '@', '2', '"', 'Digit2'], ['3', '#', '3', '№', 'Digit3'], ['4', '$', '4', ';', 'Digit4'], ['5', '%', '5', '%', 'Digit5'], ['6', '^', '6', ':', 'Digit6'], ['7', '&', '7', '?', 'Digit7'], ['8', '*', '8', '*', 'Digit8'], ['9', '(', '9', '(', 'Digit9'], ['0', ')', '0', ')', 'Digit0'], ['-', '_', '-', '_', 'Minus'], ['=', '+', '=', '+', 'Equal'], ['Backspace', '&#8678;', 12]],
    [['Tab', 'Tab', 8], ['q', 'Q', 'й', 'Й', 'KeyQ'], ['w', 'W', 'ц', 'Ц', 'KeyW'], ['e', 'E', 'у', 'У', 'KeyE'], ['r', 'R', 'к', 'К', 'KeyR'], ['t', 'T', 'е', 'Е', 'KeyT'], ['y', 'Y', 'н', 'Н', 'KeyY'], ['u', 'U', 'г', 'Г', 'KeyU'], ['i', 'I', 'ш', 'Ш', 'KeyI'], ['o', 'O', 'щ', 'Щ', 'KeyO'], ['p', 'P', 'з', 'З', 'KeyP'], ['[', '{', 'х', 'Х', 'BracketLeft'], [']', '}', 'ъ', 'Ъ', 'BracketRight'], ['Delete', 'DEL', 8]],
    [['CapsLock', 'Caps Lock', 10], ['a', 'A', 'ф', 'Ф', 'KeyA'], ['s', 'S', 'ы', 'Ы', 'KeyS'], ['d', 'D', 'в', 'В', 'KeyD'], ['f', 'F', 'а', 'А', 'KeyF'], ['g', 'G', 'п', 'П', 'KeyG'], ['h', 'H', 'р', 'Р', 'KeyH'], ['j', 'J', 'о', 'О', 'KeyJ'], ['k', 'K', 'л', 'Л', 'KeyK'], ['l', 'L', 'д', 'Д', 'KeyL'], [';', ':', 'ж', 'Ж', 'Semicolon'], ["'", '"', 'э', 'Э', 'Quote'], ['\\', '|', '\\', '/', 'Backslash'], ['Enter', '&#11176;', 12]],
    [['Shift', 'Shift', 10], ['z', 'Z', 'я', 'Я', 'KeyZ'], ['x', 'X', 'ч', 'Ч', 'KeyX'], ['c', 'C', 'с', 'С', 'KeyC'], ['v', 'V', 'м', 'М', 'KeyV'], ['b', 'B', 'и', 'И', 'KeyB'], ['n', 'N', 'т', 'Т', 'KeyN'], ['m', 'M', 'ь', 'Ь', 'KeyM'], [',', '<', 'б', 'Б', 'Comma'], ['.', '>', 'ю', 'Ю', 'Period'], ['/', '?', '.', ',', 'Slash'], ['ArrowUp', '&#8593;', 6], ['Shift', 'Shift', 13]],
    [['Control', 'CTRL', 8], ['Meta', 'WIN', 6], ['Alt', 'ALT', 8], ['Space', ' ', 30], ['Alt', 'ALT', 8], ['Control', 'CTRL', 8], ['ArrowLeft', '&#8592;', 6], ['ArrowDown', '&#8595;', 6], ['ArrowRight', '&#8594;', 6], ['ruen', 'RU/EN', 6]],
  ];

  arrows = [
    ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ['&#8593;', '&#8592;', '&#8595;', '&#8594;'],
  ];

  symKies = {};

  nameKP = 'key--pressed';

  storeName = 'vklang';

  states = {
    caps: 0,
    shift: false,
    lang: 'state0',
  };

  get output() {
    return this.intOutput;
  }

  set output(value) {
    this.intOutput = value;
  }

  // Add special key
  // param: row, col in kies array
  addSpecialKey(row, col) {
    const key = this.kies[row][col];
    const sdiv = document.createElement('button');
    const span = document.createElement('span');
    sdiv.classList.add('key');
    sdiv.setAttribute('type', 'button');
    sdiv.classList.add(key[0]);
    sdiv.style.width = `${key[2]}%`;
    span.innerHTML = `${key[1]}`;
    sdiv.append(span);
    return sdiv;
  }

  // Add special key
  // param: row, col in kies array
  addSymbolKey(row, col) {
    const key = this.kies[row][col];
    const sdiv = document.createElement('button');
    sdiv.setAttribute('type', 'button');
    sdiv.classList.add('key');
    this.symKies[key[4]] = [key[0], key[1], key[2], key[3]];
    sdiv.classList.add(key[4]);
    let span = '';
    for (let e = 0; e < 4; e += 1) {
      sdiv.dataset[`state${e}`] = key[e];
      span = document.createElement('span');
      span.classList.add(`state${e}`);
      span.innerHTML = key[e];
      sdiv.append(span);
    }
    return sdiv;
  }

  saveToLS(value) {
    localStorage.setItem(this.storeName, value);
  }

  getFromLS(name) {
    const lang = localStorage.getItem(name);
    if (lang === 'ru') {
      this.switchLang('ru');
    }
  }

  switchLang(toLang = null) {
    const div = document.querySelector('.keyboard');
    const langSwitch = document.querySelector('.ruen');
    const curState = this.states.lang;
    let newState = '';
    let lang = '';
    if (!toLang) {
      // switch to other
      switch (this.states.lang) {
        case 'state0':
          newState = 'state2';
          lang = 'ru';
          break;
        case 'state1':
          newState = 'state3';
          lang = 'ru';
          break;
        case 'state2':
          newState = 'state0';
          lang = 'en';
          break;
        default:
          newState = 'state1';
          lang = 'en';
      }
    } else {
      // switch to selected language
      lang = toLang;
      if (toLang === 'ru') {
        newState = 'state2';
      } else {
        newState = 'state0';
      }
    }
    if (lang === 'ru') {
      if (!langSwitch.classList.contains(this.nameKP)) langSwitch.classList.add(this.nameKP);
    } else if (langSwitch.classList.contains(this.nameKP)) langSwitch.classList.remove(this.nameKP);
    div.classList.add(newState);
    div.classList.remove(curState);
    this.states.lang = newState;
    this.saveToLS(lang);
  }

  showPress(name) {
    const e = document.querySelector(`.${name}`);
    if (!e.classList.contains(this.nameKP)) e.classList.add(this.nameKP);
  }

  isExcludes(name) {
    return (/^(Digit|Minus|Equal)/.test(name) || (/Backquote/.test(name) && !(this.states.lang === 'state2' || this.states.lang === 'state3')));
  }

  keyDown(event) {
    if (event.key.length > 1) {
      const tKeys = document.querySelectorAll(`.${event.key}`);
      if (tKeys) {
        tKeys.forEach((e) => {
          if (!e.classList.contains('key--pressed')) e.classList.add('key--pressed');
        });
        if (event.key === 'Shift' && !this.states.shift) {
          this.states.shift = true;
          const div = document.querySelector('.keyboard');
          if (this.states.lang === 'state0') {
            div.classList.add('state1');
            div.classList.remove('state0');
            this.states.lang = 'state1';
          } else {
            div.classList.add('state3');
            div.classList.remove('state2');
            this.states.lang = 'state3';
          }
        }
        if (event.key === 'ruen' || (event.key === 'Shift' && event.altKey) || (event.key === 'Alt' && event.shiftKey)) {
          // lang switch
          this.switchLang();
        }
        if (event.key === 'Enter') {
          this.output.innerHTML += '\n';
        }
        if (event.key === 'Tab') {
          this.output.innerHTML += '\t';
        }
        if (event.key === 'Backspace') {
          let s = this.output.innerHTML;
          if (s.length > 0) s = s.slice(0, s.length - 1);
          this.output.innerHTML = s;
        }
        if (event.key === 'CapsLock') {
          if (!this.states.caps) {
            const div = document.querySelector('.keyboard');
            if (!div.classList.contains('caps')) div.classList.add('caps');
          }
        }
        if (this.arrows[0].includes(event.key)) {
          this.showPress(event.key);
          this.output.innerHTML += this.arrows[1][this.arrows[0].indexOf(event.key)];
        }
      }
    } else if (event.key === ' ') {
      this.showPress('Space');
      this.output.innerHTML += ' ';
    } else {
      this.showPress(event.code);
      let stateId = this.states.lang[this.states.lang.length - 1];
      if (this.states.caps && !this.isExcludes(event.code)) {
        if (stateId === 0 || stateId === 2) {
          stateId += 1;
        } else {
          stateId -= 1;
        }
      }
      this.output.innerHTML += this.symKies[event.code][stateId];
    }
    this.output.focus();
    this.output.selectionStart = this.output.value.length;
  }

  keyUp(event) {
    if (event.key.length > 1) {
      const tKeys = document.querySelectorAll(`.${event.key}`);
      if (tKeys) {
        if (event.key !== 'CapsLock') {
          tKeys.forEach((e) => {
            e.classList.remove('key--pressed');
          });
        }
        if (event.key === 'Shift') {
          this.states.shift = false;
          const div = document.querySelector('.keyboard');
          if (this.states.lang === 'state1') {
            div.classList.add('state0');
            div.classList.remove('state1');
            this.states.lang = 'state0';
          } else {
            div.classList.add('state2');
            div.classList.remove('state3');
            this.states.lang = 'state2';
          }
        }
        if (event.key === 'CapsLock') {
          if (!this.states.caps) {
            this.states.caps = 1;
          } else {
            this.states.caps = 0;
            const div = document.querySelector('.keyboard');
            div.classList.remove('caps');
            tKeys[0].classList.remove('key--pressed');
          }
        }
      }
    } else if (event.key === ' ') {
      const e = document.querySelector('.Space');
      e.classList.remove('key--pressed');
    } else {
      const e = document.querySelector(`.${event.code}`);
      e.classList.remove('key--pressed');
    }
  }

  mouseClick(event) {
    const e = event.target.closest('.key');
    const fEvent = {
      key: e.classList[1],
      code: e.classList[1],
      altKey: false,
      shiftKey: false,
    };
    if (e.childNodes.length === 4) {
      // symbol key
      fEvent.key = e.dataset[this.states.lang];
    } else if (fEvent.key === 'Space') fEvent.key = ' ';

    this.keyDown(fEvent);

    if (fEvent.key !== 'ruen') {
      setTimeout(() => {
        this.keyUp(fEvent);
      }, 100);
    }
  }

  // init
  constructor() {
    this.output = '';
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('wrapper');
    document.body.append(wrapperDiv);
    const textArea = document.createElement('textarea');
    textArea.classList.add('output');
    textArea.innerHTML = '';
    wrapperDiv.append(textArea);
    const descrDiv = document.createElement('div');
    descrDiv.classList.add('description');
    descrDiv.innerHTML = 'Virtual Keyboard created in Windows OS.<br>Language switching on "Shift"+"Alt" or special "RU/EN" key.';
    document.body.append(descrDiv);
    const div = document.createElement('div');
    div.classList.add('keyboard');
    div.classList.add('state0');
    div.innerHTML = '';
    document.body.append(div);

    // Create kies
    Object.values(this.kies).forEach((entryRow, rowIdx) => {
      const rdiv = document.createElement('div');
      rdiv.classList.add('keyboard__row');
      div.append(rdiv);

      Object.values(entryRow).forEach((entryCol, colIdx) => {
        let keyButton = '';
        if (entryCol.length === 5) {
          // Symbol key
          keyButton = this.addSymbolKey(rowIdx, colIdx);
        } else {
          // Special key
          keyButton = this.addSpecialKey(rowIdx, colIdx);
        }
        rdiv.append(keyButton);
        keyButton.addEventListener('click', (e) => {
          this.mouseClick(e);
        });
      });
    });
    /*
        const kiesRows = Object.keys(this.kies);
        for (const row in kiesRows) {
          const rdiv = document.createElement('div');
          rdiv.classList.add('keyboard__row');
          div.append(rdiv);
          const kiesCols = Object.keys(this.kies[row]);
          for (const col in kiesCols) {
            let keyButton = '';
            if (this.kies[row][col].length === 5) {
              // Symbol key
              keyButton = this.addSymbolKey(row, col);
            } else {
              // Special key
              keyButton = this.addSpecialKey(row, col);
            }
            rdiv.append(keyButton);
            keyButton.addEventListener('click', (e) => {
              this.mouseClick(e);
            });
          }
        }
    */
    this.getFromLS('vklang');

    window.addEventListener('keydown', (e) => {
      this.keyDown(e);
      e.preventDefault();
      e.stopPropagation();
    });

    window.addEventListener('keyup', (e) => {
      this.keyUp(e);
      e.preventDefault();
      e.stopPropagation();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const kb = new Keyboard();
  const txtAr = document.querySelector('.output');
  kb.output = txtAr;
});
