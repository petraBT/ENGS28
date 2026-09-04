#!/usr/bin/env python3
"""Check that each starter file's CODE matches the book listing it comes from.

The handout and the book are deliberately different documents.  A student who
opens the .c file alone gets Petra's fuller commentary -- the reason behind
each constant, a label on every step -- while the book's listing stays
compressed enough to read on a page and condense onto a slide (B-2, S-9).

What must NEVER differ is the code.  A student comparing their download
against the book should find the same program, line for line.  This script
strips comments and blank lines from both and compares what is left, so the
commentary can grow freely and a real edit to one side cannot drift silently.

    python3 scripts/check_starters.py

Add a pair by listing it in STARTERS: the starter file, the chapter, and a
snippet that appears in the matching <program> block (and nowhere earlier).

Some starters are LIBRARIES the book only ever quotes in part -- i2c.c is
printed as i2c1_init() in full and as the sending half of i2c1_byteWrite().
Those go in FRAGMENTS instead, which compares one function of the file against
one <program> block.  This exists because a claim about i2c1_memRead() reached
a committee review having been reconstructed from a 2023 lecture deck rather
than read off the file, and was wrong.
"""

import re
import sys
import os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (starter file, chapter, a marker unique to the intended <program> block)
STARTERS = [
    ("assets/starters/blinkyTimerPolled.c", "source/ch-timers-interrupts.ptx",
     "// Could do other stuff here, like poll a button."),
    ("assets/starters/blinkyTimerInt.c", "source/ch-timers-interrupts.ptx",
     "TODO 4a"),
    ("assets/starters/ADCPot.c", "source/ch-adc.ptx",
     "TODO 5 -- wait until the conversion has finished"),
    ("assets/starters/counterResetButtonPolled.c", "source/ch-gpio-interrupts.ptx",
     "    int buttonPushed;"),
    ("assets/starters/counterResetButtonInt.c", "source/ch-gpio-interrupts.ptx",
     "TODO 1a"),
    ("assets/starters/helloDisplay.c", "source/ch-i2c.ptx",
     "// Wake the display up, then fill its display RAM"),
    ("assets/starters/writeFirstDigit.c", "source/ch-i2c.ptx",
     "uint8_t display_subaddr = 0;"),
    ("assets/starters/SevenSegPartial.c", "source/ch-i2c.ptx",
     "TODO 4 -- one call."),
    # Day 13's link test.  The file's stale "Table 13" comment was corrected
    # to Table 22 with Petra's approval (2026-08-30), so book and starter
    # comments agree; the CODE is what this pair checks either way.
    ("assets/starters/whoami_test.c", "source/ch-accelerometers.ptx",
     "who_am_i = lsm303_AccelRegisterRead(LSM303_WHO_AM_I_A);"),
    # Day 14 Part 5 reads accel_test.c whole before running it.
    ("assets/starters/accel_test.c", "source/ch-accelerometers.ptx",
     "accel_raw_x=%x"),
    # Day 15 Part 4 prints Petra's servo template whole, with its five blank
    # #define lines and its blank map line;
    # the completed version is an <instructor> excerpt and matches no marker
    # below.  The marker is the blank map line (tabs, then the comment).
    ("assets/starters/Day15_servo_template.c", "source/ch-servos.ptx",
     "pwm_value =\t     \t\t// Map pot_value to pwm_value"),
    # Day 15's Reference section prints tim.c whole (comments compressed in the
    # tim16 function); Part 4 prints two of its functions, which are FRAGMENTS.
    ("assets/starters/tim.c", "source/ch-servos.ptx",
     "#define TIM16_PSC_FACTOR"),
]

# (starter file, function name in it, chapter, marker in the <program> block)
# For libraries the book quotes function by function rather than whole.
FRAGMENTS = [
    ("assets/starters/i2c.c", "i2c1_init", "source/ch-i2c.ptx",
     "RCC->IOPENR |= RCC_IOPENR_GPIOBEN;"),
    # TTmotor_ramp.c is the Day 11x driver.  The book quotes the two PWM
    # functions; the ramp state machine in main() is read from the file, not
    # reprinted, so this is a FRAGMENTS pair rather than a whole-file one.
    # tim14_pa7_pwm_init() is projected in two halves -- the pin, then the timer --
    # so the pair of markers is compared against the one function.
    ("assets/starters/TTmotor_ramp.c", "tim14_pa7_pwm_init", "source/ch-motors.ptx",
     ("// Set PA7 alternate function type (AF4, 0100)",
      "// Set the compare register value - start with a speed of 0",
      "// Generate an update event - this clears counter, prescaler counter, updates registers")),
    ("assets/starters/TTmotor_ramp.c", "tim14_pwm_set", "source/ch-motors.ptx",
     "// Safety first: Allow no pulse values outside the (0, PWM_TIMER_MAX-1 range!"),
    # sysinit.c ships in every project and had never been opened in the book
    # until Day 12's Part 4, which is where milliseconds() is finally explained.
    # The chapter prints SysTickInit() in full; the counter and the accessor are
    # printed beside it in their own block.
    ("assets/starters/sysinit.c", "SysTickInit", "source/ch-motors.ptx",
     "// Assumes 12MHz clock...could be better"),
    # Day 13 Part 5's code walk projects i2c1_memRead() in two halves --
    # sl-day13-memread-write (the first transaction) and sl-day13-memread-read
    # (the second) -- the way Day 11x split tim14_pa7_pwm_init().  The pair of
    # markers is concatenated and compared against the one function, so the
    # slide copies must keep matching the library.
    ("assets/starters/i2c.c", "i2c1_memRead", "source/ch-accelerometers.ptx",
     ("// Ping target address for writing 1 byte (the register address)",
      "// Restart, with read request for n bytes")),
    # Day 13x Part 4 prints lsm303_AccelReadRaw() in the book (and condenses
    # it on sl-day13x-readraw); the code must keep matching her
    # lsm303agr_partial.c.  The marker is the auto-increment read call.
    ("assets/starters/lsm303agr_partial.c", "lsm303_AccelReadRaw",
     "source/ch-accelerometers.ptx",
     "i2c1_memRead(LSM303_ADDRESS_ACCEL, LSM303_OUT_X_L_A | (1<<7), 6, &data[0]);"),
    # Day 14 Part 4 prints the two unfinished pieces of lsm303agr_partial.c
    # as the file ships them: RegisterWrite's blank body, and AccelInit with
    # its two register-value blanks (the filled versions are <instructor>
    # blocks, deliberately different, and no marker below matches them).
    ("assets/starters/lsm303agr_partial.c", "lsm303_AccelRegisterWrite",
     "source/ch-accelerometers.ptx",
     "// complete this function"),
    ("assets/starters/lsm303agr_partial.c", "lsm303_AccelInit",
     "source/ch-accelerometers.ptx",
     "// Check the WHOAMI register"),
    # Day 15's timer driver, tim.c (Petra, 2026-09-03; ARR/CCR1 convention fixed
    # at her request the same day).  Part 4 prints tim14_pwm_set() and
    # tim16_ms_interrupt_init(); the Reference section prints the whole file,
    # as a STARTERS pair above; the two Part 4 functions are checked here.
    ("assets/starters/tim.c", "tim14_pwm_set", "source/ch-servos.ptx",
     "// PWM mode 1: pin is HIGH while CNT < CCR1, i.e. for exactly 'value' counts"),
    ("assets/starters/tim.c", "tim16_ms_interrupt_init", "source/ch-servos.ptx",
     "/* Enable timer interrupt in NVIC */"),
]


def function_body(text, name):
    """The lines of one C function definition, brace-matched."""
    m = re.search(r"^[A-Za-z_][\w \*]*\b" + re.escape(name) + r"\s*\([^)]*\)\s*\{",
                  text, flags=re.M)
    if not m:
        return None
    depth, i = 0, m.end() - 1
    while i < len(text):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[m.start():i + 1]
        i += 1
    return None


def code_only(text):
    """The executable skeleton: no comments, no blank lines, no indentation."""
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)   # block comments
    text = re.sub(r"//[^\n]*", "", text)                # line comments
    return [ln.strip() for ln in text.split("\n") if ln.strip()]


def listing(chapter_text, marker):
    blocks = re.findall(
        r"<program language=\"c\"><code><!\[CDATA\[(.*?)\]\]></code></program>",
        chapter_text, flags=re.S)
    hits = [b for b in blocks if marker in b]
    if not hits:
        return None
    return hits[0]


def main():
    problems = 0
    for rel_starter, rel_chapter, marker in STARTERS:
        starter = os.path.join(REPO, rel_starter)
        chapter = os.path.join(REPO, rel_chapter)
        if not os.path.exists(starter):
            print(f"  MISSING  {rel_starter}")
            problems += 1
            continue
        block = listing(open(chapter).read(), marker)
        if block is None:
            print(f"  NO LISTING  {rel_starter}: no <program> in "
                  f"{rel_chapter} contains {marker!r}")
            problems += 1
            continue

        want, got = code_only(block), code_only(open(starter).read())
        if want == got:
            print(f"  ok  {rel_starter}  ({len(got)} code lines match "
                  f"{os.path.basename(rel_chapter)})")
            continue

        problems += 1
        print(f"  DRIFT  {rel_starter} vs {rel_chapter}")
        import difflib
        for line in difflib.unified_diff(want, got, "book", "starter",
                                         lineterm="", n=1):
            if line.startswith(("+", "-")) and not line.startswith(("+++", "---")):
                print(f"        {line}")

    for rel_starter, func, rel_chapter, marker in FRAGMENTS:
        starter = os.path.join(REPO, rel_starter)
        chapter = os.path.join(REPO, rel_chapter)
        if not os.path.exists(starter):
            print(f"  MISSING  {rel_starter}")
            problems += 1
            continue
        # A marker may be a tuple of markers, when one function is projected
        # across two <program> blocks -- a long init split into "the pin" and
        # "the timer", the way Petra's own Day 11x slide 10 splits it.  The
        # blocks are concatenated in the order given and compared as one.
        chapter_text = open(chapter).read()
        markers = marker if isinstance(marker, tuple) else (marker,)
        blocks = [listing(chapter_text, m) for m in markers]
        block = None if any(b is None for b in blocks) else "\n".join(blocks)
        real = function_body(open(starter).read(), func)
        if block is None or real is None:
            print(f"  NO LISTING  {rel_starter}:{func}()")
            problems += 1
            continue
        want, got = code_only(block), code_only(real)
        if want == got:
            print(f"  ok  {rel_starter}:{func}()  ({len(got)} code lines match "
                  f"{os.path.basename(rel_chapter)})")
            continue
        problems += 1
        print(f"  DRIFT  {rel_starter}:{func}() vs {rel_chapter}")
        import difflib
        for line in difflib.unified_diff(want, got, "book", "starter",
                                         lineterm="", n=1):
            if line.startswith(("+", "-")) and not line.startswith(("+++", "---")):
                print(f"        {line}")

    print(f"\n{problems} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
