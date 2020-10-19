import Phaser from "phaser";
import { config } from "./config";

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.init();
  }

  static generate(scene) {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height / 2);
    const id = Phaser.Math.Between(1, 4);
    return new Enemy(scene, x, y, "enemy", `enemy${id}`);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = -200;
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }
}
