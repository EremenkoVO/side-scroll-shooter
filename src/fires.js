import Phaser from "phaser";
import { Fire } from "./fire";

export class Fires extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
  }

  createdFire(source) {
    let fire = this.getFirstDead();

    if (!fire) {
      fire = Fire.generate(this.scene, source);
      this.add(fire);
    } else {
      fire.reset(source.x + source.width / 2, source.y);
    }

    fire.move();
  }
}
