class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	}

    create() {
		
		this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setScale(7);		//add the background, set the origin
		this.background.setOrigin(0, 0);
		
		this.heart1 = this.add.image(config.width - 30, 30, 'heart').setScale(0.75);				//add the 3 hearts, position them.
		this.heart2 = this.add.image(config.width - 70, 30, 'heart').setScale(0.75);
		this.heart3 = this.add.image(config.width - 110, 30, 'heart').setScale(0.75);
		
		this.player = this.physics.add.sprite(config.width / 2, config.height, 'characterSheet').setScale(scale);	//add the player to the scene, position in the bottom middle
		this.player.setCollideWorldBounds(true);																	//allow collisions
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);						//read space key input
		
		this.zero1 = this.add.sprite(config.width / 2 - 50, config.height + 90, "zero1").setScale(scale);		//add the 4 zeros to the scene
		this.zero2 = this.add.sprite(config.width / 2, config.height + 90, "zero2").setScale(scale);
		this.zero3 = this.add.sprite(config.width / 2 + 50, config.height + 90, "zero3").setScale(scale);
		this.zero4 = this.add.sprite(config.width / 2 + 70, config.height + 90, "zero4").setScale(scale);
		
		this.zero1.angle = 180;							//orientation of the enemy sprites
		this.zero2.angle = 180;
		this.zero3.angle = 180;
		this.zero4.angle = 180;
		
		this.enemies = this.physics.add.group();		//create a group for the enemies
		this.enemies.add(this.zero1);
		this.enemies.add(this.zero2);
		this.enemies.add(this.zero3);
		this.enemies.add(this.zero4);
		
		this.zero1.play("zero1");						//play the enemy animations
		this.zero2.play("zero2");
		this.zero3.play("zero3");
		this.zero4.play("zero4");
		
		this.zero1.setInteractive();					//allows the enemies to be interacted with. Without this, they would essentially be background elements.
		this.zero2.setInteractive();
		this.zero3.setInteractive();
		this.zero4.setInteractive();
		
		this.projectiles = this.add.group();
		
		this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
		this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);			//detects enemy and player collision, then calls hurtPlayer()
		
		this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: " +score  , 40);		//create the score label using the imported font
		this.gameLabel = this.add.bitmapText(config.width / 2 - 200, config.height / 2 - 100, "pixelFont", " ", 100).setOrigin(0, 0);	//position the label at the top left
		
		this.pewSound = this.sound.add("audio_pew");				//add the sounds/music to the scene
		this.explodeSound = this.sound.add("audio_explode");
		this.gameOverSound = this.sound.add("audio_gameOver");
		
		this.music = this.sound.add("music");

		var musicConfig = {						//configure the music, set it to loop at full volume at regular speed.
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0,
		}

		this.music.play(musicConfig);			//start the music when the scene starts
			
    }
	
	hurtPlayer(player, enemy) {			//called when the player collides with an enemy
		this.resetPlanePos(enemy);		//reset the enemy plane's position
		
		if (this.player.alpha < 1) {		//if the player is transparent, they can't be destroyed
			return;
		}
		
		var explosion = new Explosion(this, this.player.x, this.player.y);		//explode animation when the player gets hit
		
		player.disableBody(true, true);			//disable the player, remove a life, play the explosion sound
		lives--;
		this.explodeSound.play();
		
		if (lives == 2) {						//TODO: fix this. destroys a heart based on the amount of lives
			this.heart3.destroy(true, true);
		} else if (lives == 1) {
			this.heart2.destroy(true, true);
		} else if (lives == 0) {				//game over if there are no more lives.
			this.heart1.destroy(true, true);
			this.gameLabel.text = "GAME OVER";
			
			var gameOverConfig = {		//configuring sound settings. The yelling was too loud before (it still is, but whatever I guess).
				mute: false,
				volume: .2,
				rate: 1,
				detune: 0,
				seek: 0,
				loop: false,
				delay: 1
			}
			this.gameOverSound.play(gameOverConfig);		//play the yell
			
			var timer = this.time.addEvent ({			//reset the game after 3 seconds
				delay: 3000,
				callback: this.restartGame,
				callbackScope: this
			});
			
			return;
		}
		
		this.time.addEvent ({
			delay: 1000,
			callback: this.resetPlayer,		//reset the player after 1000ms
			callbackScope: this,
			loop: false
		});
	}
	
	restartGame() {					//better than making the player refresh the page... stop the music, reset the scene.
		this.music.stop();
		this.resetPlayer,
		lives = 3,
		score = 0,
		this.scene.start("playGame");
	}
	
	resetPlayer() {						//function is called when the player dies
		var x = config.width / 2;		//reset the player's position to below the screen
		var y = config.height;
		
		this.player.enableBody(true, x, y, true, true);		//enable the player
		
		this.player.alpha = 0.5;		//make the player partly transparent
		
		var tween = this.tweens.add({		//attempts to ease the sprite into the scene, as if a new plane is flying in. Only kinda works. TODO: fix that.
			targets: this.player,
			y: config.height - 64,
			ease: 'Power1',
			duration: 1500,
			repeat:0,
			onComplete: function(){
				this.player.alpha = 1;
			},
		callbackScope: this
		});
	}
	
	hitEnemy(enemy, player) {			//reset position
		player.x = config.width / 2;
		player.y = config.height;
	}
	
	resetPlanePos(plane) {			//reset enemy planes when they're killed or reach the end of the screen
		plane.y = 0;
		var randomX = Phaser.Math.Between(20, config.width -20);	//choose a random number along the X axis to spawn the plane
		plane.x = randomX;
	}
	
	movePlane(plane, speed) {		//move player left/right
		plane.y += speed;
		if (plane.y > config.height) {
			this.resetPlanePos(plane);
			if (lives > 0) {
				score -= 25;
				paddedScore = this.formatScore(score, 7);
				//console.log(score);
				this.scoreLabel.text = "SCORE: " +paddedScore;
			}
		}
	}
	
	shootBullet() {							//pretty self-explanitory...
		var bullet = new Bullet(this);
	}
	
	hitEnemy(projectile, enemy) {
		var explosion = new Explosion(this, enemy.x, enemy.y);		//pass the scene and the enemy position
		
		projectile.destroy();				//delete the bullet, reset the enemy's position
		this.resetPlanePos(enemy);
		
		score += 100;									//add to the score, format the score to include 0s, put "SCORE: " text
		paddedScore = this.formatScore(score, 7);
		//console.log(score);
		this.scoreLabel.text = "SCORE: " +paddedScore;
		
		this.explodeSound.play();						//play the explosion sound
	}
	
	formatScore(number, size) {						//format the score with 0s. TODO: include format score if the score is negative, or don't allow negative scores.
		var stringNumber = String(number);
		while(stringNumber.length < (size || 2)) {
			stringNumber = "0" + stringNumber;
		}
      return stringNumber;
	}

    update() {									//phaser function that updates the scene
		
		if (this.cursors.left.isDown) {			//detect if a button is being pressed, move the player at the rate of the speed variable, play the directional animation
			this.player.setVelocityX(-speed);
			this.player.anims.play('left', true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(speed);
			this.player.anims.play('right', true);
		} else {
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			this.player.anims.play('still', true);
		};
		
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {		//if the space key has just been pushed, shoot a bullet and play the pew sound
			if (this.player.active) {
				this.shootBullet();
				this.pewSound.play();
			}
		}
		
		for (var i = 0; i < this.projectiles.getChildren().length; i++) {		//update the bullet's position
			var bullet = this.projectiles.getChildren()[i];
			bullet.update();
		}
		
		this.background.tilePositionY -=0.5;			//move the background... the player doesn't actually move (aside from left/right); the background moves and gives the illusion that
														//that player is. Video game magic.
		this.movePlane(this.zero1, 5);			//update the enemy's position. Each enemy has a different speed so they're not flying towards the player at the same rate. Makes the game
		this.movePlane(this.zero2, 7);			//slightly more challenging and less robotic.
		this.movePlane(this.zero3, 5);
		this.movePlane(this.zero4, 6);
    }
	
}