function Ball(x, y, r, dx, dy, color) {
	var self = this;
	self.position = new Vector(x, y);
	self.r = r;
	self.velocity = new Vector(dx, dy);
	self.color = color;
	self.plot = plot;
	self.tick = tick;
	self.checkRectangleCollision = checkRectangleCollision;
	self.checkBallCollision = checkBallCollision;
	self.isBallCollision = isBallCollision;

	function plot(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.ellipse(this.position.x, this.position.y, this.r, this.r, 0, 0, 2 * Math.PI);
		context.fill();
	}

	function tick(dt) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}
	
	function checkRectangleCollision(rectangle) {
		var bounds = {
			x0: rectangle.x + this.r,
			y0: rectangle.y + this.r,
			x1: rectangle.x + rectangle.width - this.r,
			y1: rectangle.y + rectangle.height - this.r
		};

		if (this.position.x < bounds.x0) {
			this.velocity.x = -this.velocity.x;
			this.position.x = 2 * bounds.x0 - this.position.x;
		}

		if (this.position.x > bounds.x1) {
			this.velocity.x = -this.velocity.x;
			this.position.x = 2 * bounds.x1 - this.position.x;
		}

		if (this.position.y < bounds.y0) {
			this.velocity.y = -this.velocity.y;
			this.position.y = 2 * bounds.y0 - this.position.y;
		}

		if (this.position.y > bounds.y1) {
			this.velocity.y = -this.velocity.y;
			this.position.y = 2 * bounds.y1 - this.position.y;
		}		
	}
	
	function checkBallCollision(ball) {
		if (!this.isBallCollision(ball)) {
			return;
		}
		
		// obtain unit vector in direction of collision
		var d = this.position.sub(ball.position).unit();
		
		// calculate velocity components in direction of collision
		var v1d = this.velocity.dot(d);
		var v2d = ball.velocity.dot(d);

		// assuming same mass, switch direction of collision components
		// then calculate velocity delta
		var dv1 = d.scale(v2d - v1d);
		var dv2 = d.scale(v1d - v2d);
		
		// apply velocity deltas
		this.velocity = this.velocity.add(dv1);
		ball.velocity = ball.velocity.add(dv2);
	}
	
	function isBallCollision(ball) {
		var d = this.position.sub(ball.position);
		
		return d.mod() <= this.r + ball.r;
	}	
}
