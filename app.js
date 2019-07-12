(function (World, Ball) {
	var canvas = document.getElementById('app');
	var objects = randomBalls(10, canvas);
	new World(canvas, objects).run();

	function randomBalls(n, canvas) {
		var balls = new Array(n);
		for (var i = 0; i < balls.length; i++) {
			balls[i] = randomNonIntersectingBall(canvas, balls);
		}
		return balls;
	}
	
	function randomNonIntersectingBall(canvas, balls) {
		var ball;
		do {
			ball = randomBall(canvas);
		}
		while (intersecting(ball, balls));
		return ball;
	}
	
	function intersecting(ball, balls) {
		for (var i = 0; i < balls.length && balls[i] !== undefined; i++) {
			if (ball.isBallCollision(balls[i])) {
				return true;
			}
		}
		return false;
	}

	function randomBall(canvas) {
		var radius = 25 + Math.random() * 25;
		var x = radius + Math.random() * (canvas.width - 2 * radius);
		var y = radius + Math.random() * (canvas.height - 2 * radius);
		var dx = Math.random() - 0.5;
		var dy = Math.random() - 0.5;
		var color = '#' + parseInt(Math.random() * 0xFFFFFF).toString(16);

		return new Ball(x, y, radius, dx, dy, color);
	}
})(World, Ball);
