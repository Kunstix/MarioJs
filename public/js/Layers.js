function drawBg(bg, screen, sprites) {
  bg.bounds.forEach(([xStart, xEnd, yStart, yEnd]) => {
    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        sprites.drawTile(bg.type, screen, x, y);
      }
    }
  });
}

export function createBgLayer(bgs, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256; // NES width
  buffer.height = 240; // NES height
  bgs.forEach(bg => drawBg(bg, buffer.getContext('2d'), sprites));
  return context => {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(sprite) {
  return context => {
    sprite.draw(context);
  };
}
