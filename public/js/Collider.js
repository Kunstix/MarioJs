import TileEvaluator from './TileEvaluator.js';

export default class Collider {
    constructor(tileGrid) {
        this.tiles = new TileEvaluator(tileGrid);
    }

    xCheck(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }

        const matchedTiles = this.tiles.getTilesByRange(
            x, x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matchedTiles.forEach(matchedTile => {
            if (matchedTile.tile.name !== 'ground') {
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > matchedTile.x1) {
                    entity.pos.x = matchedTile.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < matchedTile.x2) {
                    entity.pos.x = matchedTile.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }

    yCheck(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }

        const matchedTiles = this.tiles.getTilesByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            y, y);

        matchedTiles.forEach(matchedTile => {
            if (matchedTile.tile.name !== 'ground') {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > matchedTile.y1) {
                    entity.pos.y = matchedTile.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < matchedTile.y2) {
                    entity.pos.y = matchedTile.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }
}