import Level from './Level.js'
import { createBgLayer, createSpriteLayer } from './layers.js';
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
  
  createTiles(lvl, lvlSpec.bgs);

  lvl.composition.layers.push(createBgLayer(lvl, bgSprites));
  lvl.composition.layers.push(createSpriteLayer(lvl.entities));

  return lvl;
}

async function loadLvlJson(lvl) {
  const lvlJson = await fetch(`/levels/${lvl}.config.json`);
  return lvlJson.json(); 
}

function createTiles(lvl, bgs) {
    bgs.forEach(bg => {
        bg.bounds.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    lvl.tiles.set(x, y, {
                        name: bg.type,
                    });
                }
            }
        });
    });
}



