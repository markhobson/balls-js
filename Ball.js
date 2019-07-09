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
