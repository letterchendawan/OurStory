# Zulaikha & Iqbal

Static Next.js story, deployed to GitHub Pages by GitHub Actions.

| Route | Page |
|---|---|
| `/` | Road to 700 (hari ke-679) |
| `/600` | Road to 600 |
| `/kisah` | Kisah awal |

```
npm install
npm run dev
```

Local URL: [http://localhost:3000/](http://localhost:3000/)

## Deploy

Every push to `main` runs [.github/workflows/pages.yml](.github/workflows/pages.yml), which builds the static export and deploys it to Pages. The base path comes from the repo automatically (`/<repo-name>/`, or `/` for a `username.github.io` repo), so the repo can be renamed or moved without code changes.

One-time setup in a new repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Copy `.env.example` to `.env.local` for Cloudinary credentials (only needed to upload photos). Do not commit `.env.local`.
