<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 75rem;
            margin: 0 auto;
            padding: 2rem;
          }
          table {
            border: none;
            border-collapse: collapse;
            width: 100%;
          }
          th {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            background: #f8f9fa;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
          }
          a {
            color: #0077b6;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .header {
            margin-bottom: 20px;
          }
          .explainer {
            margin-bottom: 20px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>XML Sitemap</h1>
        </div>
        <div class="explainer">
          <p>
            This is an XML Sitemap, meant for consumption by search engines like Google or Bing.
            You can find more information about XML sitemaps on <a href="https://sitemaps.org">sitemaps.org</a>.
          </p>
        </div>
        
        <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
          <h2>Sitemap Index</h2>
          <table>
            <thead>
              <tr>
                <th width="70%">Location</th>
                <th width="30%">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                <tr>
                  <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </xsl:if>
        
        <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
          <h2>URLs</h2>
          <table>
            <thead>
              <tr>
                <th width="65%">Location</th>
                <th width="10%">Priority</th>
                <th width="10%">Change Freq</th>
                <th width="15%">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td><xsl:value-of select="sitemap:priority"/></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </xsl:if>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
