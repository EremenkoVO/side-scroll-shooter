import Phaser from "phaser";
import { BootScene, PreloadScene, StartScene, GameScene } from "./scenes";

export var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
};
