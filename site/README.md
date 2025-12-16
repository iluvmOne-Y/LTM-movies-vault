Actress Film Library – a minimal site to host and browse a curated set of films featuring a specific actress.

## Getting Started

1. Install dependencies
```
npm install
```
2. Run the development server
```
npm run dev
```
3. Open the app
```
http://localhost:3000
```

## Project Structure
- `src/app` – App Router pages (`/`, `/movies`, `/movies/[slug]`, `/about`)
- `src/data/movies.ts` – Actress profile and movies seed data
- `public/` – Static assets

## Customization
- Edit actress info and movies in `src/data/movies.ts`
- Replace `posterUrl` and `videoUrl` with your own assets
- Update SEO in `src/app/layout.tsx` metadata

## Build & Deploy
```
npm run build
npm start
```
Deploy to any Node-compatible host or Vercel.
