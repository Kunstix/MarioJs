export default class LayerComposer {
  constructor() {
    this.layers = [];
  }

  draw(context) {
    this.layers.forEach(drawLayer => {
      drawLayer(context);
    });
  }
}
