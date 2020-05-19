import LayerComposer from './LayerComposer.js';
import { loadBgSprites } from './Sprites.js';
import { createBgLayer, createSpriteLayer } from './Layers.js';
import { loadLvl } from './loaders.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
import Keyboard from './Keyboard.js';

const canvas = document.getElementById('canvas');
const screen = canvas.getContext('2d');

Promise.all([loadBgSprites(), loadLvl('1-1'), createMario()]).then(
  ([bgSprites, lvl, mario]) => {
    const compose = new LayerComposer();
    compose.layers.push(createBgLayer(lvl.bgs, bgSprites));

    const gravity = 2000;
    mario.pos.set(64, 180);

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

    const spriteLayer = createSpriteLayer(mario);
    compose.layers.push(spriteLayer);

    const timer = new Timer();
    timer.update = function update(deltaTime) {
      mario.update(deltaTime);
      compose.draw(screen);
      mario.vel.y += gravity * deltaTime;
    };

    timer.start();
  }
);
