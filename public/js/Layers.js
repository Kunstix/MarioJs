export function createBgLayer(lvl, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256; // NES width
  buffer.height = 240; // NES height

  const context = buffer.getContext('2d');

  lvl.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return context => {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(sprites) {
  return context => {
    sprites.forEach(sprite => sprite.draw(context));
  };
}

export function createCollisionLayer(lvl) {
  const resolvedTiles = [];

  const tileEvaluator = lvl.collider.tiles;
  const tileSize = tileEvaluator.tileSize;

  const getByIndexOriginal = tileEvaluator.getTileByIndex;
  tileEvaluator.getTileByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileEvaluator, x, y);
  };

  return function drawCollision(context) {
    context.strokeStyle = 'green';
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
      context.stroke();
    });

    context.strokeStyle = 'blue';
    lvl.entities.forEach(entity => {
      context.beginPath();
      context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}
