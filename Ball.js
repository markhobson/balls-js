function Ball(x, y, r, dx, dy, color) {
	var self = this;
	self.x = x;
	self.y = y;
	self.r = r;
	self.dx = dx;
	self.dy = dy;
	self.color = color;
	self.plot = plot;
	self.tick = tick;
	self.checkRectangleCollision = checkRectangleCollision;

	function plot(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
		context.fill();
	}

	function tick(dt, context) {
		this.x += this.dx * dt;
		this.y += this.dy * dt;

		var canvas = context.canvas;
		var rectangle = {x: 0, y: 0, width: canvas.width, height: canvas.height};
		this.checkRectangleCollision(rectangle);
	}
	
	function checkRectangleCollision(rectangle) {
		var bounds = {
			x0: rectangle.x + this.r,
			y0: rectangle.y + this.r,
			x1: rectangle.x + rectangle.width - this.r,
			y1: rectangle.y + rectangle.height - this.r
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
