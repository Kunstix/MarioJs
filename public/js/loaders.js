import Level from './Level.js'
import { createBgLayer, createSpriteLayer } from './Layers.js';
import { loadBgSprites } from './Sprites.js';

export function loadImg(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.src = url;
  });
}

export async function loadLvl(lvlName) {
  const [lvlSpec, bgSprites] = await Promise.all([loadLvlJson(lvlName), loadBgSprites()])
  const lvl = new Level();

  lvl.composition.layers.push(createBgLayer(lvlSpec.bgs, bgSprites));
  lvl.composition.layers.push(createSpriteLayer(lvl.entities));

  return lvl;
}

async function loadLvlJson(lvl) {
  const lvlJson = await fetch(`/levels/${lvl}.config.json`);
  return lvlJson.json(); 
}



