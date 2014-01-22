var canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
    player1 = new Player(),
    //enemies = [],
    //numEnemies = 5,
    //obstacles = [],
    isPlaying = false,
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        },
    imgSprite = new Image();
imgSprite.src = "images/sprite2.png";
imgSprite.addEventListener("load", init, false);


function init() {
    document.addEventListener("keydown", function(e) { checkKey(e, true);}, false);
    document.addEventListener("keyup", function(e) { checkKey(e, false);}, false);
    //defineObstacles();
    //initEnemies();
    begin();
}

function begin() {
    ctxBg.drawImage(imgSprite, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    isPlaying = true;
    requestAnimFrame(loop);
}

function loop() {
    if (isPlaying) {
        update();
        draw();
        requestAnimFrame(loop);
    };
}

function update() {
    clearCtx(ctxEntities);
    //updateAllEnemies();
    player1.update();

}

function draw() {
    //drawAllEnemies();
    player1.draw();
}

// Clears canvas, called between frames.
function clearCtx (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function randomRange (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function Player() {
   this.srcX = 64;
    this.srcY = 600;
    this.width = 30;
    this.height = 30;
    this.drawX = 400;
    this.drawY = 300;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.speed = 1;
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    //this.isShooting = false;
    //var numBullets = 10;
    //this.bullets = [];
    //this.currentBullet = 0;
    //for (var i = 0; i < numBullets; i++) {
        //this.bullets[this.bullets.length] = new Bullet();
    //}
}

Player.prototype.update = function() {
    // Calculate new center of player sprite

    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.checkDirection();
    //this.checkShooting();
    //this.updateAllBullets();
};

Player.prototype.draw = function() {
    //this.drawAllBullets();
    ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, 
        this.width, this.height, this.drawX, this.drawY, this.width, this.height);

};

Player.prototype.checkDirection = function() {
    var newDrawX = this.drawX,
        newDrawY = this.drawY,
        obstacleCollision = false;
    if (this.isUpKey) {
        newDrawY -= this.speed;
        if (newDrawY % 10 == 1) {
            this.srcX = 0; // Facing north    
        }
        else {
            this.srcX = 30; // Facing north
        }     
    } else if (this.isDownKey) {
        newDrawY += this.speed;
        if (newDrawY % 10 == 1) {
            this.srcX = 60; // Facing south    
        }
        else {
            this.srcX = 90; // Facing south
        }
    } else if (this.isRightKey) {
        newDrawX += this.speed;
        if (newDrawX % 10 == 1) {
            this.srcX = 120; // Facing east    
        }
        else {
            this.srcX = 150; // Facing east
        }
    } else if (this.isLeftKey) {
        newDrawX -= this.speed;
        if (newDrawX % 10 == 1) {
            this.srcX = 190; // Facing west    
        }
        else {
            this.srcX = 220; // Facing west
        }
    };



    //obstacleCollision = this.checkObstacleCollide(newDrawX, newDrawY);

    if (!obstacleCollision && !outOfBounds(this, newDrawX, newDrawY)) {
        this.drawX = newDrawX;
        this.drawY = newDrawY;
    }
};

function checkKey(e, value) {
    var keyID = e.keyCode || e.which;
    if (keyID === 38) { // Up arrow
        player1.isUpKey = value;
        e.preventDefault();
    }
    if (keyID === 39) { // Right arrow
        player1.isRightKey = value;
        e.preventDefault();
    }
    if (keyID === 40) { // Down arrow
        player1.isDownKey = value;
        e.preventDefault();
    }
    if (keyID === 37) { // Left arrow
        player1.isLeftKey = value;
        e.preventDefault();
    }
    if (keyID === 32) { // Spacebar
        player1.isSpacebar = value;
        e.preventDefault();
    }
}

function outOfBounds(a, x, y) {
    var newBottomY = y + a.height,
        newTopY = y,
        newRightX = x + a.width,
        newLeftX = x,
        treeLineTop = 5,
        treeLineBottom = 570,
        treeLineRight = 750,
        treeLineLeft = 65;
    return newBottomY > treeLineBottom ||
        newTopY < treeLineTop ||
        newRightX > treeLineRight ||
        newLeftX < treeLineLeft;
}
