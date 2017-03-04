/*
*	lissajous-uncurve
* 	a node.js tool for animating lissajous curves in the uncurvy ascii terminal
*
* 	by noah levenson 
*
* 	usage: node luncurve.js a b p [dx dy]
*
* 	a = angular frequency a
* 	b = angular frequency b
* 	p = initial phase
* 	dx = x damping constant (optional)
* 	dy = y damping constant (optional)
*/

var LISSAJOUS_UNCURVE = (function() {
    
    var screen = {

     	width: process.stdout.columns,

        height: process.stdout.rows,

        centerX: (function() {

            return Math.ceil(process.stdout.columns / 2);

        })(),

        centerY: (function() {

            return Math.ceil(process.stdout.rows / 2);
        
        })(),

    	cls: function() {

        process.stdout.write("\033c");

    	},

    	cursorTo: function(x, y) {

        process.stdout.write("\033[" + y + ";" + x + "H");
    
    	},

    	hideCursor: function() {

    		this.print("\033[?25l");

    	},

    	out: function(outString) {

        process.stdout.write(outString);

    	},

    	print: function(printString) {

        process.stdout.write(printString + "\n");

    	}

    };


    var animation = {

    	delay: 10,

    	step: 0.1

    };


    function LissajousCurve(a, b, p, dx, dy) {

        this.A = Math.ceil(screen.height - (screen.height * 0.2)) / 2;

        this.B = this.A;

        this.a = a;

        this.b = b;

        this.p = p;

        this.dx = dx;

        this.dy = dy;

        this.x = undefined;

        this.y = undefined;

        this.plot = function(t) {

			this.x = Math.ceil(this.A * Math.cos(this.a * t + this.p) ^ -this.dx * t);

            this.y = Math.ceil(this.B * Math.sin(this.b * t) ^ -this.dy * t);

            return { x: this.x, y: this.y };
        
        }

    }

    

    var figure = new LissajousCurve(2, 3, 0, 0);

    screen.hideCursor();

   	setInterval(function() {

    	screen.cls();

    	for (var t = 0; t < 2000; t += 1) {

    		screen.cursorTo(screen.centerX + figure.plot(t).x, screen.centerY + figure.plot(t).y);

    		screen.out("●");

    	}

    	figure.p += animation.step;

    }, animation.delay);

})();