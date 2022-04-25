class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("reset_button");
    this.resetButton.position(width / 2 + 230, 100);
  }

  play() {
    console.log("hi!!!")
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(pitch, 0, 0, width, height);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        players[index - 1].position.x = x;
        players[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("yellow");
          ellipse(x, y, 60, 60);
          if(players[index-1].displace(ball)){
            ball.x=players[index-1].x;
            ball.y=players[index-1].y
          }
        }
      }

      // handling keyboard events
      this.handlePlayerControls();

      drawSprites();
    }
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    red = createSprite(width / 2 - 50, height - 100);
    red.addImage("red", redTeam);
    red.scale = 0.2;

    white = createSprite(width / 2 + 100, height - 100);
    white.addImage("white", whiteTeam);
    white.scale = 0.2;

    players = [red, white];
    ball=createSprite(width/2,height/2)
    ball.addImage(soccerBall);
    ball.scale=0.1
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 3;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 2 - 550) {
      player.positionX -= 3;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 550) {
      player.positionX += 3;
      player.update();
    }

    if (keyIsDown(DOWN_ARROW)) {
      player.positionY -= 3;
      player.update();
    }
  }
}