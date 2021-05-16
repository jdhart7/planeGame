/* *******************************************************************
Plane game created using the Phaser.js library. By John DeHart, 2020
TODO: add life/ammo pickups? add an ammo counter? fix the animation
when the player respawns (to have it come from off screen, rather than
appearing on the screen and moving forward slowly).
You can put this game on your own website, as long as I'm credited
and my website is linked: dehart.dev
********************************************************************** */

var config = {
    //type: Phaser.AUTO,
    width: 1300,								//width/height of the game area
    height: 700,
	scale: {
		parent: 'parent',
		mode: Phaser.Scale.FIT,					//maintain aspect ratio while fitting inside the specified canvas. Allows the canvas to be positioned easier
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1300,
		height: 700
	},
	backgroundColor: 0x888888,					//background color doesn't matter much because it only shows up when scene 2 is loading
	scene: [Scene1, Scene2],					//play scene 1 (the configuration file), then scene 2
	pixelArt: true,								//pixelArt boolean tells phaser to maintain pixels when scaling, rather than attempting to stretch the image like a JPEG
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
};

var speed = 800;								//global/default variables
var scale = 1;
var lives = 3;
var livesText;
var score = 0;
var paddedScore = 000000;
var game = new Phaser.Game(config);