<?xml version='1.0'?>

<!-- Custom LaTeX/print stylesheet for the ENGS 28 book. Its job is to teach
     PreTeXt what to do in PDF/print output with the two custom elements this
     book uses (both defined in xsl/engs28-html.xsl):

       <slide>  the condensed, in-class projector form of the surrounding
                content — IGNORED, it has no place in the printed book;
       <sim>    an embedded board simulator — replaced by a one-line pointer,
                since an interactive tool can't exist on paper.

     Providing a matching template for each also stops PreTeXt from trying to
     number the unknown element, which errors under the stock stylesheet. -->
<!DOCTYPE xsl:stylesheet [
    <!ENTITY % entities SYSTEM "./core/entities.ent">
    %entities;
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:import href="./core/pretext-latex.xsl"/>

<!-- Omit projector slides from the printed book entirely. -->
<xsl:template match="slide"/>

<!-- A pointer where the interactive simulator sits in the online book. -->
<xsl:template match="sim">
    <xsl:text>&#xa;\begin{quote}\emph{The ENGS 28 board simulator is embedded at this point in the online book: write and run this code in your browser.}\end{quote}&#xa;</xsl:text>
</xsl:template>

</xsl:stylesheet>
