function World(canvas, objects) {
	var self = this;
	self.context = canvas.getContext('2d');
	self.objects = objects;
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
		
		this.objects.forEach(function (object) {
			object.plot(this.context);				
		}, this);
	}
	
	function animate() {
		this.objects.forEach(function (object) {
			object.animate(this.context);	
		}, this);
	}
}
