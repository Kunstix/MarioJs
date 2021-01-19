import Keyboard from './Keyboard.js';

export function initKeyboard(entity) {
  const keyBoard = new Keyboard();

  keyBoard.addKeyMapping('Space', keyState => {
    if (keyState) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  keyBoard.addKeyMapping('ArrowRight', keyState => {
    entity.walk.dir = keyState;
  });

  keyBoard.addKeyMapping('ArrowLeft', keyState => {
    entity.walk.dir = -keyState;
  });

  return keyBoard;
}
