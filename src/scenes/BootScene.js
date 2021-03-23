import Phaser from "phaser";
import background from "./../assets/sprites/background.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  /**
   * Preload all assets
   */
  preload() {
    // images //
    this.load.image("background", background);
  }

  /**
   * Create on scene
   */
  create() {
    this.scene.start("Preload");
  }
}

export default BootScene;
