import config from "./../config";

class LoadingBar {
  constructor(scene) {
    this.scene = scene;
    this.style = {
      boxColor: 0xd3d3d3,
      barColor: 0xfff8dc,
      x: config.width / 2 - 450,
      y: config.height / 2 + 250,
      width: 900,
      heigth: 25,
    };

    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.setEvents();
  }

  setEvents() {
    this.scene.load.on("progress", this.showProgressBar, this);
  }

  showProgressBox() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width,
        this.style.heigth,
      );
  }

  showProgressBar(value) {
    this.progressBox
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width * value,
        this.style.heigth,
      );
  }
}

export default LoadingBar;
