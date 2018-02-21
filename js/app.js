
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*200) + 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 505){
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Enemy and Player collison function   
    if(this.x < player.x + 60 &&
       this.x + 40 > player.x &&
       this.y < player.y + 30 &&
       this.y + 40 > player.y){
        player.gameReset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Will reset the player to the start
Player.prototype.gameReset = function(){
    this.x = 200;
    this.y = 380; 
    alert('Game over! press ENTER to play again');
};

Player.prototype.update = function(){
    if(this.y < 0){
        this.gameReset();
    }
    if(this.y > 380){
        this.y = 380;
    }
    if(this.x > 400){
        this.x = 400;
    }
    if(this.x < 0){
        this.x = 0;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch(keyPress){
        case 'left':
            this.x -= this.speed + 50;
        break;        
        case 'up':
            this.y -= this.speed + 30;
        break;        
        case 'right':
            this.x += this.speed + 50;
        break;        
        case 'down':
            this.y += this.speed + 30;
        break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// make the emenies appear on the screen in certain loction of the canvas
var enemyPosition = [60, 140, 220];
var player = new Player(200,380,50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random()*512));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
