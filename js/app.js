//Constants used in the game - counting wins, lossing and checking if there was a collision with the enemy
const game = {
  wins: 0,
  losses: 0,
  hit: false
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  this.x += this.speed; //the speed of the enemy
  //when the enemy reaches the end of his line, it starts at line start again (for smoother animation it start before the line)
  if (this.x >= 505) {
    this.x = -100;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y + 22); //+22 is for the good position on the pavement, but enemy.y stays same as the player one
};

//Player
var Player = function() {
  this.sprite = 'images/char-boy.png'
  //start position of the player
  this.x = 200;
  this.y = 375;
};

Player.prototype.update = function(dt) {
  //player wins the game - reaches the water, starts back at the bottom and the counter for wins is incremented
  if (player.y == -40) {
    player.x = 200;
    player.y = 375;
    document.getElementById('wins').textContent = ++game.wins;
  }
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Moving the player by the user nad keyboard
Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case 'left':
      if (this.x >= 100) {
        this.x -= 100;
      }
      break;
    case 'up':
      if (this.y > 0) {
        this.y -= 83;
      }
      break;
    case 'right':
      if (this.x < 400) {
        this.x += 100;
      }
      break;
    case 'down':
      if (this.y < 350) {
        this.y += 83;
      }
      break;
  }
};

//Creating the enemies
const enemy1 = new Enemy(0, 43, 1);
const enemy2 = new Enemy(0, 126, 2);
const enemy3 = new Enemy(0, 209, 3);
const enemy4 = new Enemy(0, 43, 4);
const enemy5 = new Enemy(0, 126, 2.5);

//array of all enemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

//creating the player
const player = new Player();

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//Check collisions between player and enemies
function checkCollisions() {
  game.hit = false; //setting the game.hit
  for (const enemy of allEnemies) { //loop to check the collisions
    if ((enemy.y === player.y) && ((player.x - enemy.x) > -50) && ((player.x - enemy.x) < 50) && (enemy.x > 0)) {
      game.hit = true; //the collision was found = x and y of the player and enemy match
    }
  }
  if (game.hit == true) { //player lost the game - player stars at the bottom again and the counter of losses is incremented
    player.x = 200;
    player.y = 375;
    document.getElementById("losses").textContent = ++game.losses;
  }
}