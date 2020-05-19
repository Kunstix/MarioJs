const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
  constructor() {
    this.keyStates = new Map();
    this.keyMap = new Map();
  }

  addKeyMapping(keyCode, keyCallback) {
    this.keyMap.set(keyCode, keyCallback);
  }

  handleEvent(event) {
    const { keyCode } = event;
    if (!this.keyMap.has(keyCode)) {
      return false;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    this.keyMap.get(keyCode)(keyState);
  }

  listenTo(window) {
    ['keyup', 'keydown'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }
}
