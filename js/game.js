//Snake Game

var canavas = document.getElementById("screen");
var context = canavas.getContext("2d");
var sc = document.getElementById("score");
var score = 0;
var statusemgame = true;
var delay = 50;
var changeDirection = true;
var Position = function(x, y, d)
{
	this.x = x;
	this.y = y;
	this.d = d;
}

var keyPositions = [];

var snake = [];
var tail;

snake[0] = new Block();
head = snake[0];
tail = head;
var point = new Point();
document.addEventListener("keydown", apertouprabaixo);

function Block()
{
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;
	this.speed = 5;
	this.direction = "right";
}

Block.prototype.update = function(){
	if(this.direction === "right"){
		this.x += this.speed;
	}
	else if(this.direction === "left"){
		this.x -= this.speed;
	}
	else if(this.direction === "up"){
		this.y -= this.speed;
	}
	else if(this.direction === "down"){
		this.y += this.speed;
	}

	for(var i = 0; i < keyPositions.length; i++){
		var p = keyPositions[i];
		if(this.x >= p.x && this.x + this.width <= p.x + head.width &&
		this.y >= p.y && this.y + this.height <= p.y + head.height &&
		this != head){
			this.direction = p.d;
			if(this === tail){
				keyPositions.shift();
				
			}
		}
	}


	if(this.x > canavas.width){
		this.x = 0;
	}
	else if(this.x < 0){
		this.x = canavas.width - this.width;
	}
	else if(this.y > canavas.height){
		this.y = 0;
	}
	else if(this.y < 0){
		this.y = canavas.height - this.height;
	}

}

Block.prototype.draw = function(){
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fillStyle = "black";
	context.fill();
}


function Point(){
	this.x = Math.random() * canavas.width - 20;
	this.y = Math.random() * canavas.height - 20;
	if(this.x < 0) this.x = 0;
	if(this.y < 0) this.y = 0;
	this.width = 20;
	this.height = 20;

	this.draw = function(){
		context.beginPath();
		context.rect(this.x, this.y, this.width, this.height);
		context.fillStyle = "red";
		context.fill();
	}
}

function bateuintain(a, b){
	if(a.x < b.x + b.width && b.x < a.x + a.width &&
		b.y + b.width > a.y && b.y < a.y + a.height){
		return true;
	}
	else{
		return false;
	}
}



function loop(timestamp){
	if(statusemgame){
		requestAnimationFrame(loop);
		context.clearRect(0, 0, 800, 480);
		for(var i = 0, len = snake.length; i < len;i++){
			item = snake[i];
			item.update();
			item.draw();
			if(item != head && item != snake[1] && bateuintain(head, item)){
				statusemgame = false;
				var gameover = document.createElement("h1");
				gameover.innerHTML = "Game Over";
				document.body.insertBefore(gameover, sc);
				break;
			}
		}

		// for(var i = 0; i < keyPositions.length; i++){
		// 	var kp = keyPositions[i];
		// 	context.beginPath();
		// 	context.rect(kp.x, kp.y, 20, 20);
		// 	context.fillStyle = "blue";
		// 	context.fill();
		// }

		point.draw();
		if(bateuintain(point, head)){
			point = new Point();
			score++;
			var x, y, d;
			d = tail.direction;
			if(d == "right"){
				x = tail.x - tail.width;
				y = tail.y;
			}
			else if(d == "left"){
				x = tail.x + tail.width;
				y = tail.y;
			}
			else if(d == "up"){
				x = tail.x;
				y = tail.y + tail.width;
			}
			else if(d == "down"){
				x = tail.x;
				y = tail.y - tail.width;
			}
			block = new Block();
			block.x = x;
			block.y = y;
			block.direction = d;
			snake.push(block);
			tail = snake[snake.length-1];
			sc.innerHTML = "Score: " + score;
		}
	}
}


function apertouprabaixo(e) {
    var keyID = e.keyCode || e.which;
    var x, y;
	if(statusemgame)
	{
		//code pra cima
    if ((keyID === 38 || keyID === 87) && head.direction != "down" && head.direction != "up" && changeDirection) { //up arrow or W key   	
	    changeDirection = false;
		setTimeout(function(){
	    x = head.x;
	    y = head.y;
	    head.direction = "up";
	    if(snake.length > 1){
		    lastPosition = new Position(x, y, "up");
		    keyPositions.push(lastPosition);
		    
		}
        e.preventDefault();
		changeDirection = true;
        }, delay);
	}
	//code pra direita
    else if ((keyID === 39 || keyID === 68) && head.direction != "left" && head.direction != "right" && changeDirection) { //right arrow or D key
    	changeDirection = false;
		setTimeout(function(){
    	x = head.x;
    	y = head.y;
    	head.direction = "right";
        
        if(snake.length > 1){
	        lastPosition = new Position(x, y, "right");
	        keyPositions.push(lastPosition);
	       
	    }
        e.preventDefault();
		changeDirection = true;
        }, delay);
	}
	
	//code pra cima, codigo 40 pro w e 83 pra seta
    else if ((keyID === 40 || keyID === 83) && head.direction != "up" && head.direction != "down" && changeDirection) { //down arrow or S key
        changeDirection = false;
		setTimeout(function(){
        x = head.x;
    	y = head.y;
        head.direction = "down";
        if(snake.length > 1){
	        lastPosition = new Position(x, y, "down");
	        keyPositions.push(lastPosition);
	        
	    }
        e.preventDefault();
		changeDirection = true;
		}, delay);
    }
    else if ((keyID === 37 || keyID === 65) && head.direction != "right" && head.direction != "left" && changeDirection) { //left arrow or A key
        changeDirection = false;
		setTimeout(function(){
        x = head.x;
    	y = head.y;
        head.direction = "left";
        if(snake.length > 1){
	        lastPosition = new Position(x, y, "left");
	        keyPositions.push(lastPosition);
	        
	    }
        e.preventDefault();
		changeDirection = true;
        }, delay);
    }
	}
    if(keyID === 32){
    	statusemgame = !statusemgame;
    	if(statusemgame){
    		loop();
    	}
    	e.preventDefault();
    }

    
}

loop();