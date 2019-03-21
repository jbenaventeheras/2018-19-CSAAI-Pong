function main()

{




	// create, initiate and append game canvas
	var canvas = document.getElementById('canvas')

	WIDTH  = 700,
	HEIGHT = 600,
	pi = Math.PI,
	UpArrow   = 38,
	DownArrow = 40,
	UpArrow2   = 65,
	DownArrow2 = 90,
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	/**
	 * The player paddle
	 *

	 */
	player = {
		x: null,
		y: null,
		width:  20,
		height: 100,
		/**
		 * Update the position depending on pressed keys
		 */
		update: function() {
			if (keystate[UpArrow]) this.y -= 5;
			if (keystate[DownArrow]) this.y += 7;
			// keep the paddle inside of the canvas
			this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
		},
		/**
		 * Draw the player paddle to the canvas
		 */
		draw: function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},
	/**
	 * The p2 paddle
	 */
	p2 = {


		x: null,
		y: null,
		width:  20,
		height: 100,
		/**
		 * Update the position depending on the ball position
		 */

		update: function() {
			// calculate ideal position


				var desty = ball.y - (this.height - ball.side)*0.5;
				// ease the movement towards the ideal position
				this.y += (desty - this.y) * 0.1;
				// keep the paddle inside of the canvas
				this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);



		},
		/**
		 * Draw the p2 paddle to the canvas
		 */
		draw: function() {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	},

}
