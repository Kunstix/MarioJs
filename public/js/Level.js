import LayerComposer from './LayerComposer.js';
import Collider from './Collider.js';
import { Grid } from './math.js'

export default class Level {
    constructor() {
        this.gravity = 2000;

        this.composition = new LayerComposer();
        this.entities = new Set();
        this.tiles = new Grid();
        this.collider = new Collider(this.tiles);

    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.collider.xCheck(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.collider.yCheck(entity);

            entity.vel.y += this.gravity * deltaTime;
        });
    }
}