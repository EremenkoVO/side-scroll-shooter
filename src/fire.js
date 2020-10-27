import Phaser from "phaser";
import { config } from "./config";

export class Fire extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture);
    this.init(data);
  }

  static generate(scene, source) {
    const data = {
      scene,
      x: source.x + source.width / 2,
      y: source.y,
      texture: "fire",
      velocity: 750,
    };
    return new Fire(data);
  }

  init(data) {
    this.scene.add.existing(this);
    this.velocity = data.velocity;
  }

  reset() {
    this.x = source.x + source.width / 2;
    this.y = data.y;
    this.setAlive(true);
  }

  setAlive(status) {
    // deactived
    this.body.enable = status;

    // hide texture
    this.setVisible = status;

    //deactived object
    this.setActive(status);
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }
}
