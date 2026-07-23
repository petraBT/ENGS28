<?xml version='1.0'?>

<!-- Custom LaTeX/print stylesheet for the ENGS 28 book. Its only job is to
     teach PreTeXt to IGNORE the <slide> element in PDF/print output: a <slide>
     is the condensed, in-class projector form of the surrounding content (see
     xsl/engs28-html.xsl), which has no place in the printed book. Providing a
     matching (empty) template also stops PreTeXt from trying to number the
     unknown element, which errors under the stock stylesheet. -->
<!DOCTYPE xsl:stylesheet [
    <!ENTITY % entities SYSTEM "./core/entities.ent">
    %entities;
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:import href="./core/pretext-latex.xsl"/>

<!-- Omit projector slides from the printed book entirely. -->
<xsl:template match="slide"/>

</xsl:stylesheet>
