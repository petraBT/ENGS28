#!/usr/bin/env python3
"""Draw the Day 11 H-bridge family — one geometry, six states.

Writes six SVGs into assets/images/Day11-Motors/:

    hbridge-in1-in2.svg          the bridge and its two control lines
    hbridge-cur-out1-out2.svg    one conducting diagonal
    hbridge-cur-out2-out1.svg    the other
    hbridge-brake.svg            short brake
    hbridge-stop.svg             all four off, motor still drawn
    hbridge-shoot-through.svg    both switches on one side

Two things here are Petra's corrections and should not be "improved" back:

  * the MOSFET is drawn the way her own figures and the TB6612 datasheet draw
    it — gate bar on the OUTSIDE of the leg, then the channel bar, then the
    drain/source leads turning onto the leg wire, with the substrate arrow
    pointing into the channel for an N-channel and out of it for a P-channel.
    The right-hand column is MIRRORED, so its gates face right;
  * IN1 therefore brackets the two left gates from OUTSIDE the H, on the left,
    and IN2 brackets the two right gates from outside on the right — exactly
    as she annotated hbridge-in1-in2-ccw.png.  Not inside the legs.

The plain bridge carries no traced current path on purpose: act-day11-diagonal
asks students to find the conducting diagonals, and a figure must not answer a
discovery ahead of itself (P-15).

Her figures also draw each transistor's body diode.  We do not: the chapter
never mentions diodes, so four unexplained triangles would be asserting more
than the text supports.  Flip DIODES to True if she wants them.
"""
import os
import textwrap

OUT = 'assets/images/Day11-Motors'
DIODES = False

W, H = 800, 640
VM, GND = 90, 520                 # the two rails
RAIL_L, RAIL_R = 230, 610         # how far the rails run
XL, XR = 290, 510                 # the two leg wires
YU, YL = 190, 410                 # upper and lower device centres
MY = 305                          # the OUT1/OUT2 row
MX, MR = 400, 40                  # motor circle
GATE = 96                         # gate lead reaches this far off the leg
BRACKET = 136                     # control-line bracket, further out still

HEAD_T = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
 <defs>
  <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
   <path d="M0,0 L10,5 L0,10 z" fill="#c01c28"/></marker>
  <style>
   .wire{{stroke:#333;stroke-width:3;fill:none}}
   .rail{{stroke:#333;stroke-width:4;fill:none}}
   .dev {{stroke:#333;stroke-width:3;fill:none}}
   .off {{stroke:#9aa0a6;stroke-width:3;fill:none}}
   .cur {{stroke:#c01c28;stroke-width:5;fill:none}}
   .ctl {{stroke:#1a5fb4;stroke-width:2.5;fill:none}}
   .lbl {{font:bold 26px Helvetica,Arial,sans-serif;fill:#1a1a1a}}
   .sm  {{font:21px Helvetica,Arial,sans-serif;fill:#444}}
   .term{{font:bold 22px Helvetica,Arial,sans-serif;fill:#1a1a1a}}
   .ctlt{{font:bold 24px Helvetica,Arial,sans-serif;fill:#1a5fb4}}
   .st  {{font:bold 23px Helvetica,Arial,sans-serif;fill:#1a7f37}}
   .pbox{{stroke:#c01c28;stroke-width:3;fill:none}}
   .nbox{{stroke:#1a3fd0;stroke-width:3;fill:none}}
   .pt  {{font:bold 25px Helvetica,Arial,sans-serif;fill:#c01c28}}
   .nt  {{font:bold 25px Helvetica,Arial,sans-serif;fill:#1a3fd0}}
   .gt  {{font:bold 26px Helvetica,Arial,sans-serif;fill:#1a1a1a}}
  </style>
 </defs>
 <rect width="100%" height="100%" fill="#fff"/>
'''


def head(h):
    return HEAD_T.replace('{{', '{').replace('}}', '}').replace('{w}', str(W)).replace('{h}', str(h))


def mosfet(x, y, on, kind, side):
    """One MOSFET on the leg wire at x, centred on y.

    side is -1 for the left column (gate faces left) and +1 for the right
    column (gate faces right).  kind is 'N' or 'P', which sets only which way
    the substrate arrow points.  The leg wire is broken between the drain and
    source leads, so the device sits IN the leg rather than beside it.
    """
    c = 'dev' if on else 'off'
    fill = '#333' if on else '#9aa0a6'
    ch = x + side * 40                     # channel bar
    gb = x + side * 56                     # gate bar
    gl = x + side * GATE                   # gate lead ends here
    g = [f'<line class="{c}" x1="{x}" y1="{y-56}" x2="{x}" y2="{y-38}"/>',
         f'<line class="{c}" x1="{x}" y1="{y+38}" x2="{x}" y2="{y+56}"/>',
         f'<line class="{c}" x1="{ch}" y1="{y-38}" x2="{x}" y2="{y-38}"/>',
         f'<line class="{c}" x1="{ch}" y1="{y+38}" x2="{x}" y2="{y+38}"/>',
         f'<line class="{c}" x1="{ch}" y1="{y-38}" x2="{ch}" y2="{y+38}"/>',
         f'<line class="{c}" x1="{gb}" y1="{y-38}" x2="{gb}" y2="{y+38}"/>',
         f'<line class="{c}" x1="{gb}" y1="{y}" x2="{gl}" y2="{y}"/>']
    # Substrate lead and arrow: N points into the channel, P points out of it.
    tail, head = (x, ch) if kind == 'N' else (ch, x)
    d = 1 if head > tail else -1
    g.append(f'<line class="{c}" x1="{tail}" y1="{y}" x2="{head}" y2="{y}"/>')
    g.append(f'<path d="M{head},{y} L{head-d*17},{y-8} L{head-d*17},{y+8} z" '
             f'fill="{fill}" stroke="none"/>')
    if DIODES:
        xd = x - side * 46                 # body diode, cathode up, inside the leg
        g.append(f'<line class="dev" x1="{xd}" y1="{y-56}" x2="{xd}" y2="{y+56}"/>')
        g.append(f'<path d="M{xd},{y-22} L{xd-20},{y+22} L{xd+20},{y+22} z" fill="#333"/>')
        g.append(f'<line class="dev" x1="{xd-24}" y1="{y-22}" x2="{xd+24}" y2="{y-22}"/>')
    return '\n'.join(g)


def wrapped(text, x, y, cls='sm', size=21, width=W - 48):
    """A bottom note, wrapped to the canvas.  An unwrapped one ran off the right
    edge and the projector cut it mid-sentence."""
    cols = max(20, int(width / (size * 0.52)))
    out = []
    for i, line in enumerate(textwrap.wrap(text, cols)):
        out.append(f'<text class="{cls}" x="{x}" y="{y + i * (size + 6)}">{line}</text>')
    return '\n'.join(out), len(textwrap.wrap(text, cols))


def base(on, title, current=None, ctl=True, note=None, statelbl=None,
         devbox=False, dashed=False, legend=None):
    # The canvas grows to fit whatever sits under the drawing. A fixed height
    # silently cut the last lines of a long note off the bottom.
    note_y = GND + 84 + (34 * len(legend) if legend else 0)
    n_note = wrapped(note, 24, note_y)[1] if note else 0
    h = max(H, note_y + n_note * 27 + 10)
    s = [head(h)]
    s.append(f'<line class="rail" x1="{RAIL_L}" y1="{VM}" x2="{RAIL_R}" y2="{VM}"/>')
    s.append(f'<text class="lbl" x="{RAIL_R + 12}" y="{VM + 9}">VM</text>')
    s.append(f'<line class="rail" x1="{RAIL_L}" y1="{GND}" x2="{RAIL_R}" y2="{GND}"/>')
    s.append(f'<text class="lbl" x="{RAIL_R + 12}" y="{GND + 9}">GND</text>')
    # The leg wires, broken where the devices sit.
    for x in (XL, XR):
        s.append(f'<line class="wire" x1="{x}" y1="{VM}" x2="{x}" y2="{YU-56}"/>')
        s.append(f'<line class="wire" x1="{x}" y1="{YU+56}" x2="{x}" y2="{YL-56}"/>')
        s.append(f'<line class="wire" x1="{x}" y1="{YL+56}" x2="{x}" y2="{GND}"/>')
    s.append(mosfet(XL, YU, on['ul'], 'P', -1))
    s.append(mosfet(XR, YU, on['ur'], 'P', +1))
    s.append(mosfet(XL, YL, on['ll'], 'N', -1))
    s.append(mosfet(XR, YL, on['lr'], 'N', +1))
    # The motor across the two OUT nodes.
    s.append(f'<line class="wire" x1="{XL}" y1="{MY}" x2="{MX-MR}" y2="{MY}"/>')
    s.append(f'<line class="wire" x1="{MX+MR}" y1="{MY}" x2="{XR}" y2="{MY}"/>')
    s.append(f'<circle class="dev" cx="{MX}" cy="{MY}" r="{MR}" fill="#fff"/>')
    s.append(f'<text class="lbl" x="{MX-11}" y="{MY+10}">M</text>')
    s.append(f'<circle cx="{XL}" cy="{MY}" r="5" fill="#333"/>')
    s.append(f'<circle cx="{XR}" cy="{MY}" r="5" fill="#333"/>')
    # The activity talks about OUT1 and OUT2 constantly, so they carry weight,
    # the way they do in her own figures.
    s.append(f'<text class="term" x="{XL-16}" y="{MY-14}" text-anchor="end">OUT1</text>')
    s.append(f'<text class="term" x="{XR+16}" y="{MY-14}">OUT2</text>')
    if ctl:
        # IN1 brackets the two LEFT gates from outside the H, IN2 the two right.
        for lab, x, side, anchor in (('IN1', XL, -1, 'end'), ('IN2', XR, +1, 'start')):
            gl = x + side * GATE
            bx = x + side * BRACKET
            s.append(f'<line class="ctl" x1="{gl}" y1="{YU}" x2="{bx}" y2="{YU}"/>')
            s.append(f'<line class="ctl" x1="{gl}" y1="{YL}" x2="{bx}" y2="{YL}"/>')
            s.append(f'<line class="ctl" x1="{bx}" y1="{YU}" x2="{bx}" y2="{YL}"/>')
            s.append(f'<text class="ctlt" x="{bx + side * 14}" y="{(YU+YL)//2 + 8}" '
                     f'text-anchor="{anchor}">{lab}</text>')
    if devbox:
        # Her slide-10 annotation: the two upper devices boxed as pMOS, the two
        # lower as nMOS, with the gate of each marked g.
        for cls, tcls, y in (('pbox', 'pt', YU), ('nbox', 'nt', YL)):
            for x, side in ((XL, -1), (XR, +1)):
                # The near edge is 22 past the leg wire on the far side from
                # the gate, the far edge 22 past the gate lead. Writing the
                # near edge as x + 22 instead of x - side * 22 shifted the
                # right-hand boxes 22px right, so they were narrower than the
                # left pair and cut the leg side of both right-hand MOSFETs.
                near, far = x - side * 22, x + side * (GATE + 22)
                x0, x1 = min(near, far), max(near, far)
                s.append(f'<rect class="{cls}" x="{x0}" y="{y-72}" '
                         f'width="{x1-x0}" height="144" rx="3"/>')
                gx = x0 + 12 if side < 0 else x1 - 12
                anchor = 'start' if side < 0 else 'end'
                s.append(f'<text class="gt" x="{gx}" y="{y-18}" '
                         f'text-anchor="{anchor}">g</text>')
    if current:
        dash = ' stroke-dasharray="14 9"' if dashed else ''
        marker = '' if dashed else ' marker-end="url(#arw)"'
        s.append(f'<path class="cur" d="{current}"{dash}{marker}/>')
    s.append(f'<text class="lbl" x="24" y="42">{title}</text>')
    if statelbl:
        s.append(f'<text class="st" x="24" y="{GND + 46}">{statelbl}</text>')
    if legend:
        for i, (text, cls) in enumerate(legend):
            s.append(f'<text class="{cls}" x="24" y="{GND + 46 + i * 34}">{text}</text>')
    if note:
        s.append(wrapped(note, 24, note_y)[0])
    s.append('</svg>')
    return '\n'.join(s)


ALLOFF = {'ul': 0, 'ur': 0, 'll': 0, 'lr': 0}
ALLON = {'ul': 1, 'ur': 1, 'll': 1, 'lr': 1}


def mk(name, **kw):
    open(os.path.join(OUT, name), 'w').write(base(**kw))
    print('wrote', name)


def leg_down(x, through_upper=True, through_lower=True, y_from=None, y_to=None):
    """A current trace down one leg, broken where it passes through a device."""
    y0 = VM + 6 if y_from is None else y_from
    y1 = GND - 6 if y_to is None else y_to
    parts, y = [], y0
    for centre, through in ((YU, through_upper), (YL, through_lower)):
        if centre - 56 < y1 and centre + 56 > y0 and through:
            parts.append(f'M{x},{y} L{x},{centre-56}')
            y = centre + 56
    parts.append(f'M{x},{y} L{x},{y1}')
    return ' '.join(parts)


# 0. what the four switches ARE, before any control line is drawn: her slide 10.
mk('hbridge-pmos-nmos.svg', on=ALLON, ctl=False, devbox=True,
   title='',
   legend=[('pMOS power transistors, ON when the gate input is LOW', 'pt'),
           ('nMOS power transistors, ON when the gate input is HIGH', 'nt')])

# 1. the plain bridge and its control lines — no current traced (P-15)
mk('hbridge-in1-in2.svg', on=ALLON,
   title='The H-bridge, and its two control lines',
   note='Each control line drives both gates on its side; the upper switch conducts '
        'when its gate is LOW, the lower when it is HIGH.')

# 2. and 3. the two conducting diagonals
cur_a = (leg_down(XL, y_to=MY) + f' L{MX-MR},{MY} M{MX+MR},{MY} L{XR},{MY} '
         + leg_down(XR, through_upper=False, y_from=MY))
mk('hbridge-cur-out1-out2.svg', on=dict(ul=1, ur=0, ll=0, lr=1),
   title='IN1 LOW, IN2 HIGH', current=cur_a,
   statelbl='Current runs OUT1 → motor → OUT2')

cur_b = (leg_down(XR, y_to=MY) + f' L{MX+MR},{MY} M{MX-MR},{MY} L{XL},{MY} '
         + leg_down(XL, through_upper=False, y_from=MY))
mk('hbridge-cur-out2-out1.svg', on=dict(ul=0, ur=1, ll=1, lr=0),
   title='IN1 HIGH, IN2 LOW', current=cur_b,
   statelbl='Current runs OUT2 → motor → OUT1')

# 4. short brake: both lower switches on, both terminals tied at ground
cur_br = (f'M{XL},{MY} L{XL},{YL-56} M{XL},{YL+56} L{XL},{GND-6} L{XR},{GND-6} '
          f'L{XR},{YL+56} M{XR},{YL-56} L{XR},{MY}')
mk('hbridge-brake.svg', on=dict(ul=0, ur=0, ll=1, lr=1),
   title='Short brake', current=cur_br, dashed=True,
   statelbl='Both terminals tied together at ground',
   note='Dashed, and with no arrow: which way the generator current runs depends on which '
        'way the shaft was turning.')

# 5. stop: all four off, and the motor still drawn
mk('hbridge-stop.svg', on=ALLOFF, title='Stop',
   statelbl='All four switches off, both terminals floating',
   note='Nothing connects the motor to anything, so no current can flow and the '
        'shaft coasts.')

# 6. shoot-through: both switches on one side
mk('hbridge-shoot-through.svg', on=dict(ul=0, ur=1, ll=0, lr=1),
   title='Shoot-through', current=leg_down(XR),
   statelbl='Both switches on one side conducting at once',
   note='The supply is shorted to ground through the two switches, bypassing the '
        'motor entirely.')
