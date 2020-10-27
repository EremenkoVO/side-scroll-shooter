import Phaser from "phaser";
import config from "./../config";
import Player from "./../prefab/Player";
import Enemies from "./../prefab/Enemies";
import Boom from "./../prefab/Boom";

class GameScene extends Phaser.Scene {
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

  /**
   * Collision handling
   */
  addOverlap() {
    // fires vs enemies
    this.physics.add.overlap(
      this.player.fires,
      this.enemies,
      this.onOverlap,
      undefined,
      this,
    );

    // fires vs player
    this.physics.add.overlap(
      this.enemies.fires,
      this.player,
      this.onOverlap,
      undefined,
      this,
    );

    // player vs enemies
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.onOverlap,
      undefined,
      this,
    );
  }

  /**
   * Overlap objects
   *
   * @param {*} source
   * @param {*} target
   */
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

  /**
   * kill events
   */
  createCompliteEvents() {
    this.player.once("killed", this.onComplete, this);
    this.events.once("enemies-killed", this.onComplete, this);
  }

  /**
   * end game
   */
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

export default GameScene;
