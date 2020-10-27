import Phaser from "phaser";

class Boom extends Phaser.GameObjects.Sprite {
  static generate(scene, x, y) {
    return new Boom({ scene, x, y });
  }
  constructor(data) {
    super(data.scene, data.x, data.y, "boom", "boom1");
    this.scene.add.existing(this);
    // frames
    const frames = this.scene.anims.generateFrameNames("boom", {
      prefix: "boom",
      start: 1,
      end: 4,
    });

    // animation
    this.scene.anims.create({
      key: "boom",
      frames,
      frameRate: 10,
      repeat: 0,
    });

    // play animation
    this.play("boom");

    // destroy sprite
    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      this.destroy();
    });
  }
}

export default Boom;
