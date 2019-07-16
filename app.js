import Ball from './Ball.js';
import World from './World.js';

window.onload = run;
	
function run() {
	var canvas = document.getElementById('app');
	var objects = randomBalls(10, canvas.clientWidth, canvas.clientHeight);
	new World(canvas, objects).run();		
}

function randomBalls(n, width, height) {
	var balls = new Array(n);
	for (var i = 0; i < balls.length; i++) {
		balls[i] = randomNonIntersectingBall(width, height, balls);
	}
	return balls;
}

function randomNonIntersectingBall(width, height, balls) {
	var ball;
	do {
		ball = randomBall(width, height);
	}
	while (intersecting(ball, balls));
	return ball;
}

function intersecting(ball, balls) {
	for (var i = 0; i < balls.length && balls[i] !== undefined; i++) {
		if (ball.isBallColliding(balls[i])) {
			return true;
		}
	}
	return false;
}

function randomBall(width, height) {
	var radius = 25 + Math.random() * 25;
	var x = radius + Math.random() * (width - 2 * radius);
	var y = radius + Math.random() * (height - 2 * radius);
	var dx = Math.random() - 0.5;
	var dy = Math.random() - 0.5;
	var color = '#' + parseInt(Math.random() * 0xFFFFFF).toString(16);

	return new Ball(x, y, radius, dx, dy, color);
}
