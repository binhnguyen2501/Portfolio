# Share cards (social thumbnails)

The 1200×630 images in `public/share/` are the thumbnails shown when a page is
shared (Messenger, Facebook, Zalo, LinkedIn, X, Slack, Discord, Telegram,
WhatsApp, iMessage). They are screenshots of `index.html` in this folder.

To regenerate them (for example after adding a project):

1. `node scripts/share-cards/build-data.js` writes `data.json` from the app data.
2. From the repo root run a static server: `python3 -m http.server 3125`.
3. Open `http://localhost:3125/scripts/share-cards/index.html?page=<name>` at a
   1200×630 viewport and save a JPEG screenshot to `public/share/<name>.jpg`.
   `<name>` is `home`, `about`, `works`, or a project slug (e.g. `LPAgent`).

The build fails if a page's share image is missing. If you change an image and
want platforms to refetch it, give the file a new name and update `src/seo.ts`.
