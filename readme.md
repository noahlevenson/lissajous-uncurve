lissajous-uncurve

Responsively animate Lissajous curves in the uncurvy ASCII terminal

lissajous-uncurve generates and animates ASCII Lissajous curves in the command line environment.

Usage: node luncurve.js a b [dx dy p]

a = angular frequency a
b = angular frequency b
dx = x damping constant [optional]
dy = y damping constant [optional]
p = initial phase [optional]

The terminal window is responsive. Resize it during animation and the Lissajous figure will dynamically scale to fit by altering its A/B ampltiude values.

Note: Nonzero damping constants tend to generate figures too complex to usefully render in the limited resolution of the ASCII terminal.

Some figures to try:

2 1 

3 4 

3 4 0.003 

1 1

2 6

1 1 0.004 0.001