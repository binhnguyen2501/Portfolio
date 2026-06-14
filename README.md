# Nguyen Binh — Portfolio

Personal portfolio website for **Nguyen Ngoc Thanh Binh**, a Front-end Developer based in Vietnam. The site showcases selected projects, work experience, skills, and professional background with a custom cursor, motion interactions, and a responsive layout.

## Features

- **Home** — Hero section with project slider, hover reveal animation, and quick navigation to all projects
- **About** — Bio, work experience, education timeline, and categorized skills
- **Projects** — Grid of project cards with descriptions and tech stack tags
- **Project detail** — Video preview, screenshots, description, and tech stack per project
- **Custom cursor** — Interactive cursor with hover states across the site
- **Responsive design** — Desktop navigation and mobile hamburger menu
- **Code splitting** — Lazy-loaded routes for faster initial load

## Featured Projects

| Project | Description |
| --- | --- |
| Corano Jewelry | Jewelry brand landing page built with HTML, CSS, and JavaScript |
| Kyyeudreamers | Yearbook photography studio showcase built with Next.js and Firebase |
| Iron Fitness | Fitness brand landing page with responsive layout and animations |
| Social App | Full-stack social platform built with Next.js, TanStack Query, and Prisma |

## Tech Stack

- [React](https://react.dev/) 17 + [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/)
- [React Router](https://reactrouter.com/) v6
- [Tailwind CSS](https://tailwindcss.com/) + [Styled Components](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Slick](https://react-slick.neostack.com/) — home page project carousel
- [Chakra UI](https://chakra-ui.com/) — loading spinner
- [React Helmet](https://github.com/nfl/react-helmet) — page titles and SEO metadata

## Project Structure

```
src/
├── components/       # Shared UI (Header, Footer, CustomCursor, SlideItem, etc.)
├── contexts/         # React context providers
├── pages/
│   ├── Main/         # Home page
│   ├── About/        # About page
│   ├── Works/        # Projects listing
│   ├── Work/         # Project detail
│   └── NotFound/     # 404 page
├── constants.ts      # Projects, skills, and experience data
├── App.tsx           # Route definitions
└── index.tsx         # App entry point
```

## Getting Started

### Prerequisites

- Node.js 24.x
- Yarn 1.x

### Installation

```bash
git clone <repository-url>
cd Portfolio
yarn install
```

### Development

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
yarn build
```

The optimized output is generated in the `build/` folder.

### Tests

```bash
yarn test
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/works` | Projects |
| `/works/:workName` | Project detail |
| `*` | 404 |

## SEO

Live site: [https://binh98.vercel.app](https://binh98.vercel.app)

The site includes per-page meta tags, Open Graph / Twitter cards, JSON-LD structured data, and a build-time sitemap generator. Running `yarn build` automatically generates `sitemap.xml` and `robots.txt` in the `build/` folder.

## Deployment

The project includes Docker support for containerized deployment:

```bash
docker build -t portfolio .
docker run -p 8080:8080 portfolio
```

AWS CodeBuild configuration is available in `buildspec.yml` for ECR-based CI/CD deployment.

## Contact

- **Email:** binhnnt.98@gmail.com
- **Phone:** +84 39 766 56 60
- **LinkedIn:** [binh-nguyen-7295b1225](https://www.linkedin.com/in/binh-nguyen-7295b1225)
- **GitHub:** [binhnguyen2501](https://github.com/binhnguyen2501)
- **Resume:** [CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Developer.pdf](public/CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Developer.pdf)

## License

This project is private and intended for personal portfolio use.
