import Phaser from "phaser";
import Fire from "./../prefab/Fire";

class Fires extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
  }
  /**
   * Created fire
   *
   * @param {*} source
   */
  createdFire(source) {
    let fire = this.getFirstDead();

    if (!fire) {
      fire = Fire.generate(this.scene, source);
      this.add(fire);
    } else {
      fire.reset(source.x, source.y);
    }

    fire.move();
  }
}

export default Fires;
