/*
*	lissajous-uncurve
* 	responsively animate lissajous curves in the uncurvy ascii terminal
*
* 	by noah levenson 
*
* 	usage: node luncurve.js a b [dx dy p]
*
* 	a = angular frequency a
* 	b = angular frequency b
* 	dx = x damping constant [optional]
* 	dy = y damping constant [optional]
* 	p = initial phase [optional]
*/

var LISSAJOUS_UNCURVE = (function() {
    
    var screen = {

    	margin: .3,

     	getWidth: function() {

     		return process.stdout.columns;

     	},

        getHeight: function() {

        	return process.stdout.rows;

        },

        getCenter: function() {

        	var x = Math.ceil(this.getWidth() / 2);

        	var y = Math.ceil(this.getHeight() / 2);

        	return { x: x, y: y };

        },

        getMaxArea: function() {

        	var x = Math.ceil((this.getWidth() - (this.getWidth() * this.margin)) / 2);

        	var y = Math.ceil((this.getHeight() - (this.getHeight() * this.margin)) / 2);

        	return { x: x, y: y };

        },
        	
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

    	step: 0.1,

    	char: "●",

    	drawData: function(x, y) {

    		screen.cursorTo(x, y);

    		screen.out("amplitude A: " + figure.A);

    		screen.cursorTo(x, y += 1);

    		screen.out("amplitude B: " + figure.B);

    		screen.cursorTo(x, y += 1);

    		screen.out("angular freq a: " + figure.a);

    		screen.cursorTo(x, y += 1);

    		screen.out("angular freq b: " + figure.b);

    		screen.cursorTo(x, y += 1);

    		screen.out("damping const x: " + figure.dx);

    		screen.cursorTo(x, y += 1);

    		screen.out("damping const y: " + figure.dy);

    		screen.cursorTo(x, y += 1);

    		screen.out("phase: " + figure.p.toFixed(2));
    	
    	},

    	update: function() {

    		screen.cls();

    		screen.hideCursor();

    		animation.drawData(2, 2);

            var c = screen.getCenter();

    		for (var t = 0; t < 2000; t += 1) {

    			screen.cursorTo(c.x + figure.plot(t).x, c.y + figure.plot(t).y);

    			screen.out(animation.char);

    		}

    		figure.p += animation.step;

    	}

    };


    function LissajousCurve(a, b, p, dx, dy) {

        this.a = a;

        this.b = b;

        this.p = p;

        this.dx = dx;

        this.dy = dy;

        this.x = undefined;

        this.y = undefined;

        this.A = undefined;

        this.B = undefined;

        this.plot = function(t) {

            this.A = screen.getMaxArea().x;

            this.B = screen.getMaxArea().y;

            this.x = Math.ceil(this.A * Math.cos(this.a * t + this.p) ^ -this.dx * t);

            this.y = Math.ceil(this.B * Math.sin(this.b * t) ^ -this.dy * t);

            return { x: this.x, y: this.y };
        
        }

    }


    var args = process.argv;

    if (args.length < 4) {

    	screen.print("");

    	screen.print("Error: missing arguments");

    	process.exit();
    
    }

    else {

    	var a = args[2];

    	var b = args[3];

    	if (args[4] && !args[5]) {

    		var dx = args[4];

    		var dy = dx;

    	}

    	else if (args[4] && args[5]) {

    		var dx = args[4];

    		var dy = args[5];

    	}

    	else {

    		var dx = 0;

    		var dy = dx;
    	
    	}

    	if (args[6]) {

    		var p = parseInt(args[6], 10);

    	}

    	else {

    		var p = 0;

    	}

    	var figure = new LissajousCurve(a, b, p, dx, dy);

    	var intervalHandler = setInterval(animation.update, animation.delay);
    
    }

})();