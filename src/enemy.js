import Phaser from "phaser";
import { config } from "./config";

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.init();
  }

  static generateAttributes() {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height / 2);
    const id = Phaser.Math.Between(1, 4);
    return { x, y, id };
  }

  static generate(scene) {
    const data = Enemy.generateAttributes();
    return new Enemy(scene, data.x, data.y, "enemy", `enemy${data.id}`);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = -200;
    this.scene.events.on("update", this.update, this);
  }

  reset() {
    const data = Enemy.generateAttributes();
    this.x = data.x;
    this.y = data.y;
    this.setFrame(`enemy${data.id}`);
    this.setAlive(true);
  }

  update() {
    if (this.active && this.x < -this.width) {
      this.setAlive(false);
    }
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
