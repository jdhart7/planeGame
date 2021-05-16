class Explosion extends Phaser.GameObjects.Sprite {   //function creates the explosion object
  constructor(scene, x, y){                           //pass in the scene, the x coordinate, and the y coordinate
    super(scene, x, y, "explosion");
	  scene.add.existing(this);                         //add the explosion, then play it (exposion animation defined in scene 1)
    this.play("explode");
  }
}
