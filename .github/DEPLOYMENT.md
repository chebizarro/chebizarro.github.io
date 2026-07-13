# GitHub Pages Deployment

This site is configured for static deployment to GitHub Pages.

## Configuration

- **Build output**: `dist/client/` (TanStack Start prerendered static files)
- **Base path**: `/sovereign-systems-lab/` (in CI), `/` (local dev)
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

1. Build runs with `GITHUB_ACTIONS=true` (sets correct base path)
2. Static files generated in `dist/client/`
3. `.nojekyll` file added to prevent Jekyll processing
4. Files uploaded to GitHub Pages

## URLs

- **Production**: https://chebizarro.github.io/sovereign-systems-lab/
- **RSS Feed**: https://chebizarro.github.io/sovereign-systems-lab/rss.xml
- **Sitemap**: https://chebizarro.github.io/sovereign-systems-lab/sitemap.xml

## Key Files

- `vite.config.ts` - Build configuration with base path and prerendering
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `src/routes/rss[.]xml.ts` - RSS feed with absolute URLs
- `src/routes/sitemap[.]xml.ts` - Sitemap with absolute URLs
- `src/server.ts` - Custom server entry with error handling

## Notes

- Nitro is disabled (`nitro: false`) - we use TanStack Start's built-in prerendering
- Server handlers (RSS, sitemap) work at build time via the custom server entry
- All URLs in RSS/sitemap use absolute paths for proper feed readers
- The `GITHUB_ACTIONS` env var switches between local and production base paths
