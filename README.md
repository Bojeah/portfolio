# Personal Portfolio Website

- **Name:** Benedict Ojeah
- **Matric number:** 23120111041
- **Course:** CSC 419, Advances in Web, Mobile and Blockchain Development
- **Institution:** Pan-Atlantic University, 2026/2027 first semester
- **Live site:** ADD YOUR VERCEL URL HERE
- **Source code:** https://github.com/Bojeah/ADD-REPO-NAME-HERE

A responsive, deployed portfolio with an About section, a Projects section, an email call to action and dedicated project details pages.

## Design idea

A dark product-lab aesthetic: acid-lime signals, coral alerts, oversized type and animated system graphics. Colours and fonts are CSS variables at the top of `src/app/globals.css`; Motion powers the reactive layers.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, About, Selected work, Stack, Contact |
| `/projects/canvas-for-a-cause` | Case study: description, problem, features, screenshots, technologies, what I learned |
| `/projects/music-chords-emulator` | Case study in the same structure |

The project pages are generated from `src/data/projects.ts` by one template, `src/app/projects/[slug]/page.tsx`.

## Tech

Next.js 15 (App Router), React 19, TypeScript, plain CSS, Motion for React, self-hosted fonts (Big Shoulders Display and Hanken Grotesk through Fontsource). No UI library or CSS framework.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run build` and then `npm start`.

## Edit the content

- Name, email and links: `src/data/site.ts`
- Projects and case studies: `src/data/projects.ts`
- Screenshots: put image files in `public/screens/` using the file names listed in `projects.ts`. Until a file exists, the page shows a labelled placeholder frame.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New, then Project, and import the repository.
3. Keep the default Next.js settings and click Deploy.
4. Copy the live URL into this README.

## Structure

```
src/
  app/
    layout.tsx             page shell, fonts, header and footer
    page.tsx               home page
    globals.css            all styles, with variables at the top
    projects/[slug]/       project details page
  components/              SiteHeader, SiteFooter, CopyEmail, Screenshot
  data/                    site.ts and projects.ts
public/screens/            screenshots
```
