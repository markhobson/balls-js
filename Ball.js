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
	self.checkBallCollision = checkBallCollision;
	self.isBallCollision = isBallCollision;

	function plot(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
		context.fill();
	}

	function tick(dt) {
		this.x += this.dx * dt;
		this.y += this.dy * dt;
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
	
	function checkBallCollision(ball) {
		if (!this.isBallCollision(ball)) {
			return;
		}
		
		// obtain unit vector in direction of collision
		var p1 = new Vector(this.x, this.y);
		var p2 = new Vector(ball.x, ball.y);
		var d = p1.sub(p2).unit();
		
		// calculate velocity components in direction of collision
		var v1 = new Vector(this.dx, this.dy);
		var v2 = new Vector(ball.dx, ball.dy);
		var v1d = v1.dot(d);
		var v2d = v2.dot(d);

		// assuming same mass, switch direction of collision components
		// then calculate velocity delta
		var dv1 = d.scale(v2d - v1d);
		var dv2 = d.scale(v1d - v2d);
		
		// apply velocity deltas
		this.dx += dv1.x;
		this.dy += dv1.y;
		ball.dx += dv2.x;
		ball.dy += dv2.y;
	}
	
	function isBallCollision(ball) {
		var p1 = new Vector(this.x, this.y);
		var p2 = new Vector(ball.x, ball.y);
		var d = p1.sub(p2);
		
		return d.mod() <= this.r + ball.r;
	}	
}
