import { WorkDetailList } from "./constants";

export const SITE_NAME = "Nguyen Binh Portfolio";
export const AUTHOR_NAME = "Nguyen Ngoc Thanh Binh";
export const AUTHOR_SHORT_NAME = "Nguyen Binh";
export const JOB_TITLE = "Front-end Developer";
export const SITE_URL = "https://binh98.vercel.app";

export const DEFAULT_TITLE = `${AUTHOR_SHORT_NAME} | ${JOB_TITLE}`;
export const TITLE_SUFFIX = ` | ${AUTHOR_SHORT_NAME}`;
export const DEFAULT_DESCRIPTION =
  "Portfolio of Nguyen Ngoc Thanh Binh, a Front-end Developer with 5+ years of experience building user-centric web applications. Explore projects, skills, and work experience.";
export const DEFAULT_KEYWORDS =
  "Nguyen Binh, Nguyen Ngoc Thanh Binh, Front-end Developer, React Developer, TypeScript, Next.js, Web Developer, Portfolio, Vietnam";
export const DEFAULT_OG_IMAGE_PATH = "/me.png";
export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;
export const DEFAULT_OG_IMAGE_ALT =
  "Nguyen Ngoc Thanh Binh, Front-end Developer";
export const DEFAULT_OG_IMAGE_WIDTH = "820";
export const DEFAULT_OG_IMAGE_HEIGHT = "786";

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
    title: `About${TITLE_SUFFIX}`,
    description:
      "Learn about Nguyen Binh — a Front-end Developer with 5+ years of experience in React, TypeScript, and UI/UX. View skills, work experience, and education.",
    path: "/about",
  },
  works: {
    title: `Projects${TITLE_SUFFIX}`,
    description:
      "Selected front-end projects by Nguyen Binh, including Corano Jewelry, Kyyeudreamers, Iron Fitness, and Social App — built with React, Next.js, and modern web technologies.",
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

export const getProjectSeo = (slug: string) => {
  const project = WorkDetailList.find((item) => item.url === slug);

  if (!project) {
    return null;
  }

  return {
    title: `${project.title}${TITLE_SUFFIX}`,
    description: project.content,
    path: `/works/${project.url}`,
    keywords: [...project.techStack, AUTHOR_SHORT_NAME, JOB_TITLE].join(", "),
  };
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  alternateName: AUTHOR_SHORT_NAME,
  jobTitle: JOB_TITLE,
  email: SOCIAL_LINKS.email,
  url: getCanonicalUrl("/"),
  image: DEFAULT_OG_IMAGE,
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: getCanonicalUrl("/"),
  description: DEFAULT_DESCRIPTION,
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
  },
};

export const getProjectJsonLd = (slug: string) => {
  const project = WorkDetailList.find((item) => item.url === slug);

  if (!project) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.content,
    url: getCanonicalUrl(`/works/${project.url}`),
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    keywords: project.techStack.join(", "),
  };
};

export const SITEMAP_ROUTES = [
  "/",
  "/about",
  "/works",
  ...WorkDetailList.map((project) => `/works/${project.url}`),
];
