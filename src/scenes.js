import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  /**
   * Preload all assets
   */
  preload() {
    // image //
    this.load.image("background", "./assets/background.png");
  }

  /**
   * Create on scene
   */
  create() {
    this.scene.start("Preload");
  }
}

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }
  preload() {}
  create() {
    this.scene.start("Game");
  }
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {}

  create() {
    this.createBackgrond();
  }

  /**
   * Background image
   */
  createBackgrond() {
    this.add.sprite(0, 0, "background").setOrigin(0, 0);
  }
}
