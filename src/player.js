import Phaser from "phaser";
import { config } from "./config";
import { Fires } from "./fires";
import { Enemy } from "./enemy";

export class Player extends Enemy {
  constructor(scene) {
    super({
      scene,
      x: 150,
      y: config.height / 2,
      texture: "dragon",
      frame: "dragon1",
      velocity: 500,
    });
  }

  init(data) {
    super.init(data);

    this.fires = new Fires(this.scene);
    this.timer = this.scene.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.fire,
      callbackScope: this,
    });
  }

  fire() {
    this.fires.createdFire(this);
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
