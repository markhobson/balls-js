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
		var p1 = [this.x, this.y];
		var p2 = [ball.x, ball.y];
		var d = unit(sub(p1, p2));
		
		// calculate velocity components in direction of collision
		var v1 = [this.dx, this.dy];
		var v2 = [ball.dx, ball.dy];
		var v1d = dot(v1, d);
		var v2d = dot(v2, d);

		// assuming same mass, switch direction of collision components
		// then calculate velocity delta
		var dv1 = scale(d, v2d - v1d);
		var dv2 = scale(d, v1d - v2d);
		
		// apply velocity deltas
		this.dx += dv1[0];
		this.dy += dv1[1];
		ball.dx += dv2[0];
		ball.dy += dv2[1];
	}
	
	function isBallCollision(ball) {
		var p1 = [this.x, this.y];
		var p2 = [ball.x, ball.y];
		var d = sub(p1, p2);
		
		return mod(d) <= this.r + ball.r;
	}
	
	function add(u, v) {
		return [u[0] + v[0], u[1] + v[1]];
	}
	
	function sub(u, v) {
		return [u[0] - v[0], u[1] - v[1]];
	}
	
	function scale(v, scalar) {
		return [v[0] * scalar, v[1] * scalar];
	}
	
	function unit(v) {
		return scale(v, 1 / mod(v));
	}
	
	function mod(v) {
		return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	}
	
	function dot(u, v) {
		return u[0] * v[0] + u[1] * v[1];
	}
}
