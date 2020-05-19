import Entity, { Trait } from './Entity.js';
import { loadMarioSprite } from './Sprites.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';

export async function createMario() {
  const marioSprite = await loadMarioSprite();
  const mario = new Entity();
  mario.addTrait(new Velocity());
  mario.addTrait(new Jump());

  mario.draw = function drawMario(context) {
    marioSprite.draw('idle_mario', context, this.pos.x, this.pos.y);
  };

  return mario;
}
