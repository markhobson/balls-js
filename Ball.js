function Ball(x, y, radius, dx, dy, color) {
	var self = this;
	self.position = new Vector(x, y);
	self.radius = radius;
	self.mass = mass(radius, 1);
	self.velocity = new Vector(dx, dy);
	self.color = color;
	self.plot = plot;
	self.tick = tick;
	self.resolveRectangleCollision = resolveRectangleCollision;
	self.resolveBallCollision = resolveBallCollision;
	self.isBallColliding = isBallColliding;
	self.resolveBallIntersection = resolveBallIntersection;
	
	function mass(radius, density) {
		var volume = 4 * Math.PI * radius * radius * radius / 3;
		return volume * density;
	}

	function plot(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
		context.fill();
	}

	function tick(dt) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}
	
	function resolveRectangleCollision(rectangle) {
		var bounds = {
			x0: rectangle.x + this.radius,
			y0: rectangle.y + this.radius,
			x1: rectangle.x + rectangle.width - this.radius,
			y1: rectangle.y + rectangle.height - this.radius
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
	
	function resolveBallCollision(ball) {
		if (!this.isBallColliding(ball)) {
			return;
		}
		
		this.resolveBallIntersection(ball);
		
		// obtain unit vector in direction of collision
		var d = this.position.sub(ball.position).unit();
		
		// calculate velocity components in direction of collision
		// reduces problem to one dimension
		var u1 = this.velocity.dot(d);
		var u2 = ball.velocity.dot(d);

		// calculate new velocity components in direction of collision
		// using conservation of momentum and conservation of kenetic energy
		var m1 = this.mass;
		var m2 = ball.mass;
		var m = m1 + m2;
		var v1 = (m1 - m2) * u1 / m + (2 * m2 * u2) / m;
		var v2 = (2 * m1 * u1) / m + (m2 - m1) * u2 / m;
		
		// apply change in velocity
		this.velocity = this.velocity.add(d.scale(v1 - u1));
		ball.velocity = ball.velocity.add(d.scale(v2 - u2));
	}
	
	function isBallColliding(ball) {
		var d = this.position.sub(ball.position);
		
		return d.mod() <= this.radius + ball.radius;
	}
	
	function resolveBallIntersection(ball) {
		// solving |p2 - p1| = r1 + r2 for t
		var dp = this.position.sub(ball.position);
		var dv = this.velocity.sub(ball.velocity);
		var r = this.radius + ball.radius;
		
		// gives quadratic
		var a = dv.dot();
		var b = 2 * dp.dot(dv);
		var c = dp.dot() - r * r;
		
		// with earliest t
		var t = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
		
		// backtrack to point of intersection
		this.tick(t);
		ball.tick(t);
	}
}
