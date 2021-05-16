class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}
	
	preload() {														//Runs before the game starts. Loads all the game assets: music, sprites, images, fonts, etc.
		this.load.image("background", "assets/background.png");
		
		this.load.image("heart", "assets/heart.png");
		
		this.load.spritesheet('characterSheet', 'assets/p51.png', {		//each plane is loaded as a character sprite to support animation.
			frameWidth: 109,											//each frame is 109px wide; Phaser then extrapolates how many frames are in the animation based on how
			frameHeight: 97												//wide the image is. The images are 218px wide (excluding the P-51), meaning the animation is 2 frames (again,
		});																//excluding the P-51
		
		this.load.spritesheet('zero1', 'assets/zero.png', {				//all the enemy planes are the same, excluding color. This loads the normal zero with the standard camo.
			frameWidth: 108,
			frameHeight: 87
		});
		
		this.load.spritesheet('zero2', 'assets/zeroBlack.png', {		//loads zero two. not the anime character.
			frameWidth: 108,
			frameHeight: 87
		});
		
		this.load.spritesheet('zero3', 'assets/zeroWhite.png', {
			frameWidth: 108,
			frameHeight: 87
		});
		
		this.load.spritesheet('zero4', 'assets/zeroBrown.png', {
			frameWidth: 108,
			frameHeight: 87
		});
		
		this.load.spritesheet('bullet', 'assets/bullet.png', {
			frameWidth: 3,
			frameHeight: 7
		});
		
		this.load.spritesheet('zero4', 'assets/zeroBrown.png', {
			frameWidth: 108,
			frameHeight: 87
		});
		
		this.load.spritesheet("explosion", "assets/explosion1.png",{
			frameWidth: 108,
			frameHeight: 87
		});
		
		this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml");	//loading the font
		
		this.load.audio("audio_pew", ["assets/pew.ogg", "assets/pew.mp3"]);					//gun noises? check.
		this.load.audio("audio_explode", ["assets/explode.ogg", "assets/explode.mp3"]);		//explosion sounds? check.
		this.load.audio("audio_gameOver", ["assets/gameOver.ogg", "assets/gameOver.mp3"]);	//jumpscare? check.
		this.load.audio("music", ["assets/dangerZone.ogg", "assets/dangerZone.mp3"]);		//kick-ass background track? check.
			
    }
	
	create() {
		
		this.scene.start("playGame");
		
		this.anims.create ({												//anims.create creates the animations from the character sheets defined in preload()
			key: 'still',													//'still' specifies that this animation will be played when the character is not moving (no keys are pressed)
			frames: this.anims.generateFrameNumbers('characterSheet', {		//where the animation begins on the sprite sheet. This animation begins on the first frame and ends on the second.
				start: 0,
				end: 1
			}),
			frameRate: 40,													//how fast the animation is played.
			repeat: -1														//repeat on a loop
		});
		
		this.anims.create ({
			key: 'right',
			frames: this.anims.generateFrameNumbers('characterSheet', {
				start: 2,
				end: 3
			}),
			frameRate: 40,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'left',
			frames: this.anims.generateFrameNumbers('characterSheet', {
				start: 4,
				end: 5
			}),
			frameRate: 40,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'zero1',
			frames: this.anims.generateFrameNumbers('zero1', {
				start: 0,
				end: 1
			}),
			frameRate: 40,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'zero2',
			frames: this.anims.generateFrameNumbers('zero2', {
				start: 0,
				end: 1
			}),
			frameRate: 40,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'zero3',
			frames: this.anims.generateFrameNumbers('zero3', {
				start: 0,
				end: 1
			}),
			frameRate: 40,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'zero4',
			frames: this.anims.generateFrameNumbers('zero4', {
				start: 0,
				end: 1
			}),
			frameRate: 40,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'bullet_anim',
			frames: this.anims.generateFrameNumbers('bullet', {
				start: 0,
				end: 1
			}),
			frameRate: 20,
			repeat: -1
		});
		
		this.anims.create ({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', {
				start: 0,
				end: 3
			}),
			frameRate: 20,
			repeat: 0,
			hideOnComplete: true		//the animation should be hidden after it's finished.
		});
		
	}
}