import Phaser from "phaser";
import { MovableObject } from "./movableobject";
import { config } from "./config";

export class Fire extends MovableObject {
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
  isDead() {
    return this.x < -this.width || this.x > config.width + this.width;
  }
}
