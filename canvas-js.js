function main()
{

  //-- Crear el canvas
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;
  UpArrow   = 38;
  DownArrow = 40;
  pi = Math.PI;

  //-- Obtener el contexto del canvas
  var ctx = canvas.getContext("2d");
  texto = document.getElementById('texto')

  window.onkeydown = (e) => {

      //-- Eliminar comportamiento predeterminado de la tecla
      e.preventDefault();

      //-- Mostrar la info de la tecla: Nombre y código
      texto.innerHTML = "Tecla apretada: " + e.key + ' ' +
                        "Código: " + e.keyCode
    }





  //-- Raquetas
  var raquetas = {


    //-- Posición inicial de la pelota
    x_pala1: 50,
    y_pala1: 100,
    x_pala2: 500,
    y_pala2: 100,

    //-- Dimensiones de la Bola
    width_palas: 10,
    height_palas: 40,
    ctx: null,

    init: function(ctx) {
      this.ctx = ctx;

    },

    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x_pala1, this.y_pala1, this.width_palas, this.height_palas)
      this.ctx.fillRect(this.x_pala2, this.y_pala2, this.width_palas, this.height_palas)

    }



    }
    raquetas.init(ctx)
    raquetas.draw()
    player = {
    	x: null,
    	y: null,
    	width:  20,
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
    		ctx.fillRect(this.x, this.y, this.width, this.height);
    	}
    }

  //-- Definir el objeto BOLA
  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 50,

    //-- Dimensiones de la Bola
    width: 5,
    height: 5,

    //-- Coornenadas
    x : 0,
    y : 0,

    //-- Velocidad
    vx : 4,
    vy : 1,

    //-- Contexto
    ctx: null,

    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },

    //-- Dibujar
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },

    //-- Update
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },

    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  //-- Inicializar y pintar la bola
  bola.init(ctx)
  bola.draw()

  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;

  //-- Boton de salcar
  var sacar = document.getElementById('sacar')

  //-- Función de retrollamda del botón de sacar.
  //-- ¡Que comience la animación!
  sacar.onclick = () => {

    //-- Si la bola ya se está animando,
    //-- no hacer nada
    if (!timer) {

      //-- Lanzar el timer. Su funcion de retrollamada la definimos
      //-- en su primer parámetro
      timer = setInterval(()=>{

        //-- Esto se ejecuta cada 20ms

        //-- Actualizar la bola
        bola.update();

        //-- Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //-- Dibuar la bola
        bola.draw();
        raquetas.draw();
        player.draw();


        //-- Si la bola llega a la parte derecha del canvas:
        //-- Terminar
        if (bola.x > canvas.width) {

          //-- Eliminar el timer
          clearInterval(timer)
          timer = null;

          //-- Bola a su posicion inicial
          bola.reset();

          //-- Dibujar la bola en pos. inicial
          bola.draw();
          raquetas.draw();
        }
      },20); //-- timer
    }
  } //-- Fin onclick
}
