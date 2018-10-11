const row = 83;
const column = 101;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.start = column * -2;
    this.x = this.start;
    this.y = (row * 2.75) - (Math.floor(Math.random() * 3) * 83);
    this.speed = column * (Math.floor(Math.random() * 2) + (column*3));
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
    this.x += this.speed*dt;
    if (this.x > column*5){
        this.x = this.start;
        this.y = (row * 2.75) - (Math.floor(Math.random() * 3) * 83);
        this.speed = column * (Math.random() * 4);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Character = function(){
    this.sprite = 'images/char-boy.png';
    this.startCord = {
        x: 202,
        y: 404
    }
    this.score = 0;
    this.goal = -11;
    this.x = this.startCord.x;
    this.y = this.startCord.y;
    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    this.update = function(){
        if (this.y === this.goal){
            this.x = this.startCord.x;
            this.y = this.startCord.y;
            this.score += 20;
        }
    }
    this.handleInput = function(key){
        if (key === 'left' && this.x > (column * 0)){
            this.x -= column;
        }
        else if (key === 'right' && this.x < (column * 4)){
            this.x += column;
        }
        else if (key === 'up'){
            this.y -= row;
        }
        else if (key === 'down' && this.y < (row * 4)){
            this.y += row;
        }
    }
}

const Gem = function() {
    this.x = (row * 2.75) - (Math.floor(Math.random() * 3) * 83);
    this.y = (row * 2.75) - (Math.floor(Math.random() * 3) * 83);
    this.sprite = "images/Gem Green.png"
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    this.update = function(){}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Character();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const gem = new Gem();
const allEnemies = [enemy1,enemy2,enemy3,enemy4,enemy5];


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
