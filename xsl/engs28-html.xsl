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

<!-- Inline coloured text for slides: <clr c="orange">Channel 1</clr> ->
     <span class="deck-clr-orange">. Colours are styled in the deck player
     (assets/class.html). Meant for slide bullets that mirror a colour in the
     figure beside them (e.g. scope channels); the reading book strips <slide>
     entirely, so this never affects normal prose. -->
<xsl:template match="clr">
    <span class="deck-clr-{@c}"><xsl:apply-templates/></span>
</xsl:template>

<!-- The condensed in-class slide form of the surrounding content.
       <slide xml:id="sl-..."  ref="fig-...optional">
         <ul> ...condensed bullets... </ul>   (or short <p>s)
         <note> presenter-only reminder, never projected </note>
       </slide>
     @ref names an existing figure / activity / program to show alongside the
     bullets, so its image is never duplicated - the player resolves it. The
     block is hidden in the reading view; only the deck player reveals it. -->
<xsl:template match="slide">
    <xsl:if test="$deck.slides = 'render'">
        <div class="deck-slide" hidden="hidden">
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
                 for predict/practice slides students (and the instructor) write on. -->
            <xsl:if test="@room">
                <xsl:attribute name="data-deck-room">
                    <xsl:value-of select="@room"/>
                </xsl:attribute>
            </xsl:if>
            <div class="deck-slide-body">
                <xsl:apply-templates select="*[not(self::note) and not(self::caption)]"/>
            </div>
            <!-- A slide's own short, instructive caption for the figure it shows
                 (the deck player uses this INSTEAD of the book figure's full
                 caption). -->
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

<!-- Default iframe height in px. The simulator's ?embed=1 layout stacks the
     editor over the board; below ~560 the board starts to clip. Override per
     element with height="…". -->
<xsl:param name="sim.height" select="660"/>

<!-- An embedded board simulator:

       <sim starter="blinkySlowToFast"/>   assets/sim-starters/<name>.c
       <sim example="blinky"/>             a built-in example shipped with the
                                           simulator (blinky, blinky-delay,
                                           external-led-d4, button-onboard,
                                           button-external)
       <sim src="…"/>                      an explicit URL, passed through
                                           verbatim (escape hatch; resolved
                                           against the simulator's document)
       <sim starter="…" height="720"/>     taller iframe

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
