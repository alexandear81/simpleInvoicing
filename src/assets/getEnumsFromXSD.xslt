<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                version="1.0">
  <xsl:output method="text" encoding="UTF-8"/>

  <xsl:template match="/">
    <xsl:apply-templates select="//xs:simpleType[xs:restriction/xs:enumeration]"/>
  </xsl:template>

  <xsl:template match="xs:simpleType">
    <xsl:variable name="typeName" select="@name"/>
    <xsl:text>export type </xsl:text>
    <xsl:value-of select="$typeName"/>
    <xsl:text> =&#10;</xsl:text>
    <xsl:for-each select="xs:restriction/xs:enumeration">
      <xsl:text>  | '</xsl:text>
      <xsl:value-of select="@value"/>
      <xsl:text>'&#10;</xsl:text>
    </xsl:for-each>
    <xsl:text>;&#10;&#10;</xsl:text>
  </xsl:template>

</xsl:stylesheet>
