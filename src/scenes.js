import Phaser from "phaser";
import { config } from "./config";

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
  preload() {
    this.load.atlas("dragon", "./assets/dragon.png", "./assets/dragon.json");
  }
  create() {
    this.scene.start("Start");
  }
}

export class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {}
  create() {
    this.createBackgrond();
    this.createText();
    this.setEvents();
  }

  /**
   * Background image
   */
  createBackgrond() {
    this.add.sprite(0, 0, "background").setOrigin(0, 0);
  }

  /**
   * Create started text
   */
  createText() {
    this.add.text(config.width / 2, 500, "Tap to start", {
      fill: "#FFFFFF",
    });
  }

  /**
   * Start game
   */
  setEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackgrond();
    this.add.sprite(150, config.height / 2, "dragon", "dragon1");
  }

  /**
   * Background image
   */
  createBackgrond() {
    this.add.sprite(0, 0, "background").setOrigin(0, 0);
  }
}
