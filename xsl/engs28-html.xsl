<?xml version='1.0'?>

<!-- Custom HTML stylesheet for the ENGS 28 book. It teaches PreTeXt two custom
     elements this book uses: <slide> and <sim>.

     <slide> is the condensed, in-class SLIDE form of a piece of the book,
     authored right next to the full prose it condenses. It is emitted into the built HTML but HIDDEN from the reading view
     (assets/deck.css: .deck-slide { display:none }). The classroom deck player
     extracts it by its xml:id and projects it, so the slide and the full
     explanation are one source of truth that version together.

     <sim> embeds the ENGS 28 board simulator - the in-browser Nucleo-C031C6
     that runs the same register-level C as the real board - seeded with an
     exercise's starter code, so a coding exercise is done right on the page.
     See the sim.* params and the <sim> template at the bottom of this file.

     PreTeXt stages its own core stylesheets into a sibling core/ directory when
     it runs a custom xsl, so the import below resolves at build time without
     vendoring anything (same pattern as the C-Programming book). -->
<!DOCTYPE xsl:stylesheet [
    <!ENTITY % entities SYSTEM "./core/entities.ent">
    %entities;
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
                xmlns:exsl="http://exslt.org/common"
                xmlns:str="http://exslt.org/strings"
                exclude-result-prefixes="exsl str">

<xsl:import href="./core/pretext-html.xsl"/>

<!-- What to do with <slide> blocks in this build:
       'strip'  (default, the reading "web" target) — emit NOTHING. The reading
                book already has the full prose, must not show the condensed
                projector form, and must never leak instructor-only notes or
                solutions inlined in a slide, even in page source.
       'render' (the "web-deck" target the player reads) — emit the hidden
                <div class="deck-slide"> the player extracts.
     Either way a matching template exists, so PreTeXt does not try to assign a
     number to the unknown element (which errors under the stock stylesheet). -->
<xsl:param name="deck.slides" select="'strip'"/>

<!-- What to do with <instructor> blocks in this build:
       'strip'  (default: the reading "web" target, the PDF, and the deck) —
                emit NOTHING, not even in page source. A student who reads the
                HTML source must not find the answer there.
       'render' (the "web-instructor" target) — emit the block, boxed and
                labelled, for the instructor's own copy.
     Use it for anything that hands over work a student or a lab is supposed to
     do: a filled-in driver function, a completed program, an activity's worked
     answer. Reveals that are the class's own teaching — a derivation the room
     does together — are NOT instructor material and should stay in the book. -->
<xsl:param name="book.solutions" select="'strip'"/>

<!-- What to do with INSTRUCTOR-ONLY SLIDES — a <slide instructor="yes">, or a
     deck ref pointing straight at an <instructor> block:
       'strip'  (default, the "web-deck" target the students may be given) —
                emit NOTHING. Until this existed the slide was rendered and the
                player merely filtered it out of the student VIEW, so the answer
                sat in the page source of a deck a student could open.
       'render' (the "web-deck-instructor" target you teach from) — emit it.
     The deck JSON's "instructor": true still drives the player: the badge in
     the instructor view, and dropping the slide from ?student. That flag and
     this one must agree, or the student deck loses a slide it should have kept
     (or keeps one it should not) — scripts/check_deck.py enforces it. -->
<xsl:param name="deck.solutions" select="'strip'"/>

<!-- Instructor-only content, stripped from the student book.
       <instructor xml:id="inst-...">              (xml:id optional)
         <p>...</p> <program>...</program>
         <caption>shown only when a deck slide refs this block</caption>
       </instructor>
     Same contract as <slide>: a matching template always exists, so PreTeXt
     does not try to number the unknown element under the stock stylesheet.

     The @xml:id becomes the div's id so a deck can ref this block DIRECTLY,
     instead of a <slide> repeating the same answer beside it — two copies of
     one solution drift, and the drift is invisible until you project the stale
     one. The deck build that renders such a ref is web-deck-instructor, which
     sets book.solutions=render for exactly this reason. -->
<xsl:template match="instructor">
    <xsl:if test="$book.solutions = 'render'">
        <div class="instructor-only">
            <xsl:if test="@xml:id">
                <xsl:attribute name="id">
                    <xsl:value-of select="@xml:id"/>
                </xsl:attribute>
            </xsl:if>
            <div class="instructor-only-label">Instructor only</div>
            <xsl:apply-templates select="node()[not(self::caption)]"/>
            <!-- Same class the player reads off a <slide>, for parity. In the
                 instructor book it reads as the block's closing line, and the
                 player projects it in the same place — a caption with no figure
                 to sit under closes the body. -->
            <xsl:if test="caption">
                <div class="deck-slide-caption">
                    <xsl:apply-templates select="caption/node()"/>
                </div>
            </xsl:if>
        </div>
    </xsl:if>
</xsl:template>

<!-- Inline coloured text for slides: <clr c="orange">Channel 1</clr> ->
     <span class="deck-clr-orange">. Colours are styled in the deck player
     (assets/class.html). Meant for slide bullets that mirror a colour in the
     figure beside them (e.g. scope channels); the reading book strips <slide>
     entirely, so this never affects normal prose. -->
<xsl:template match="clr">
    <span class="deck-clr-{@c}"><xsl:apply-templates/></span>
</xsl:template>

<!-- Keep <slide> and <instructor> out of the SEARCH INDEX as well as off the
     page.  PreTeXt builds lunr-pretext-search-index.js in its own modes, which
     walk the source tree rather than the rendered HTML - so the templates above
     are not consulted, and without the four templates below the student book's
     search index carries every presenter note and every worked solution even
     though no page displays them.  A student searching "SevenSeg_write" got the
     finished function back.  Verified by grepping the built index; see the note
     in AUTHORING-book.md under "Instructor-only content". -->
<xsl:template match="slide" mode="search-node-text">
    <!-- Same gate as the page template, and it has to be repeated here rather
         than inherited: PreTeXt builds lunr-pretext-search-index.js in its own
         modes, which walk the SOURCE tree, so a slide stripped from the HTML is
         still indexed unless it is stripped here too. That is how the presenter
         notes leaked the first time. -->
    <xsl:if test="$deck.slides = 'render' and
                  not(@instructor = 'yes' and $deck.solutions != 'render')">
        <xsl:apply-templates select="node()" mode="search-node-text"/>
    </xsl:if>
</xsl:template>
<xsl:template match="instructor" mode="search-node-text">
    <xsl:if test="$book.solutions = 'render'">
        <xsl:apply-templates select="node()" mode="search-node-text"/>
    </xsl:if>
</xsl:template>
<!-- ... and stop them generating search documents of their own: a <p> with a
     <term> inside a slide would otherwise become its own indexed block. -->
<xsl:template match="slide|instructor" mode="search-block-docs-textbook"/>
<xsl:template match="slide|instructor" mode="search-block-docs-reference"/>

<!-- The condensed in-class slide form of the surrounding content.
       <slide xml:id="sl-..."  ref="fig-...optional">
         <ul> ...condensed bullets... </ul>   (or short <p>s)
         <note> presenter-only reminder, never projected </note>
       </slide>
     @ref names an existing figure / activity / program to show alongside the
     bullets, so its image is never duplicated - the player resolves it. The
     block is hidden in the reading view; only the deck player reveals it. -->
<xsl:template match="slide">
    <xsl:if test="$deck.slides = 'render' and
                  not(@instructor = 'yes' and $deck.solutions != 'render')">
        <div class="deck-slide" hidden="hidden">
            <!-- Marks the block for the player, which badges it in the
                 instructor view. It only ever reaches the HTML in a build that
                 renders instructor slides at all; the student deck does not
                 have this element to badge. -->
            <xsl:if test="@instructor = 'yes'">
                <xsl:attribute name="data-deck-instructor">yes</xsl:attribute>
            </xsl:if>
            <xsl:attribute name="id">
                <xsl:value-of select="@xml:id"/>
            </xsl:attribute>
            <xsl:if test="@ref">
                <xsl:attribute name="data-deck-ref">
                    <xsl:value-of select="@ref"/>
                </xsl:attribute>
            </xsl:if>
            <!-- Optional layout hint: stack="yes" → bullets full width on top,
                 figure full width (large) below, for wide images. -->
            <xsl:if test="@stack">
                <xsl:attribute name="data-deck-stack">
                    <xsl:value-of select="@stack"/>
                </xsl:attribute>
            </xsl:if>
            <!-- Optional: room="yes" → leave writing space after each list item,
                 for predict/practice slides students (and the instructor) write on.
                 room="compressed" is the opposite: tighten the gaps (not the type
                 size) so a long activity fits on one slide. -->
            <xsl:if test="@room">
                <xsl:attribute name="data-deck-room">
                    <xsl:value-of select="@room"/>
                </xsl:attribute>
            </xsl:if>
            <!-- Column widths for a <tabular> in this slide.  PreTeXt honours
                 <col width="..."/> in print but emits NO <colgroup> in HTML, so
                 on a slide the columns size themselves by content: the UART/I2C
                 comparison came out 422px against 755px despite both columns
                 being declared 50%.  Carry the declared widths through so the
                 player can apply them; without this the attribute is simply
                 absent and the table keeps the old content-sized behaviour. -->
            <xsl:if test="descendant::tabular[1]/col/@width">
                <xsl:attribute name="data-deck-colwidths">
                    <xsl:for-each select="descendant::tabular[1]/col">
                        <xsl:value-of select="@width"/>
                        <xsl:if test="position() != last()">,</xsl:if>
                    </xsl:for-each>
                </xsl:attribute>
            </xsl:if>
            <div class="deck-slide-body">
                <xsl:apply-templates select="*[not(self::note) and not(self::caption)]"/>
            </div>
            <!-- A slide's own short, instructive caption. On a slide that refs a
                 figure the player shows it under the image, INSTEAD of the book
                 figure's full caption; on any other slide it closes the body. -->
            <xsl:for-each select="caption">
                <div class="deck-slide-caption">
                    <xsl:apply-templates/>
                </div>
            </xsl:for-each>
            <xsl:for-each select="note">
                <div class="deck-slide-note">
                    <xsl:apply-templates/>
                </div>
            </xsl:for-each>
        </div>
    </xsl:if>
</xsl:template>

<!-- ================================================================== -->
<!--  <sim> — the embedded board simulator                              -->
<!-- ================================================================== -->

<!-- Where the simulator lives, RELATIVE TO A BOOK PAGE. The simulator's built
     output is committed at assets/board-sim/ (refreshed by
     scripts/sync-board-sim.sh from ~/repos/ENGS28-board-sim), and PreTeXt
     copies everything under assets/ into <output>/external/ on every target —
     so this one relative path works in the local preview, in the web-deck
     build, and on the deployed GitHub Pages site alike, with no separate
     deploy step. Book pages all sit flat at the top level of the output
     (chunking doesn't nest them into folders), so one relative path serves
     every page; revisit if that ever changes.

     Because it is published with the book, the same copy is also a standalone
     URL you can link from Canvas (the petrabt.github.io/ENGS28 form redirects
     to the same place):
       https://engs20book.thayer.dartmouth.edu/ENGS28/external/board-sim/index.html
     Override this param to point at a separately hosted simulator instead. -->
<xsl:param name="sim.tool" select="'external/board-sim/index.html'"/>

<!-- Where starter .c files live, RELATIVE TO THE SIMULATOR'S OWN DOCUMENT —
     not to the book page. The simulator fetch()es ?src= from inside the
     iframe, and a relative URL there resolves against the iframe's document
     (external/board-sim/index.html), hence the leading "../". Starter files
     are authored in assets/sim-starters/, which PreTeXt copies to
     external/sim-starters/ — a sibling of external/board-sim/. -->
<xsl:param name="sim.starters" select="'../sim-starters/'"/>

<!-- The board simulator's INSTRUCTOR examples (solutions and demos), as a path
     relative to the SIMULATOR's document, like sim.starters above. The file is
     installed into an instructor target's external/ after the build by
     scripts/install-instructor-sim.sh, and deliberately does not live under
     assets/, which PreTeXt copies into every target including the deployed
     one. See instructor-only/README.md.

     Every <sim> in a target with book.solutions=render - the instructor book
     and the deck you teach from - hands the simulator this file, and its
     examples dropdown gains an "Instructor only" group with an INSTRUCTOR
     badge beside it. Student targets pass nothing and the file is not there to
     be found. If the install step has not run, the simulator says so in its
     status bar and the student examples still work. -->
<xsl:param name="sim.instructor-examples" select="'../sim-examples-instructor.json'"/>

<!-- Default iframe height in px. The simulator's ?embed=1 layout stacks the
     editor over the board; below ~560 the board starts to clip. Override per
     element with height="…". -->
<xsl:param name="sim.height" select="660"/>

<!-- An embedded board simulator:

       <sim starter="blinkySlowToFast"/>   assets/sim-starters/<name>.c
       <sim example="blinky"/>             a built-in example shipped with the
                                           simulator: blinky, blinky-delay,
                                           button-external, printf-counter.
                                           Those are the STUDENT examples,
                                           which is all the
                                           book's copy of the simulator has;
                                           the instructor build's solutions and
                                           demos are not addressable from here
                                           (see the simulator's README).
       <sim src="…"/>                      an explicit URL, passed through
                                           verbatim (escape hatch; resolved
                                           against the simulator's document)
       <sim starter="…" height="720"/>     taller iframe
       <sim starter="…" coolterm="yes"/>   open the simulator's serial terminal
                                           (the "CoolTerm" panel, where printf
                                           output arrives) from the start, for a
                                           UART exercise. Without it the panel
                                           stays closed until the program
                                           transmits its first byte, which is
                                           what a GPIO exercise wants.

     With none of the three, the simulator opens on its own default program.
     Precedence when more than one is given follows the tool's own: src >
     example (see the URL-params block in the simulator's src/main.ts).

     The wrapper div's class is what the deck player keys on: a <sim> inside a
     <slide> is projected as a live demo, while one inside an <activity> is
     dropped when that activity is projected (same treatment as the figures and
     code listings an activity embeds) — see assets/class.html. -->
<xsl:template match="sim">
    <xsl:variable name="height">
        <xsl:choose>
            <xsl:when test="@height &gt; 200"><xsl:value-of select="@height"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$sim.height"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="the-url">
        <xsl:value-of select="$sim.tool"/>
        <xsl:text>?embed=1</xsl:text>
        <xsl:choose>
            <xsl:when test="@src != ''">
                <xsl:text>&amp;src=</xsl:text>
                <xsl:value-of select="@src"/>
            </xsl:when>
            <xsl:when test="@starter != ''">
                <xsl:text>&amp;src=</xsl:text>
                <xsl:value-of select="$sim.starters"/>
                <xsl:value-of select="@starter"/>
                <xsl:text>.c</xsl:text>
            </xsl:when>
            <xsl:when test="@example != ''">
                <xsl:text>&amp;example=</xsl:text>
                <xsl:value-of select="@example"/>
            </xsl:when>
        </xsl:choose>
        <xsl:if test="@coolterm = 'yes'">
            <xsl:text>&amp;coolterm=1</xsl:text>
        </xsl:if>
        <!-- Instructor targets get the solutions in the dropdown, from the
             same switch that renders <instructor> blocks. -->
        <xsl:if test="$book.solutions = 'render'">
            <xsl:text>&amp;examples=</xsl:text>
            <xsl:value-of select="$sim.instructor-examples"/>
        </xsl:if>
    </xsl:variable>
    <!-- The same URL without ?embed=1, for the "open in a new tab" link: a
         full-window simulator wants its full-window layout. -->
    <xsl:variable name="popout-url">
        <xsl:value-of select="$sim.tool"/>
        <xsl:choose>
            <xsl:when test="@src != ''">
                <xsl:text>?src=</xsl:text>
                <xsl:value-of select="@src"/>
            </xsl:when>
            <xsl:when test="@starter != ''">
                <xsl:text>?src=</xsl:text>
                <xsl:value-of select="$sim.starters"/>
                <xsl:value-of select="@starter"/>
                <xsl:text>.c</xsl:text>
            </xsl:when>
            <xsl:when test="@example != ''">
                <xsl:text>?example=</xsl:text>
                <xsl:value-of select="@example"/>
            </xsl:when>
        </xsl:choose>
        <!-- This URL has no ?embed=1 to hang the terminal flag off, so it is
             the first query parameter when there is no starter or example. -->
        <xsl:if test="@coolterm = 'yes'">
            <xsl:choose>
                <xsl:when test="@src != '' or @starter != '' or @example != ''">
                    <xsl:text>&amp;coolterm=1</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>?coolterm=1</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$book.solutions = 'render'">
            <xsl:choose>
                <xsl:when test="@src != '' or @starter != '' or @example != '' or @coolterm = 'yes'">
                    <xsl:text>&amp;examples=</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>?examples=</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:value-of select="$sim.instructor-examples"/>
        </xsl:if>
    </xsl:variable>
    <!-- Emitted once per <sim>; duplicates on a page are harmless and this
         keeps the whole feature inside one template, with no extra CSS file to
         wire into every build target. -->
    <style>
        /* The reading column is ~640px, but the simulator needs room for the
           editor beside the board. Widen it to fill the book's main column
           (.ptx-content is 640px inside a 840px .ptx-main, i.e. a 100px gutter
           either side) by spending that gutter. This is deliberately arithmetic
           on the book's OWN layout rather than viewport math: it can never
           reach under the table-of-contents sidebar, at any window size. */
        .sim-embed { margin: 1.5em 0; }
        @media (min-width: 900px) {
            .sim-embed { width: calc(100% + 200px); margin-left: -100px; }
        }
        .sim-embed-links { margin-top: 0.35em; font-size: 90%; text-align: right; }
    </style>
    <div class="sim-embed">
        <!-- Hidden until load, like the C-Programming book's coding windows:
             an iframe that reflows as its app boots otherwise jumps the page
             under the reader. -->
        <iframe title="ENGS 28 board simulator" src="{$the-url}" width="100%"
                height="{$height}"
                style="position: absolute; top: -9999em; visibility: hidden; border: none;"
                onload="this.style.position='static'; this.style.visibility='visible';"></iframe>
        <p class="sim-embed-links">
            <!-- The pop-out link resolves against the BOOK PAGE (it is a normal
                 link in the page), so it needs the same relative path the
                 iframe src uses — which is what $sim.tool already is. The
                 starter path inside it, though, is relative to the simulator,
                 so it stays "../sim-starters/…" and resolves once the tool
                 loads. -->
            <a href="{$popout-url}" target="_blank">Open the simulator in a new tab</a>
        </p>
    </div>
</xsl:template>

</xsl:stylesheet>
