# lissajous-uncurve

Lissajous Uncurve is a command line tool for generating and responsively animating ASCII [Lissajous curves](https://en.wikipedia.org/wiki/Lissajous_curve).

Usage: 

`node luncurve.js a b [dx dy p]`

a = angular frequency a  
b = angular frequency b  
dx = x damping constant [optional]  
dy = y damping constant [optional]  
p = initial phase [optional]  

The Lissajous figure can be responsively scaled. Resize the terminal window and its amplitude values will adjust automatically.

Try:

`2 1` 

`3 4` 

`3 4 0.003`

`1 1`

`2 6`

`1 1 0.004 0.001`

Note: Nonzero damping constants tend to generate figures too complex to usefully render in the limited resolution of the ASCII terminal.