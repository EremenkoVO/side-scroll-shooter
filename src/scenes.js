import Phaser from "phaser";
import { config } from "./config";
import { Enemies } from "./enemies";
import { Player } from "./player";

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
    this.load.atlas("enemy", "./assets/enemy.png", "./assets/enemy.json");
    this.load.image("fire", "./assets/fire.png");
    this.load.image("bullet", "./assets/bullet.png");
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
  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createBackgrond();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
  }

  update() {
    this.bg.tilePositionX += 0.5;
    this.player.move();
  }

  /**
   * Background image
   */
  createBackgrond() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "background")
      .setOrigin(0, 0);
  }
}
