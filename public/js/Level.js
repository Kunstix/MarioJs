import LayerComposer from './LayerComposer.js';

export default class Level {
    constructor() {
        this.composition = new LayerComposer()
        this.entities = new Set()
    }

    update(deltaTime) {
        this.entities.forEach(entity => entity.update(deltaTime))
    }
}