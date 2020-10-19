import Phaser from "phaser";
import { config } from "./config";

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, config.width - 150, config.height / 2, "enemy", "enemy1");
    this.init();
    this.move();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = 500;
  }

  move() {
    this.body.setVelocityX(-this.velocity);
  }
}
