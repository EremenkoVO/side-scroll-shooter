import Phaser from "phaser";
import LoadingBar from "./../classes/LoadingBar";
import dragonPNG from "./../assets/sprites/dragon.png";
import dragonJSON from "./../assets/sprites/dragon.json";
import enemyPNG from "./../assets/sprites/enemy.png";
import enemyJSON from "./../assets/sprites/enemy.json";
import boomPNG from "./../assets/sprites/boom.png";
import boomJSON from "./../assets/sprites/boom.json";
import firePNG from "./../assets/sprites/fire.png";
import bullet from "./../assets/sprites/bullet.png";
class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.add.sprite(0, 0, "background").setOrigin(0);
    const loadingbar = new LoadingBar(this);
    this.preloadAssets();
  }

  preloadAssets() {
    // images //
    this.load.atlas("dragon", dragonPNG, dragonJSON);
    this.load.atlas("enemy", enemyPNG, enemyJSON);
    this.load.atlas("boom", boomPNG, boomJSON);
    this.load.image("fire", firePNG);
    this.load.image("bullet", bullet);
  }
  create() {
    this.scene.start("Start");
  }
}

export default PreloadScene;
