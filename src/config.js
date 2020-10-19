import Phaser from "phaser";
import { BootScene, PreloadScene, GameScene } from "./scenes";

export var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, GameScene],
};
