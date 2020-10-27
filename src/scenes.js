import Phaser from "phaser";
import { Boom } from "./boom";
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
    // images //
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
    // images //
    this.load.atlas("dragon", "./assets/dragon.png", "./assets/dragon.json");
    this.load.atlas("enemy", "./assets/enemy.png", "./assets/enemy.json");
    this.load.atlas("boom", "./assets/boom.png", "./assets/boom.json");
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
  create(data) {
    this.createBackgrond();
    if (data.score != undefined) {
      this.createStats(data);
    }
    this.createText();
    this.setEvents();
  }

  createStats(data) {
    this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(
        config.width / 2 - 200,
        config.height / 2 - 200,
        400,
        400,
      );

    const textTitle = data.completed ? "Level completed!" : "Game Over";
    const textScore = `Score: ${data.score}`;
    const textStyle = {
      font: "40px CurseCasual",
      fill: "#FFFFFF",
    };
    this.add.text(config.width / 2, 250, textTitle, textStyle).setOrigin(0.5);
    this.add.text(config.width / 2, 350, textScore, textStyle).setOrigin(0.5);
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
    this.add
      .text(config.width / 2, 500, "Tap to start", {
        font: "40px CurseCasual",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);
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
    this.score = 0;
  }

  create() {
    this.createBackgrond();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.createCompliteEvents();
    this.addOverlap();
    this.createText();
  }

  /**
   * Create started text
   */
  createText() {
    this.scoreText = this.add.text(50, 50, "Score: 0", {
      font: "40px CurseCasual",
      fill: "#FFFFFF",
    });
  }

  addOverlap() {
    this.physics.add.overlap(
      this.player.fires,
      this.enemies,
      this.onOverlap,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.enemies.fires,
      this.player,
      this.onOverlap,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.onOverlap,
      undefined,
      this,
    );
  }

  onOverlap(source, target) {
    const enemy = [source, target].find((item) => item.texture.key === "enemy");
    if (enemy) {
      ++this.score;
      this.scoreText.setText(`Score: ${this.score}`);
      Boom.generate(this, enemy.x, enemy.y);
    }
    source.setAlive(false);
    target.setAlive(false);
  }

  update() {
    this.bg.tilePositionX += 0.5;
    this.player.move();
  }

  createCompliteEvents() {
    this.player.once("killed", this.onComplete, this);
    this.events.once("enemies-killed", this.onComplete, this);
  }

  onComplete() {
    this.scene.start("Start", {
      score: this.score,
      completed: this.player.active,
    });
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
