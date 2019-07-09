(function () {
	function Ball(x, y, r, dx, dy, color) {
		var self = this;
		self.x = x;
		self.y = y;
		self.r = r;
		self.dx = dx;
		self.dy = dy;
		self.color = color;
		self.plot = plot;
		self.animate = animate;
		
		function plot(context) {
			context.fillStyle = this.color;
			context.beginPath();
			context.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
			context.fill();
		}
		
		function animate(context) {
			this.x += this.dx;
			this.y += this.dy;
			
			var canvas = context.canvas;
			var bounds = {
				x0: this.r,
				y0: this.r,
				x1: canvas.width - this.r,
				y1: canvas.height - this.r
			};
			
			if (this.x < bounds.x0) {
				this.dx = -this.dx;
				this.x = 2 * bounds.x0 - this.x;
			}
			
			if (this.x > bounds.x1) {
				this.dx = -this.dx;
				this.x = 2 * bounds.x1 - this.x;
			}
			
			if (this.y < bounds.y0) {
				this.dy = -this.dy;
				this.y = 2 * bounds.y0 - this.y;
			}
			
			if (this.y > bounds.y1) {
				this.dy = -this.dy;
				this.y = 2 * bounds.y1 - this.y;
			}
		}
	}

	function App(canvas) {
		var self = this;
		self.context = canvas.getContext('2d');
		self.balls = newBalls();
		self.run = run;
		self.tick = tick;
		self.plot = plot;
		self.animate = animate;
		
		function newBalls() {
			var balls = new Array(10);
			for (var i = 0; i < balls.length; i++) {
				balls[i] = newBall();
			}
			return balls;
		}
		
		function newBall() {
			var canvas = self.context.canvas;
			var r = 25 + Math.random() * 25;
			var x = r + Math.random() * (canvas.width - 2 * r);
			var y = r + Math.random() * (canvas.height - 2 * r);
			var dx = 10 * Math.random() - 5;
			var dy = 10 * Math.random() - 5;
			var color = '#' + parseInt(Math.random() * 0xFFFFFF).toString(16);
			
			return new Ball(x, y, r, dx, dy, color);
		}
		
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
	
	new App(document.getElementById('app')).run();
})();
