# GitHub Pages Deployment

This site is configured for static deployment to GitHub Pages with a custom domain.

## Configuration

- **Build output**: `dist/client/` (TanStack Start prerendered static files)
- **Base path**: `/` (root domain)
- **Custom domain**: `chrisdaley.biz`
- **Prerendering**: Enabled with link crawling for automatic page discovery
- **Server handlers**: RSS feed and sitemap are prerendered at build time

## Local Development

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build static site to dist/client/
npm run preview  # Preview built site locally
```

## Deployment

Deployment happens automatically via GitHub Actions on push to `main`:

1. Static files generated in `dist/client/`
2. `.nojekyll` file added to prevent Jekyll processing
3. `CNAME` file added with custom domain
4. Files uploaded to GitHub Pages

## URLs

- **Production**: https://chrisdaley.biz/
- **RSS Feed**: https://chrisdaley.biz/rss.xml
- **Sitemap**: https://chrisdaley.biz/sitemap.xml

## Key Files

- `vite.config.ts` - Build configuration with base path and prerendering
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `src/routes/rss[.]xml.ts` - RSS feed with absolute URLs
- `src/routes/sitemap[.]xml.ts` - Sitemap with absolute URLs
- `src/server.ts` - Custom server entry with error handling

## GitHub Repository Setup

**To deploy to the root of chrisdaley.biz, you must:**

1. **Rename this repository** to `chebizarro.github.io` (GitHub's user site convention)
   - Go to Settings → Repository name → Rename
   
2. **Configure custom domain in GitHub Pages settings:**
   - Go to Settings → Pages
   - Under "Custom domain", enter: `chrisdaley.biz`
   - Save (this creates the CNAME file, but our workflow also adds it)

3. **Update DNS records at your domain registrar:**
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  chebizarro.github.io
   ```

4. **Wait for DNS propagation** (can take up to 48 hours, usually ~1 hour)

5. **Enable HTTPS** in GitHub Pages settings once DNS is verified

## Notes

- Nitro is disabled (`nitro: false`) - we use TanStack Start's built-in prerendering
- Server handlers (RSS, sitemap) work at build time via the custom server entry
- All URLs in RSS/sitemap use absolute paths for proper feed readers
- The CNAME file ensures GitHub Pages serves from chrisdaley.biz, not github.io
- Only ONE repository per GitHub account can be the "user site" (root domain)
