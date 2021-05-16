class Bullet extends Phaser.GameObjects.Sprite {
	
	constructor(scene) {
		
		var x = scene.player.x;					//player's X and Y positions
		var y = scene.player.y - 40;
		
		super(scene, x, y, "bullet");
		scene.add.existing(this)
		
		this.play("bullet_anim");				//play the bullet animation
		scene.physics.world.enableBody(this);
		this.body.velocity.y = -600;			//move the bullet
		
		scene.projectiles.add(this);			//add the bullet to the projectiles group
	}
	
	update() {
		if (this.y < 10) {						//destroy the bullets if they're out of bounds to prevent memory leaks.
			this.destroy();
		}
	}
	
}