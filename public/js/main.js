import { loadLvl } from './loaders.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
import Keyboard from './Keyboard.js';

const canvas = document.getElementById('canvas');
const screen = canvas.getContext('2d');

Promise.all([loadLvl('1-1'), createMario()]).then(
  ([lvl, mario]) => {
    const gravity = 2000;
    mario.pos.set(64, 64);
    lvl.entities.add(mario);

    const SPACE = 32;
    const input = new Keyboard();
    input.addKeyMapping(SPACE, keyState => {
      if (keyState) {
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    });
    input.listenTo(window);

    const timer = new Timer();
    timer.update = function update(deltaTime) {
      lvl.update(deltaTime);
      lvl.composition.draw(screen);
      mario.vel.y += gravity * deltaTime;
    };

    timer.start();
  }
);
