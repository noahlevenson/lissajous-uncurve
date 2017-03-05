# lissajous-uncurve

Lissajous Uncurve is a command line toy for generating and responsively animating ASCII [Lissajous curves](https://en.wikipedia.org/wiki/Lissajous_curve).

Usage: 

```node luncurve.js a b [dx dy p]```

a = angular frequency a  
b = angular frequency b  
dx = x damping constant [optional]  
dy = y damping constant [optional]  
p = initial phase [optional]  

The Lissajous figure can be responsively scaled. Resize the terminal window and the amplitude values will adjust automatically.

Try:

node luncurve.js 2 1 

node luncurve.js 3 4 

node luncurve.js 3 4 0.003 

node luncurve.js 1 1

node luncurve.js 2 6

node luncurve.js 1 1 0.004 0.001

Note: Nonzero damping constants tend to generate figures too complex to usefully render in the limited resolution of the ASCII terminal.