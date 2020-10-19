import Phaser from "phaser";
import { config } from "./config";

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 150, config.height / 2, "dragon", "dragon1");
    this.init();
    this.move();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = 500;
  }

  /**
   * Move your person
   */
  move() {
    this.body.setVelocity(0);
    if (this.scene.cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    }
    if (this.scene.cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    }
    if (this.scene.cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    }
    if (this.scene.cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }
  }
}
