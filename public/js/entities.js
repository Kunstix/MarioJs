import Entity from './Entity.js';
import { loadMarioSprite } from './Sprites.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Walk from './traits/Walk.js';

export async function createMario() {
  const marioSprite = await loadMarioSprite();
  const mario = new Entity();
  mario.size.set(14, 16);
  mario.addTrait(new Walk());
  mario.addTrait(new Jump());
  // mario.addTrait(new Velocity());

  mario.draw = function drawMario(context) {
    marioSprite.draw('idle_mario', context, this.pos.x, this.pos.y);
  };

  return mario;
}
