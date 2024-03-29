import Phaser from "phaser";
import config from "./../config";

class StartScene extends Phaser.Scene {
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

export default StartScene;
