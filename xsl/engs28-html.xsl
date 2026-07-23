<?xml version='1.0'?>

<!-- Custom HTML stylesheet for the ENGS 28 book. Its ONLY job right now is to
     teach PreTeXt about the <slide> element: the condensed, in-class SLIDE form
     of a piece of the book, authored right next to the full prose it condenses.

     A <slide> is emitted into the built HTML but HIDDEN from the reading view
     (assets/deck.css: .deck-slide { display:none }). The classroom deck player
     extracts it by its xml:id and projects it, so the slide and the full
     explanation are one source of truth that version together.

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
            <div class="deck-slide-body">
                <xsl:apply-templates select="*[not(self::note)]"/>
            </div>
            <xsl:for-each select="note">
                <div class="deck-slide-note">
                    <xsl:apply-templates/>
                </div>
            </xsl:for-each>
        </div>
    </xsl:if>
</xsl:template>

</xsl:stylesheet>
