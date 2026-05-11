<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>XML Sitemap — Peptide Shop</title>
        <style>
          :root { color-scheme: light dark; }
          * { box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            background: #f7f8fa;
            color: #1a1a1a;
          }
          header {
            background: #0f172a;
            color: #fff;
            padding: 1.5rem 2rem;
          }
          header h1 { margin: 0 0 0.25rem; font-size: 1.5rem; }
          header p { margin: 0; opacity: 0.8; font-size: 0.9rem; }
          .meta {
            padding: 1rem 2rem;
            background: #fff;
            border-bottom: 1px solid #e5e7eb;
            font-size: 0.9rem;
            color: #475569;
          }
          .meta strong { color: #0f172a; }
          .wrap { padding: 1.5rem 2rem; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            border-radius: 6px;
            overflow: hidden;
          }
          th, td {
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #e5e7eb;
            font-size: 0.9rem;
          }
          th {
            background: #f1f5f9;
            font-weight: 600;
            color: #0f172a;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #f8fafc; }
          a { color: #2563eb; text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .num { color: #94a3b8; font-variant-numeric: tabular-nums; width: 4rem; }
          .small { color: #64748b; font-size: 0.85rem; }
          @media (prefers-color-scheme: dark) {
            body { background: #0b1220; color: #e5e7eb; }
            .meta { background: #111827; border-bottom-color: #1f2937; color: #94a3b8; }
            .meta strong { color: #f1f5f9; }
            table { background: #111827; box-shadow: none; }
            th { background: #1f2937; color: #f1f5f9; }
            th, td { border-bottom-color: #1f2937; }
            tr:hover td { background: #182338; }
            a { color: #60a5fa; }
          }
        </style>
      </head>
      <body>
        <header>
          <h1>XML Sitemap</h1>
          <p>Peptide Shop — machine-readable index for search engines</p>
        </header>

        <xsl:choose>
          <xsl:when test="s:sitemapindex">
            <div class="meta">
              <strong><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></strong> sitemap(s) listed.
              This is a sitemap index. Each entry below points to a child sitemap.
            </div>
            <div class="wrap">
              <table>
                <thead>
                  <tr>
                    <th class="num">#</th>
                    <th>Sitemap URL</th>
                    <th>Last modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:sitemapindex/s:sitemap">
                    <tr>
                      <td class="num"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      </td>
                      <td class="small"><xsl:value-of select="s:lastmod"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:when>
          <xsl:otherwise>
            <div class="meta">
              <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong> URLs in this sitemap.
            </div>
            <div class="wrap">
              <table>
                <thead>
                  <tr>
                    <th class="num">#</th>
                    <th>URL</th>
                    <th>Last modified</th>
                    <th>Change freq.</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:urlset/s:url">
                    <tr>
                      <td class="num"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      </td>
                      <td class="small"><xsl:value-of select="s:lastmod"/></td>
                      <td class="small"><xsl:value-of select="s:changefreq"/></td>
                      <td class="small"><xsl:value-of select="s:priority"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:otherwise>
        </xsl:choose>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
