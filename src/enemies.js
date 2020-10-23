import Phaser, { Tilemaps } from "phaser";
import { Enemy } from "./enemy";

export class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super();
    this.scene = scene;
    this.count = 10;
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.tick,
      callbackScope: this,
    });
  }

  tick() {
    if (this.getLength() < this.count) {
      this.createEnemy();
    } else {
      this.timer.remove();
    }
  }

  createEnemy() {
    let enemy = Enemy.generate(this.scene);
    this.add(enemy);
    enemy.move();
  }
}
