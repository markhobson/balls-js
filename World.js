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
