import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  /**
   * preload all assets
   */
  preload() {
    // image
    this.load.image("background", "./assets/background.png");
  }

  /**
   *
   */
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
