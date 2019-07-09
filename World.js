function World(canvas, objects) {
	var self = this;
	self.context = canvas.getContext('2d');
	self.objects = objects;
	self.timestamp = null;
	self.run = run;
	self.tick = tick;
	self.resize = resize;
	self.plot = plot;
	self.tickObjects = tickObjects;

	function run() {
		requestAnimationFrame(this.tick.bind(this));
	}

	function tick(timestamp) {
		var dt = timestamp - (this.timestamp || timestamp);
		this.timestamp = timestamp;
		
		this.resize();
		this.plot();
		this.tickObjects(dt);
		
		this.run();
	}
	
	function resize() {
		var canvas = this.context.canvas;
		
		if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;			
		}
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
