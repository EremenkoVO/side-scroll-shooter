import Phaser from "phaser";
import { MovableObject } from "./movableobject";
import { Fires } from "./fires";
import { config } from "./config";

export class Enemy extends MovableObject {
  init(data) {
    super.init(data);
    this.timer = this.scene.time.addEvent({
      delay: data.bullet.delay,
      loop: true,
      callback: this.fire,
      callbackScope: this,
    });
    this.fires = data.fires || new Fires(this.scene);
    this.bullet = data.bullet;
    this.setOrigin(data.origin.x, data.origin.y);
  }

  fire() {
    this.fires.createdFire(this);
  }

  static generateAttributes() {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height - 100);
    return { x, y, frame: `enemy${Phaser.Math.Between(1, 4)}` };
  }

  static generate(scene, fires) {
    const data = Enemy.generateAttributes();
    return new Enemy({
      scene,
      fires,
      x: data.x,
      y: data.y,
      texture: "enemy",
      frame: data.frame,
      velocity: -250,
      bullet: {
        delay: 1000,
        texture: "bullet",
        velocity: -500,
      },
      origin: { x: 0, y: 0.5 },
    });
  }

  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);
  }

  isDead() {
    return this.x < -this.width;
  }
}
