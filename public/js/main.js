import Timer from './Timer.js';
import { initKeyboard } from './input.js';
import { loadLvl } from './loaders.js';
import { createMario } from './entities.js';
import { createCollisionLayer } from './layers.js';

const canvas = document.getElementById('canvas');
const screen = canvas.getContext('2d');

Promise.all([loadLvl('1-1'), createMario()]).then(([lvl, mario]) => {
  mario.pos.set(64, 64);
  lvl.composition.layers.push(createCollisionLayer(lvl));

  lvl.entities.add(mario);

  const input = initKeyboard(mario);
  console.log(input);
  input.listenTo(window);

  ['mousedown', 'mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        mario.vel.set(0, 0);
        mario.pos.set(event.offsetX, event.offsetY);
      }
    });
  });

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    lvl.update(deltaTime);
    lvl.composition.draw(screen);
  };

  timer.start();
});
