var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount = 0;
var red, white;
var players;
var gameState = 0;
var allPlayers;
var position;
var ball
function preload() {
  backgroundImage = loadImage("assets/background.png");
  redTeam = loadImage("assets/redTeam.png");
  whiteTeam = loadImage("assets/whiteTeam.png");
  soccerBall = loadImage("assets/soccerBall.png");
  pitch = loadImage("assets/soccerpitch.png");
  boost = loadImage("assets/boost-icon.png");
  defender = loadImage("assets/Defender.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
