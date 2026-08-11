<?xml version='1.0'?>

<!-- Custom LaTeX/print stylesheet for the ENGS 28 book. Its job is to teach
     PreTeXt what to do in PDF/print output with the two custom elements this
     book uses (both defined in xsl/engs28-html.xsl):

       <slide>  the condensed, in-class projector form of the surrounding
                content — IGNORED, it has no place in the printed book;
       <instructor>  a worked solution — IGNORED, same as every other
                student-facing target;
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

<!-- Omit worked solutions from the printed book entirely.
     This template is the whole strip: without it there is no match, PreTeXt's
     stock fallback recurses into the children, and every <instructor> block is
     typeset into the PDF — and WITHOUT the "Instructor only" label, which is
     produced by the HTML template, so it reads as ordinary book prose. That was
     the state until 2026-08-11, while AUTHORING-book.md said the PDF stripped
     it; the leak was invisible because the print build dies on an SVG in
     Chapter 3 and never reached Chapter 9, where the blocks are.

     There is deliberately no print equivalent of web-instructor: the strip is
     unconditional here rather than keyed to book.solutions. If a printable
     answer key is ever wanted, that is a new target AND a rendering for it.

     ANY new strip-by-default element needs a template in BOTH stylesheets —
     this one and engs28-html.xsl — plus the four search-index templates the
     HTML one documents. Three places, and only one of them is obvious. -->
<xsl:template match="instructor"/>

<!-- A pointer where the interactive simulator sits in the online book. -->
<xsl:template match="sim">
    <xsl:text>&#xa;\begin{quote}\emph{The ENGS 28 board simulator is embedded at this point in the online book: write and run this code in your browser.}\end{quote}&#xa;</xsl:text>
</xsl:template>

</xsl:stylesheet>
