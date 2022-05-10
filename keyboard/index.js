// Virtual keyboard
const keyboard = {
    // Init array
    // Symbol keys - [normal, shifted, ru, ru shifted]
    // Special keys - [name, visible name, width]
    kies: [
        [['`', '~', 'ё', 'Ё'], ['1', '!', '1', '!'], ['2', '@', '2', '"'], ['3', '#', '3', '№'], ['4', '$', '4', ';'], ['5', '%', '5', '%'], ['6', '^', '6', ':'],
        ['7', '&', '7', '?'], ['8', '*', '8', '*'], ['9', '(', '9', '('], ['0', ')', '0', ')'], ['-', '_', '-', '_'], ['=', '+', '=', '+'], ['Backspace', '&#8678;', 12]
        ],
        [['Tab', 'Tab', 8], ['q', 'Q', 'й', 'Й'], ['w', 'W', 'ц', 'Ц'], ['e', 'E', 'у', 'У'], ['r', 'R', 'к', 'К'], ['t', 'T', 'е', 'Е'], ['y', 'Y', 'н', 'Н'],
        ['u', 'U', 'г', 'Г'], ['i', 'I', 'ш', 'Ш'], ['o', 'O', 'щ', 'Щ'], ['p', 'P', 'з', 'З'], ['[', '{', 'х', 'Х'], [']', '}', 'ъ', 'Ъ'], ['Delete', 'DEL', 8]
        ],
        [['CapsLock', 'Caps Lock', 10], ['a', 'A', 'ф', 'Ф'], ['s', 'S', 'ы', 'Ы'], ['d', 'D', 'в', 'В'], ['f', 'F', 'а', 'А'], ['g', 'G', 'п', 'П'], ['h', 'H', 'р', 'Р'],
        ['j', 'J', 'о', 'О'], ['k', 'K', 'л', 'Л'], ['l', 'L', 'д', 'Д'], [';', ':', 'ж', 'Ж'], ["'", '"', 'э', 'Э'], ['\\', '|', '\\', '/'], ['Enter', '&#11176;', 12]
        ],
        [['Shift', 'Shift', 10], ['z', 'Z', 'я', 'Я'], ['x', 'X', 'ч', 'Ч'], ['c', 'C', 'с', 'С'], ['v', 'V', 'м', 'М'], ['b', 'B', 'и', 'И'], ['n', 'N', 'т', 'Т'],
        ['m', 'M', 'ь', 'Ь'], [',', '<', 'б', 'Б'], ['.', '>', 'ю', 'Ю'], ['/', '?', '.', ','], ['ArrowUp', '&#8593;', 6], ['Shift', 'Shift', 13]
        ],
        [['Control', 'CTRL', 8], ['Meta', 'WIN', 6], ['Alt', 'ALT', 8], ['Space', ' ', 30], ['Alt', 'ALT', 8], ['Control', 'CTRL', 8], ['ArrowLeft', '&#8592;', 6],
        ['ArrowDown', '&#8595;', 6], ['ArrowRight', '&#8594;', 6], ['ruen', 'RU/EN', 6]
        ]
    ],

    states: {
        caps: false,
        shift: false,
        alt: false,
        ctrl: false
    },

    // Add special key 
    // param: row, col in kies array
    _addSpecialKey(row, col) {
        const key = this.kies[row][col]
        const sdiv = document.createElement('button')
        const span = document.createElement('span')
        sdiv.classList.add('key')
        sdiv.setAttribute('type', 'button')
        sdiv.classList.add(key[0])
        sdiv.style.width = `${key[2]}%`
        span.innerHTML = key[1]
        sdiv.append(span)
        return sdiv
    },

    // Add special key 
    // param: row, col in kies array
    _addSymbolKey(row, col) {
        const key = this.kies[row][col]
        const sdiv = document.createElement('button')
        sdiv.setAttribute('type', 'button')
        sdiv.classList.add('key')
        let span = ''
        for (let e in key) {
            sdiv.dataset['state' + e] = key[e]
            span = document.createElement('span')
            span.classList.add('state' + e)
            span.innerHTML = key[e]
            sdiv.append(span)
        }
        return sdiv
    },

    _keyDown(event) {
        if (event.key.length > 1) {
            const tKeys = document.querySelectorAll('.' + event.key)
            if (tKeys) {
                tKeys.forEach(e => {
                    if (!e.classList.contains('key--pressed')) e.classList.add('key--pressed')
                })
            }
        } else {
            if (event.key === ' ') {
                const e = document.querySelector('.Space')
                if (!e.classList.contains('key--pressed')) e.classList.add('key--pressed')
            } else if (event.key === '\\') {
                const e = document.querySelector('.key[data-state1="|"]')
                if (!e.classList.contains('key--pressed')) e.classList.add('key--pressed')
            } else {
                const e = document.querySelector(`.key[data-state0="${event.key}"]`)
                if (!e.classList.contains('key--pressed')) e.classList.add('key--pressed')
            }
        }
        console.log(event)
    },

    _keyUp(event) {
        if (event.key.length > 1) {
            const tKeys = document.querySelectorAll('.' + event.key)
            if (tKeys) {
                tKeys.forEach(e => {
                    e.classList.remove('key--pressed')
                })
            }
        } else {
            if (event.key === ' ') {
                const e = document.querySelector('.Space')
                e.classList.remove('key--pressed')
            } else if (event.key === '\\') {
                const e = document.querySelector('.key[data-state1="|"]')
                e.classList.remove('key--pressed')
            } else {
                const e = document.querySelector(`.key[data-state0="${event.key}"]`)
                e.classList.remove('key--pressed')
            }
        }
        console.log(event)
    },

    _eventWatcher(event) {
        console.log(event)
    },

    // init
    init() {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.classList.add('wrapper')
        document.body.append(wrapperDiv)
        const textArea = document.createElement('textarea')
        textArea.classList.add('output')
        textArea.innerHTML = 'Пожалуйста, свяжитесь со мной, я не успел до дедлайна. Доделаю и сообщу.\nДискорд: @HamSilver#6397\nТелеграм: @hamsilver'
        wrapperDiv.append(textArea)
        const descrDiv = document.createElement('div')
        descrDiv.classList.add('description')
        descrDiv.innerHTML = 'Virtual Keyboard created in Windows OS.<br>Language switching on "Shift"+"Alt" or special "RU/EN" key.'
        document.body.append(descrDiv)
        const div = document.createElement('div')
        div.classList.add('keyboard')
        div.classList.add('state0')
        div.innerHTML = ''
        document.body.append(div)

        //Create kies
        for (let row in this.kies) {
            let rdiv = document.createElement('div')
            rdiv.classList.add('keyboard__row')
            div.append(rdiv)
            for (let col in this.kies[row]) {
                let keyButton = ''
                if (this.kies[row][col].length == 4) {
                    // Symbol key
                    keyButton = this._addSymbolKey(row, col)
                } else {
                    // Special key
                    keyButton = this._addSpecialKey(row, col)
                }
                rdiv.append(keyButton)
                keyButton.addEventListener('click', (e) => {
                    this._eventWatcher(e)
                })
            }
        }
        window.addEventListener('keydown', (e) => {
            this._keyDown(e)
            e.preventDefault()
            e.stopPropagation()
        })
        window.addEventListener('keyup', (e) => {
            this._keyUp(e)
            e.preventDefault()
            e.stopPropagation()
        })


    }
}

window.addEventListener("DOMContentLoaded", function () {
    keyboard.init()
})