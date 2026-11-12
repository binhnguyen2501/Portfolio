import { WorkDetailList } from "@/constants";

export const SITE_NAME = "Nguyen Binh Portfolio";
export const AUTHOR_NAME = "Nguyen Ngoc Thanh Binh";
export const AUTHOR_SHORT_NAME = "Nguyen Binh";
export const JOB_TITLE = "Frontend Engineer";
export const SITE_URL = "https://binh98.vercel.app";

export const DEFAULT_TITLE = `${AUTHOR_SHORT_NAME} | ${JOB_TITLE} in Vietnam (React, Next.js)`;
export const TITLE_SUFFIX = ` | ${AUTHOR_SHORT_NAME}`;
export const DEFAULT_DESCRIPTION =
  "Nguyen Binh is a frontend engineer in Ho Chi Minh City with 4+ years building fintech and Web3 products in React, Next.js, and TypeScript.";
export const DEFAULT_KEYWORDS =
  "Nguyen Binh, Nguyen Ngoc Thanh Binh, Frontend Engineer, Front-end Developer, React Developer, Next.js, TypeScript, Web3, Fintech, Vietnam, Ho Chi Minh City";
export const DEFAULT_OG_IMAGE_PATH = "/og.jpg";
export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;
export const DEFAULT_OG_IMAGE_ALT =
  "Nguyen Binh, Frontend Engineer in Vietnam";
export const DEFAULT_OG_IMAGE_WIDTH = "1200";
export const DEFAULT_OG_IMAGE_HEIGHT = "630";
export const PORTRAIT_IMAGE = `${SITE_URL}/me.png`;

// One factual summary, reused by the page copy for crawlers, the structured
// data, and llms.txt, so search engines and AI assistants read the same facts.
export const PROFILE_SUMMARY =
  "Nguyen Ngoc Thanh Binh (Nguyen Binh) is a frontend engineer based in Ho Chi Minh City, Vietnam. He has 4+ years of experience building fintech and Web3 products with React, Next.js, and TypeScript, and has owned frontend delivery for real-time, multi-chain applications serving 1,000+ daily active users.";

export const PROFILE_FACTS = [
  "Role: Frontend Engineer and Forward Deployed Engineer",
  "Location: Ho Chi Minh City, Vietnam",
  "Experience: 4+ years in fintech and Web3 products",
  "Core stack: React, Next.js, TypeScript, Tailwind CSS, TanStack Query",
  "Also works with: Node.js, Express.js, PostgreSQL, Playwright, CI/CD, Sentry",
  "Cut portfolio load time from 1–2 minutes to 600–700 ms at Nimbus",
  "Reduced user-facing production errors by 60% with CI/CD, Playwright tests, and Sentry",
  "Languages: Vietnamese (native), English (intermediate working proficiency)",
];

export const KNOWS_ABOUT = [
  "Frontend engineering",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "TanStack Query",
  "Web3",
  "DeFi",
  "Fintech",
  "Real-time dashboards",
  "WebSocket",
  "Playwright",
  "Node.js",
  "Web performance",
  "Web accessibility",
];

export const SOCIAL_LINKS = {
  email: "binhnnt.98@gmail.com",
  linkedin: "https://www.linkedin.com/in/binh-nguyen-7295b1225",
  github: "https://github.com/binhnguyen2501",
};

export const PAGE_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  about: {
    title: `About Nguyen Binh: Experience, Skills, Education${TITLE_SUFFIX}`,
    description:
      "About Nguyen Binh, a frontend engineer with 4+ years in fintech and Web3: work experience at Nimbus, Eastplayers, and JAMstack Vietnam, toolkit, and education.",
    path: "/about",
  },
  works: {
    title: `Projects and Case Studies${TITLE_SUFFIX}`,
    description:
      "Case studies by Nguyen Binh: Nimbus, LP Agent, Scouty, Mermail, Thomas Rider, Corano Jewelry, Kyyeudreamers, and Social App. Built with React and Next.js.",
    path: "/works",
  },
  notFound: {
    title: `Page Not Found${TITLE_SUFFIX}`,
    description: "The page you are looking for does not exist.",
    path: "",
    noindex: true,
  },
} as const;

export const getCanonicalUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const getAbsoluteUrl = (path: string) => {
  if (path.startsWith("http")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

const clip = (text: string, max = 158) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/[\s,;:.]+\S*$/, "")}…`;

export const getProjectOgImage = (slug: string) => `/og/${slug}.jpg`;

export const getProjectSeo = (slug: string) => {
  const project = WorkDetailList.find((item) => item.url === slug);

  if (!project) {
    return null;
  }

  return {
    title: `${project.title}: ${project.category} Case Study${TITLE_SUFFIX}`,
    description: clip(
      `${project.title} case study by Nguyen Binh (${project.role}). ${project.tagline}`
    ),
    path: `/works/${project.url}`,
    image: getProjectOgImage(project.url),
    imageAlt: `${project.title}: ${project.tagline}`,
    keywords: [
      project.title,
      project.category,
      ...project.techStack,
      AUTHOR_SHORT_NAME,
      JOB_TITLE,
    ].join(", "),
  };
};

const personRef = { "@id": `${SITE_URL}/#person` };

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR_NAME,
  alternateName: [AUTHOR_SHORT_NAME, "Binh Nguyen"],
  givenName: "Binh",
  familyName: "Nguyen",
  jobTitle: JOB_TITLE,
  description: PROFILE_SUMMARY,
  email: `mailto:${SOCIAL_LINKS.email}`,
  url: getCanonicalUrl("/"),
  image: PORTRAIT_IMAGE,
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
  knowsAbout: KNOWS_ABOUT,
  knowsLanguage: ["vi", "en"],
  nationality: { "@type": "Country", name: "Vietnam" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Ho Chi Minh City University of Technology (HCMUT)",
    },
    { "@type": "CollegeOrUniversity", name: "Cao Thang Technical College" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: JOB_TITLE,
    occupationLocation: { "@type": "Country", name: "Vietnam" },
    skills: "React, Next.js, TypeScript, Tailwind CSS, TanStack Query, Node.js",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: AUTHOR_SHORT_NAME,
  url: getCanonicalUrl("/"),
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
  author: personRef,
  publisher: personRef,
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.path),
  })),
});

export const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#profile`,
    url: getCanonicalUrl("/about"),
    name: `About ${AUTHOR_SHORT_NAME}`,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: personRef,
  },
  personJsonLd,
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
];

export const worksJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/works#collection`,
    url: getCanonicalUrl("/works"),
    name: `Projects and case studies by ${AUTHOR_SHORT_NAME}`,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: personRef,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: WorkDetailList.length,
      itemListElement: WorkDetailList.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.tagline,
        url: getCanonicalUrl(`/works/${project.url}`),
      })),
    },
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/works" },
  ]),
];

export const getProjectJsonLd = (slug: string) => {
  const project = WorkDetailList.find((item) => item.url === slug);

  if (!project) {
    return null;
  }

  const url = getCanonicalUrl(`/works/${project.url}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#case-study`,
      name: `${project.title} case study`,
      headline: `${project.title}: ${project.tagline}`,
      description: project.content,
      abstract: project.tagline,
      url,
      image: getAbsoluteUrl(getProjectOgImage(project.url)),
      inLanguage: "en",
      genre: project.category,
      keywords: project.techStack.join(", "),
      author: personRef,
      creator: personRef,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      ...(project.liveUrl
        ? {
            about: {
              "@type": "WebSite",
              name: project.title,
              url: project.liveUrl,
            },
          }
        : {}),
    },
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/works" },
      { name: project.title, path: `/works/${project.url}` },
    ]),
  ];
};

export const SITEMAP_ROUTES = [
  "/",
  "/about",
  "/works",
  ...WorkDetailList.map((project) => `/works/${project.url}`),
];
