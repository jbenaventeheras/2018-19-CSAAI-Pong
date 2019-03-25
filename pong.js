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
	var img_blok1 = new Image;
	var img_blok2 = new Image;

	img_blok1.src = 'tiex2.png';
	img_blok2.src = 'starwarsnves.png';

	background = new Image;
	randomBackgroung()

	/**
	 * The player paddle
	 *

	 */
	player = {
		x: null,
		y: null,
		width:  50,
		height: 100,
		/**
		 * Update the position depending on pressed keys
		 */
		update: function() {
			if (keystate[UpArrow]) this.y -= 7;
			if (keystate[DownArrow]) this.y += 7;
			// keep the paddle inside of the canvas
			this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
		},
		/**
		 * Draw the player paddle to the canvas
		 */
		draw: function() {
			ctx.drawImage(img_blok2, this.x, this.y, this.width, this.height);
		}
	},
	/**za
	 * The p2 paddle
	 */
	p2 = {


		x: null,
		y: null,
		width:  40,
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

			ctx.drawImage(img_blok1, this.x, this.y, this.width, this.height);

		}
	},
	/**
	 * The ball object
	 *

	 */
	ball = {

		x:   0,
		y:   0,
		vel: null,
		side:  15,
		speed: 2,
		/**
		 * Serves the ball towards the specified side
		 *
		 * @param  {number} side 1 right
		 *                       -1 left
		 */
		serve: function(side) {
			// set the x and y position
			var r = Math.random();
			this.x = side===1 ? player.x+player.width : p2.x - this.side;
			this.y = (HEIGHT - this.side)*r;
			// calculate out-angle, higher/lower on the y-axis =>
			// steeper angle
			var phi = 0.1*pi*(1 - 2*r);
			// set velocity direction and magnitude
			this.vel = {
				x: side*this.speed*Math.cos(phi),
				y: this.speed*Math.sin(phi)
			}
		},
		/**
		 * Update the ball position and keep it within the canvas
		 */
		update: function() {
			// update position with current velocity
			this.x += this.vel.x;
			this.y += this.vel.y;
			// check if out of the canvas in the y direction
			if (0 > this.y || this.y+this.side > HEIGHT) {
				// calculate and add the right offset, i.e. how far
				// inside of the canvas the ball is
				var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y+this.side);
				this.y += 2*offset;
				// mirror the y velocity
				this.vel.y *= -1;
			}
			// helper function to check intesectiont between two
			// axis aligned bounding boxex (AABB)
			var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
				return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
			};
			// check agp2nts target paddle to check collision in x
			// direction
			var pdle = this.vel.x < 0 ? player : p2;
			if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height,
					this.x, this.y, this.side, this.side)
			) {
				// set the x position and calculate reflection angle
				this.x = pdle===player ? player.x+player.width : p2.x - this.side;
				var n = (this.y+this.side - pdle.y)/(pdle.height+this.side);
				var phi = 0.25*pi*(2*n - 1); // pi/4 = 45
				// calculate smash value and update velocity
				var smash = Math.abs(phi) > 0.2*pi ? 1.5 : 1;
				this.vel.x = smash*(pdle===player ? 1 : -1)*this.speed*Math.cos(phi);
				this.vel.y = smash*this.speed*Math.sin(phi);
			}
			// reset the ball when ball outside of the canvas in the
			// x direction
			if (0 > this.x+this.side || this.x > WIDTH) {
				init();


			}






		},
		/**
		 * Draw the ball to the canvas
		 */
		draw: function() {
			ctx.fillRect(this.x, this.y, this.side, this.side);
		}
	};

	function randomBackgroung() {
		var backs = new Array('fondo.jpeg','fondo2.jpeg','fondo3.gif');
		var i = parseInt(Math.random()*backs.length);
		background.src = backs[i];
	}
	function drawBackground() {
		ctx.drawImage(background,0,0,800,600);
	}
	/**
	 * Starts the game
	 */

		keystate = {};
		// keep track of keyboard presses
		document.addEventListener("keydown", function(evt) {
			keystate[evt.keyCode] = true;
		});
		document.addEventListener("keyup", function(evt) {
			delete keystate[evt.keyCode];
		});
		/**
		 * Clear canvas and draw all game objects and net
		 */
		function draw() {
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			drawBackground()
			ctx.save();
			ctx.fillStyle = "red";
			ball.draw();
			player.draw();
			p2.draw();
			// draw the net
			var w = 4;
			var x = (WIDTH - w)*0.5;
			var y = 0;
			var step = HEIGHT/20; // how many net segments
			while (y < HEIGHT) {
				ctx.fillRect(x, y+step*0.25, w, step*0.5);
				y += step;
			}
			ctx.restore();
		}
			// dibujar el marcador
  function drawpoints(){
			score_1 = score_2 = 0
			ctx.save();
			ctx.shadowOffsetX = shadowOffsetY = 0;
			ctx.shadowBlur = 10;
			ctx.shadowColor = '#fff';
			ctx.font = '40px comic';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.verticalAlign = 'middle';
			ctx.fillText(score_1,20,30);
			ctx.fillText(score_2,660,30);
			ctx.restore();

			if(0 > this.x+this.side  ) {

				score_2 += 1;

					}
			if(this.x > WIDTH) {

				score_1 += 1;
			}
		}

	/**
	 * Initatite game objects and set start positions
	 */
	function init() {
		player.x = player.width;
		player.y = (HEIGHT - player.height)/2;
		p2.x = WIDTH - (player.width + p2.width);
		p2.y = (HEIGHT - p2.height)/2;
		ball.serve(1);
	}
	/**
	 * Update all game objects
	 */
	function update() {
		ball.update();
		player.update();
		p2.update();

	}


	var sacar = document.getElementById('sacar')

	  //-- Función de retrollamda del botón de sacar.
	  //-- ¡Que comience la animación!
	  sacar.onclick = () => {

	init(); // initiate game objects
	// game loop function
	var loop = function() {
		update();
		draw();
		drawpoints();
		window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}

    }
