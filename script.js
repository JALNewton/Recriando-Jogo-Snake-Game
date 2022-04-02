let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let framesPerSecondByJosephAraujo = 100;
let snake = [];
let food = { 
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

let dir = "right";
snake[0] = { x: 8 * box, y: 8 * box }

function createBG()
{
	context.fillStyle = "lightgreen"; //def
	context.fillRect(0,0,16 * box, 16 * box);
}

function createSnake()
{
	for(x = 0; x < snake.length; x++)
	{
		context.fillStyle =  "blue";
		context.fillRect(snake[x].x, snake[x].y, box, box);
	}
}

function drawFood()
{
	context.fillStyle = "red";
	context.fillRect(food.x,food.y,box,box);
}

document.addEventListener('keydown', update);

function update(event)
{
	let ktecla = event.keyCode;
			
	if(ktecla == 37 && dir != "right") 
		dir = "left";
	if(ktecla == 39 && dir != "left")
		dir = "right";
	if(ktecla == 40 && dir != "up")
		dir = "down";
	if(ktecla == 38 && dir != "down")
		dir = "up";
}


function startGame()
{
	if(snake[0].x > 15 * box && dir == "right")
		snake[0].x = 0;
	if(snake[0].x < 0 * box && dir == "left")
		snake[0].x = 16 * box;
	if(snake[0].y > 15 * box && dir == "down")
		snake[0].y = 0;
	if(snake[0].y < 0 * box && dir == "up")
		snake[0].y = 16 * box;
	
	for(i = 1; i < snake.length; i++)
	{
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
		{
			clearInterval(game);
			alert('Game Over!! :(');			
		}
	}
	
	createBG();
	createSnake();
	drawFood();
	
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;	
	
	//controllers
	
	if(dir == "right")
		snakeX += box;
	if(dir == "left")
		snakeX -= box;
	if(dir == "up")
		snakeY -= box;
	if(dir == "down")
		snakeY += box;
	
	if(snakeX != food.x || snakeY != food.y)
	{
		snake.pop();
	}
	else
	{
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.y = Math.floor(Math.random() * 15 + 1) * box;
	}
	
	let newHead = 
	{
		x: snakeX,
		y: snakeY
	}
	
	snake.unshift(newHead);
}

let game = setInterval(startGame, framesPerSecondByJosephAraujo);