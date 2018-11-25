const row = 83;
const col = 101;

const reset = document.querySelector(".reset");

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.randomSpeed = function(min, max) {
        return col * (Math.round(Math.random() * (max - min) + min));
    }
    this.randomRow = function() {
        return ((row * 3) - (Math.floor(Math.random() * 3) * row) - this.offset);
    }

    this.start = col * -2;
    this.x = this.start;
    this.y = this.randomRow();
    this.speed = this.randomSpeed(1, 4);
    this.height = row;
    this.width = col;
    this.offset = 11;
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
    this.collision = function(collide){
        if (collide){
            player.x = player.startCord.x;
            player.y = player.startCord.y;
            if (player.score - 40 >= 0) {
                player.score -= 40;
            } else if (player.score < 40) {
                player.score = 0;
            }
            player.view.updateScore();
        }
    }

    this.range = (
        player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y)

    this.x += this.speed*dt;
    if (this.x > col*5){
        this.x = this.start;
        this.y = this.randomRow();
        this.speed = this.randomSpeed(1, 4);
    }

    this.collision(this.range);
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
        x: col * 2,
        y: col * 4
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
            this.score += 20;
            this.view.updateScore();
            this.placement();
            if (this.score >= 500) {
                return this.victory(true);
            }
        }
    }
    this.handleInput = function(key){
        if (key === 'left' && this.x > (col * 0)){
            this.x -= col;
        }
        else if (key === 'right' && this.x < (col * 4)){
            this.x += col;
        }
        else if (key === 'up'){
            this.y -= row;
        }
        else if (key === 'down' && this.y < (row * 4)){
            this.y += row;
        }
    }
    this.placement = function(){
        this.x = this.startCord.x;
        this.y = this.startCord.y;
    }

    this.view = {
        score: document.querySelector(".score__num"),
        winScreen: document.querySelector(".win-screen"),

        updateScore: function(){
            this.score.textContent = player.score;
        },
        showWin: function(){
            this.winScreen.classList.remove("close");
        },
        hideWin: function(){
            this.winScreen.classList.add("close");
        }
    }
    
    this.victory = function(state){
        if(state){
            this.placement();
            gameTime.stop();
            this.view.showWin();
        } else {
            this.score = 0;
            this.placement();
            this.view.updateScore();
            this.view.hideWin();
            gameTime.stop();
            gameTime.start();
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Character();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1,enemy2,enemy3];


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

var Timer = function() {
    this.time = 0;
    this.tick;
    this.viewBar = document.querySelector(".time__num");
    this.viewRecord = document.querySelector(".record");
    this.start = function () {
        this.tick = setInterval(() => {
            this.time++;
            this.viewBar.textContent = this.time;
            this.viewRecord.textContent = this.time;
        }, 1000);
    }
    this.stop = function(){
        clearInterval(this.tick);
        this.time = 0;
    }
}

const gameTime = new Timer();
gameTime.start();

reset.addEventListener("click", function(){
    player.victory(false);
});