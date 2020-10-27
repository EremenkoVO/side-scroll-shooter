import Phaser from "phaser";
import config from "./../config";
import MovableObject from "./../prefab/MovableObject";
import Fires from "./../prefab/Fires";

class Enemy extends MovableObject {
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

  //
  fire() {
    this.fires.createdFire(this);
  }

  /**
   * generate enemy attributes
   */
  static generateAttributes() {
    const x = config.width + 200;
    const y = Phaser.Math.Between(100, config.height - 100);
    return { x, y, frame: `enemy${Phaser.Math.Between(1, 4)}` };
  }

  /**
   * generate enemy
   *
   * @param {*} scene
   * @param {*} fires
   */
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

  /**
   * reset enemy
   */
  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);
  }

  /**
   * if the enemy is off-screen
   */
  isDead() {
    return this.x < -this.width;
  }
}

export default Enemy;
