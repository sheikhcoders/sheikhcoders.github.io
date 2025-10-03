# Sheikh Coders Blog

A bilingual (English & Bangla) static blog hosted on GitHub Pages. The homepage highlights each post with English and Bangla summaries, "Continue reading" links, and an SEO-ready banner. Individual posts live under `/posts/<slug>/` with matching meta tags and structured data.

## Project structure

```
assets/
  posts.json        # Post metadata used to render homepage cards
  site.js           # Shared scripts (year + homepage population)
  styles.css        # Global styles for homepage + posts
posts/
  <slug>/index.html # Full bilingual article
index.html          # Homepage with hero banner and auto-loaded posts
```

## Adding a new post

1. **Duplicate a folder** in `posts/` (for example `posts/portfolio-landing/`) and rename it to your new slug.
2. **Update meta tags and copy** inside the new `index.html`. Keep both English and Bangla sections, and refresh the JSON-LD block.
3. **List the post** in `assets/posts.json` with the same slug, title, date, excerpts, and topics. The homepage automatically refreshes the cards using this file.

## Local preview

You can open the HTML files directly in a browser or serve the repo locally with any static server, e.g.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` to check responsive layouts and "Continue reading" links.

## SEO checklist

- Canonical URLs and language alternates are configured for every page.
- Structured data (`Blog`, `BlogPosting`, and `FAQPage`) is embedded for richer search snippets.
- Mobile-first design with fluid typography and accessible language attributes for English and Bangla.
