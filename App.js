(function (World, Ball) {	
	function App(canvas) {
		var self = this;
		self.world = new World(canvas, newBalls(10, canvas));
		self.run = run;
		
		function newBalls(n, canvas) {
			var balls = new Array(n);
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
})(World, Ball);
