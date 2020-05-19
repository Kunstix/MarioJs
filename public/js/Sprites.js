import SpriteSheet from './SpriteSheet.js';
import { loadImg } from './loaders.js';

export async function loadBgSprites() {
  const img = await loadImg('/imgs/mario_tiles.png');
  const sprites = new SpriteSheet(img, 16, 16);
  sprites.defineTile('ground', 0, 0);
  sprites.defineTile('sky', 3, 23);
  return sprites;
}

export async function loadMarioSprite() {
  const img = await loadImg('/imgs/characters.gif');
  const sprites = new SpriteSheet(img, 16, 16);
  sprites.define('idle_mario', 276, 44, 16, 16);
  return sprites;
}
