(function (Ball) {
	function World(canvas, balls) {
		var self = this;
		self.context = canvas.getContext('2d');
		self.balls = balls;
		self.run = run;
		self.tick = tick;
		self.plot = plot;
		self.animate = animate;
		
		function run() {
			setInterval(this.tick.bind(this), 10);
		}
		
		function tick() {
			this.plot();
			this.animate();
		}

		function plot() {
			var canvas = this.context.canvas;
			this.context.clearRect(0, 0, canvas.width, canvas.height);
			
			this.balls.forEach(function (ball) {
				ball.plot(this.context);				
			}, this);
		}
		
		function animate() {
			this.balls.forEach(function (ball) {
				ball.animate(this.context);	
			}, this);
		}
	}
	
	function App(canvas) {
		var self = this;
		self.world = new World(canvas, newBalls(canvas));
		self.run = run;
		
		function newBalls(canvas) {
			var balls = new Array(10);
			for (var i = 0; i < balls.length; i++) {
				balls[i] = newBall(canvas);
			}
			return balls;
		}
		
		function newBall(canvas) {
			var r = 25 + Math.random() * 25;
			var x = r + Math.random() * (canvas.width - 2 * r);
			var y = r + Math.random() * (canvas.height - 2 * r);
			var dx = 10 * Math.random() - 5;
			var dy = 10 * Math.random() - 5;
			var color = '#' + parseInt(Math.random() * 0xFFFFFF).toString(16);
			
			return new Ball(x, y, r, dx, dy, color);
		}
		
		function run() {
			this.world.run();
		}
	}
	
	new App(document.getElementById('app')).run();
})(Ball);
