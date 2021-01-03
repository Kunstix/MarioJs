export default class Resolver {
  constructor(grid, tileSize = 16) {
    this.grid = grid;
    this.tileSize = tileSize;
  }

  toTileIndex(pos) {
    return Math.floor(pos / this.tileSize);
  }

  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;
    do {
      range.push(this.toTileIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);
    return range;
  }

  getTileByIndex(indexX, indexY) {
    const tile = this.grid.get(indexX, indexY);
    if (tile) {
      const x1 = indexX * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = indexY * this.tileSize;
      const y2 = y1 + this.tileSize;
      return {
        tile,
        x1,
        x2,
        y1,
        y2
      };
    }
  }

  getTileByPosition(posX, posY) {
    return this.getTileByIndex(this.toTileIndex(posX), this.toTileIndex(posY));
  }

  getTilesByRange(x1, x2, y1, y2) {
    const matchedTiles = [];
    this.toIndexRange(x1, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const matchedTile = this.getTileByIndex(indexX, indexY);
        if (matchedTile) {
          matchedTiles.push(matchedTile);
        }
      });
    });
    return matchedTiles;
  }
}
