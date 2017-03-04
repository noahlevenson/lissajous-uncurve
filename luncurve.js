/*
*	lissajous-uncurve
* 	a node.js tool for animating lissajous curves in the uncurvy ascii terminal
*
* 	by noah levenson 
*
* 	usage: node luncurve.js a b [p dx dy]
*
* 	a = angular frequency a
* 	b = angular frequency b
* 	p = initial phase [optional]
* 	dx = x damping constant [optional]
* 	dy = y damping constant [optional]
*/

var LISSAJOUS_UNCURVE = (function() {
    
    var screen = {

    	margin: 6,

     	width: function() {

     		return process.stdout.columns;

     	},

        height: function() {

        	return process.stdout.rows;

        },

        center: function() {

        	var x = Math.ceil(this.width() / 2);

        	var y = Math.ceil(this.height() / 2);

        	return { x: x, y: y };

        },

        max: function() {

        	var x = Math.ceil((this.width() - this.margin) / 2);

        	var y = Math.ceil((this.height() - this.margin) / 2);

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

    		screen.print("amplitude: " + figure.A);

    		screen.cursorTo(x, y += 1);

    		screen.print("angular freq a: " + figure.a);

    		screen.cursorTo(x, y += 1);

    		screen.print("angular freq b: " + figure.b);

    		screen.cursorTo(x, y += 1);

    		screen.print("damping const x: " + figure.dx);

    		screen.cursorTo(x, y += 1);

    		screen.print("damping const y: " + figure.dy);

    		screen.cursorTo(x, y += 1);

    		screen.print("phase: " + figure.p);
    	
    	}

    };


    function LissajousCurve(a, b, p, dx, dy) {

        this.A = screen.max().y;

        this.B = this.A;

        this.a = a;

        this.b = b;

        this.p = p;

        this.dx = dx;

        this.dy = dy;

        this.x = undefined;

        this.y = undefined;

        this.plot = function(t) {

        	this.A = screen.max().y;

        	this.B = this.A;

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

    	if (args[4]) {

    		var p = parseInt(args[4], 10);
    	
    	}

    	else {

    		var p = 0;

    	}

    	if (args[5] && !args[6]) {

    		var dx = args[5];

    		var dy = dx;

    	}

    	else if (args[5] && args[6]) {

    		var dx = args[5];

    		var dy = args[6];

    	}

    	else {

    		var dx = 0;

    		var dy = dx;
    	
    	}

    	var figure = new LissajousCurve(a, b, p, dx, dy);
    
    }


    

   

    screen.hideCursor();

   	setInterval(function() {

    	screen.cls();

    	animation.drawData(2, 2);

    	for (var t = 0; t < 2000; t += 1) {

    		var c = screen.center();

    		screen.cursorTo(c.x + figure.plot(t).x, c.y + figure.plot(t).y);

    		screen.out(animation.char);

    	}

    	figure.p += animation.step;

    }, animation.delay);

})();