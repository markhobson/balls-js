function World(canvas, objects) {
	var self = this;
	self.context = canvas.getContext('2d');
	self.objects = objects;
	self.run = run;
	self.tick = tick;
	self.resize = resize;
	self.plot = plot;
	self.tickObjects = tickObjects;

	function run(fps) {
		var dt = 1000 / fps;
		setInterval(this.tick.bind(this), dt, dt);
	}

	function tick(dt) {
		this.resize();
		this.plot();
		this.tickObjects(dt);
	}
	
	function resize() {
		var canvas = this.context.canvas;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
	}

	function plot() {
		var canvas = this.context.canvas;
		this.context.clearRect(0, 0, canvas.width, canvas.height);

		this.objects.forEach(function (object) {
			object.plot(this.context);
		}, this);
	}

	function tickObjects(dt) {
		this.objects.forEach(function (object) {
			object.tick(dt, this.context);
		}, this);
	}
}
