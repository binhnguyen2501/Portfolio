export const MainWorkList = [
  {
    id: 5,
    url: "Nimbus",
    title: "Nimbus",
    src: require("./assets/images/Nimbus.png"),
    content:
      "Nimbus — a multi-chain Web3 portfolio tracker and yield aggregator that unifies tokens, DeFi positions, NFTs, and yield opportunities across Sui, TON, Solana, Bitcoin, and EVM in one dashboard.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web3 / Multi-chain", "PWA"],
  },
  {
    id: 1,
    url: "CoranoJewelry",
    title: "Corano Jewelry",
    src: require("./assets/images/Corano.png"),
    content:
      "A personal jewelry brand landing page built with HTML, CSS, and vanilla JavaScript, featuring smooth animations and responsive design.",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    url: "Kyyeudreamers",
    title: "Kyyeudreamers",
    src: require("./assets/images/Kyyeudreammer.png"),
    content:
      "A showcase website for a yearbook photography studio, built with Next.js, Tailwind CSS, SCSS, Ant Design, MongoDB, and Firebase.",
    techStack: ["Next.js", "Tailwind CSS", "SCSS", "Ant Design", "MongoDB", "Firebase"],
  },
  {
    id: 4,
    url: "SocialApp",
    title: "Social App",
    src: require("./assets/images/SocialApp.png"),
    content:
      "A full-stack social platform built with Next.js, TanStack Query, NextAuth.js, Tailwind CSS, SCSS, and Prisma with MongoDB.",
    techStack: ["Next.js", "TanStack Query", "NextAuth.js", "Tailwind CSS", "Prisma", "MongoDB"],
  },
];

export interface ProjectFeature {
  title: string;
  body: string;
}

export interface ProjectScreen {
  src: string; // full image, shown in the lightbox
  thumb: string; // 800px card image
  thumbSmall: string; // 400px card image for 1x / small screens
  thumbLarge?: string; // 1100px card image for wide (2-column) cards
  thumbWide?: string; // 1440px card image for full-width cards
  cardRatio?: string; // card aspect ratio when it differs from the full image
  width: number; // intrinsic size of `src`
  height: number;
  caption: string;
  fit?: "contain" | "square"; // contain: full-width card at its natural ratio
}

export interface StackGroup {
  group: string;
  items: string[];
}

export interface ProjectDetail {
  id: number;
  url: string;
  title: string;
  tagline: string;
  content: string; // overview: context + what was built
  accent: string; // flat fill colour
  ink: string; // accent colour readable on white (AA)
  onAccent: string; // text colour on top of the accent fill (AA)
  tintStrength?: number; // % of accent in the soft tint (default 16)
  role: string;
  category: string;
  platform: string;
  status: string;
  liveUrl?: string;
  repoUrl?: string;
  challenge: string;
  approach: string;
  features: ProjectFeature[];
  outcome: string;
  facts: { label: string; value: string }[]; // verifiable outcome facts
  video: string; // 1280px desktop encode
  videoMobile: string; // 720px encode for small screens
  videoHiDpi: string; // high-resolution encode for retina desktops
  videoWebm?: string; // AV1 version of `video`, only where it is smaller
  videoHiDpiWebm?: string; // AV1 version of `videoHiDpi`, only where it is smaller
  videoWidth: number;
  videoHeight: number;
  poster: string;
  posterHiDpi: string; // first frame of the retina encode
  duration: number; // seconds, known before the video loads
  mediaCaption: string;
  demoSteps: string[]; // text alternative for the demo video
  screens: ProjectScreen[];
  stack: StackGroup[];
  techStack: string[];
}

export const WorkDetailList: ProjectDetail[] = [
  {
    id: 5,
    url: "Nimbus",
    title: "Nimbus",
    tagline: "One dashboard for every wallet, token, and DeFi position across chains.",
    content:
      "Nimbus is the multi-chain Web3 portfolio tracker and yield aggregator I work on as a Software Engineer at Nimbus Tech JSC. It pulls token holdings, DeFi positions, NFTs, and real-time PnL from Sui, TON, Solana, Bitcoin, and EVM chains into one dashboard, and pairs it with a yield explorer for finding the next opportunity.",
    accent: "#8fb8ff",
    ink: "#1e5bd8",
    onAccent: "#0b1f4d",
    role: "Software Engineer",
    category: "Web3 product",
    platform: "Web app · PWA",
    status: "Live",
    liveUrl: "https://getnimbus.io",
    challenge:
      "Crypto investors spread assets across many chains, wallets, and protocols. Each one has its own explorer and data format, so seeing a true net worth, PnL, or open DeFi risk means juggling a dozen tabs.",
    approach:
      "Normalise every chain into one portfolio model, then design the UI around the questions users actually ask: what am I worth, where is it, what is it earning, and what should I do next.",
    features: [
      {
        title: "Unified multi-chain portfolio",
        body: "Sui, TON, Solana, Bitcoin, and EVM balances in one view, with multi-wallet bundles that behave like a single account.",
      },
      {
        title: "DeFi positions at a glance",
        body: "Liquidity pools, lending, staking, and vesting with live value, rewards, price ranges, and health signals.",
      },
      {
        title: "Real-time holdings and PnL",
        body: "Live prices and 24h change, realised and unrealised PnL per position, and allocation broken down by chain.",
      },
      {
        title: "Yield explorer",
        body: "Audited pools ranked by APY, TVL, and protocol, with history charts so the next move is easy to compare.",
      },
    ],
    outcome:
      "Nimbus is live at getnimbus.io and installable as a PWA. Working on it taught me how to keep a data-dense interface calm: strong defaults, progressive detail, and one consistent model behind very different chains.",
    facts: [
      { label: "Chains", value: "Sui · TON · Solana · BTC · EVM" },
      { label: "Product areas", value: "Portfolio · DeFi · NFTs · Yields" },
      { label: "Pool tags", value: "Low risk · Stable yield · Airdrop" },
    ],
    video: require("./assets/videos/Nimbus.mp4"),
    videoMobile: require("./assets/videos/Nimbus-mobile.mp4"),
    videoHiDpi: require("./assets/videos/Nimbus-2x.mp4"),
    videoWebm: require("./assets/videos/Nimbus.webm"),
    videoHiDpiWebm: require("./assets/videos/Nimbus-2x.webm"),
    videoWidth: 1280,
    videoHeight: 800,
    poster: require("./assets/videos/Nimbus-poster.webp"),
    posterHiDpi: require("./assets/videos/Nimbus-poster-2x.webp"),
    duration: 11.4,
    mediaCaption:
      "A walkthrough of the getnimbus.io landing page, from the live portfolio preview to the yield section.",
    demoSteps: [
      "Opens on the hero with a live portfolio preview",
      "Scrolls to DeFi positions: pools, lending, and staking in one view",
      "Token holdings with live prices, PnL, and chain breakdown",
      "NFT portfolio with collections and floor prices",
      "Yield optimisation: APY history, audit status, and TVL",
      "Ends on the footer with docs and social links",
    ],
    screens: [
      {
        src: require("./assets/images/WorksNimbus/1.webp"),
        thumb: require("./assets/images/WorksNimbus/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksNimbus/1-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksNimbus/1-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksNimbus/1-thumb-1440.webp"),
        width: 1440,
        height: 1356,
        cardRatio: "1440 / 555",
        caption: "Overview: net worth, breakdown, positions",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksNimbus/2.webp"),
        thumb: require("./assets/images/WorksNimbus/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksNimbus/2-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksNimbus/2-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksNimbus/2-thumb-1440.webp"),
        width: 1440,
        height: 1335,
        cardRatio: "1440 / 810",
        caption: "DeFi positions: Cetus CLMM ranges",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksNimbus/3.webp"),
        thumb: require("./assets/images/WorksNimbus/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksNimbus/3-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksNimbus/3-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksNimbus/3-thumb-1440.webp"),
        width: 1440,
        height: 1410,
        cardRatio: "1440 / 606",
        caption: "Yield explorer: pools by APR and TVL",
        fit: "contain",
      },
    ],
    stack: [
      {
        group: "Front-end",
        items: [
          "Next.js",
          "Tailwind CSS",
          "TanStack Query",
          "Zustand",
          "Radix UI",
          "ECharts",
          "Motion",
        ],
      },
      { group: "Back-end", items: ["PostgreSQL", "Express.js", "Prisma", "Zod"] },
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Radix UI",
      "ECharts",
      "Motion",
      "PostgreSQL",
      "Express.js",
      "Prisma",
      "Zod",
    ],
  },
  {
    id: 6,
    url: "LPAgent",
    title: "LP Agent",
    tagline: "A data terminal for liquidity providers: find the pool, open the position, copy the best wallets.",
    content:
      "LP Agent is the liquidity-provider terminal from Nimbus Tech JSC, and I am in charge of its frontend. It indexes tokens, pools, wallets, and fee streams on Solana and Robinhood Chain, ranks them for LPs in real time, and lets users open or copy a position from the same screen.",
    accent: "#eaff39",
    ink: "#566600",
    onAccent: "#1c2200",
    role: "Frontend owner",
    category: "DeFi terminal",
    platform: "Web app",
    status: "Live",
    liveUrl: "https://lpagent.io",
    challenge:
      "Providing liquidity well means reading a lot of fast-moving data at once: token safety, volume, Fee/TVL, pool depth, and what the best wallets are doing. Spread across explorers and DEX pages, that data arrives too late to act on.",
    approach:
      "Put the whole decision on one screen. Dense, sortable tables for discovery, a pool view with chart, range, and Zap In side by side, and wallet cards that make a track record readable at a glance, all fed by live data.",
    features: [
      {
        title: "Discover",
        body: "Every token worth an LP, ranked by safety, volume, and Fee/TVL across 5m to 24h windows, with a one-tap filter to hide the risky ones.",
      },
      {
        title: "Pool index",
        body: "Meteora and Uniswap pools sorted by Fee/TVL, liquidity, volume, and fees, with filters and configurable columns.",
      },
      {
        title: "Position terminal",
        body: "Price chart, range, and Zap In on one screen, plus position history with fee and PnL analytics.",
      },
      {
        title: "Smart LP copy",
        body: "Wallets scored on win rate, fees earned, and monthly profit, shown as cards or a table and copyable with your own TP/SL.",
      },
    ],
    outcome:
      "LP Agent is live at lpagent.io on Solana and Robinhood Chain. Owning its frontend taught me how to keep very dense, real-time tables fast and readable, and how much clear defaults matter in a trading tool.",
    facts: [
      { label: "Chains", value: "Solana · Robinhood Chain" },
      { label: "Indexing", value: "Meteora DLMM, DAMM v2 · Uniswap v3, v4" },
      { label: "Product areas", value: "Discover · Pools · Smart LP · Portfolio" },
    ],
    video: require("./assets/videos/LPAgent.mp4"),
    videoMobile: require("./assets/videos/LPAgent-mobile.mp4"),
    videoHiDpi: require("./assets/videos/LPAgent-2x.mp4"),
    videoWebm: require("./assets/videos/LPAgent.webm"),
    videoHiDpiWebm: require("./assets/videos/LPAgent-2x.webm"),
    videoWidth: 1280,
    videoHeight: 800,
    poster: require("./assets/videos/LPAgent-poster.webp"),
    posterHiDpi: require("./assets/videos/LPAgent-poster-2x.webp"),
    duration: 13.2,
    mediaCaption:
      "A walkthrough of the lpagent.io landing page, from the hero to the open API section.",
    demoSteps: [
      "Opens on the hero: the data edge for every LP position",
      "The LP stack: Smart Data Index, fastest execution, infra and API",
      "Discover: tokens ranked by safety, volume, and Fee/TVL",
      "Fastest execution: the terminal and its four protection layers",
      "Copy LP: follow a top-scored wallet in one tap",
      "Infrastructure and the open API, with a code sample",
      "Ends on the closing call to launch the terminal",
    ],
    screens: [
      {
        src: require("./assets/images/WorksLPAgent/1.webp"),
        thumb: require("./assets/images/WorksLPAgent/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksLPAgent/1-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksLPAgent/1-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksLPAgent/1-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Discover: tokens ranked for LPs",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksLPAgent/2.webp"),
        thumb: require("./assets/images/WorksLPAgent/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksLPAgent/2-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksLPAgent/2-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksLPAgent/2-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Pools: sorted by Fee/TVL",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksLPAgent/3.webp"),
        thumb: require("./assets/images/WorksLPAgent/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksLPAgent/3-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksLPAgent/3-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksLPAgent/3-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Smart LP: wallets by win rate and PnL",
        fit: "contain",
      },
    ],
    stack: [
      {
        group: "Front-end",
        items: [
          "Next.js",
          "Tailwind CSS",
          "TanStack Query",
          "Zustand",
          "Radix UI",
          "Recharts",
          "Highcharts",
          "Motion",
          "Lodash",
        ],
      },
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Radix UI",
      "Recharts",
      "Highcharts",
      "Motion",
      "Lodash",
    ],
  },
  {
    id: 7,
    url: "Scouty",
    title: "Scouty",
    tagline: "AI prospecting that goes from your website to the right people to a booked meeting.",
    content:
      "Scouty is an AI B2B prospecting and sales outreach product from Nudgen LLC, where I work as a Forward Deployed Engineer. You paste your website; Scouty researches your company, finds companies and decision makers that fit, writes each one a personal email, tracks replies, and books the meeting.",
    accent: "#d4d4d8",
    ink: "#3f3f46",
    onAccent: "#18181b",
    role: "Forward Deployed Engineer",
    category: "AI sales outreach",
    platform: "Web app",
    status: "Live",
    liveUrl: "https://scouty.to",
    challenge:
      "Small teams without a sales function still need a pipeline. Doing it by hand means researching the market, building a lead list, finding verified contacts, writing emails that do not read like a template, and chasing replies, each in a different tool.",
    approach:
      "Start from the one thing every company already has, its website, and run the whole pipeline from there in guided steps. Each step shows its work, so the user can check and edit before anything is sent from their own address.",
    features: [
      {
        title: "Research from a website",
        body: "Scouty reads your site and sums up what you sell, to whom, and why it wins, then maps the competitors selling the same thing.",
      },
      {
        title: "Best-fit companies and people",
        body: "Suggested campaigns, companies scored by fit with location and size, and decision makers with verified work emails.",
      },
      {
        title: "Personal outreach",
        body: "Every person gets an email written for them. Edit it yourself or ask AI to rewrite it your way.",
      },
      {
        title: "Replies and meetings",
        body: "Emails go out from your own address, delivery and replies are tracked in a dashboard, and meetings land on Google Calendar.",
      },
    ],
    outcome:
      "Scouty is live at scouty.to, and anyone can try the research flow with just a website before creating an account.",
    facts: [
      { label: "Flow", value: "Website → prospects → meeting" },
      { label: "Pipeline", value: "8 steps, research to booking" },
      { label: "Sends from", value: "Your own email address" },
    ],
    video: require("./assets/videos/Scouty.mp4"),
    videoMobile: require("./assets/videos/Scouty-mobile.mp4"),
    videoHiDpi: require("./assets/videos/Scouty-2x.mp4"),
    videoWebm: require("./assets/videos/Scouty.webm"),
    videoHiDpiWebm: require("./assets/videos/Scouty-2x.webm"),
    videoWidth: 1280,
    videoHeight: 800,
    poster: require("./assets/videos/Scouty-poster.webp"),
    posterHiDpi: require("./assets/videos/Scouty-poster-2x.webp"),
    duration: 14.8,
    mediaCaption:
      "A walkthrough of the scouty.to landing page, from the hero to the closing call to action.",
    demoSteps: [
      "Opens on the hero: get meetings with the right customers",
      "The pipeline preview: your site, best-fit companies, a personal email",
      "What you get: better-fit prospects, real conversations, meetings",
      "How it works: researching your company and mapping competitors",
      "Finding companies that fit, then the right people",
      "Writing each person an email, sending, and tracking replies",
      "Booking the meeting on Google Calendar",
      "Ends on the closing call to start with your website",
    ],
    screens: [
      {
        src: require("./assets/images/WorksScouty/1.webp"),
        thumb: require("./assets/images/WorksScouty/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksScouty/1-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksScouty/1-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksScouty/1-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Hero: start from your website",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksScouty/2.webp"),
        thumb: require("./assets/images/WorksScouty/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksScouty/2-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksScouty/2-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksScouty/2-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "How it works: research and competitors",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksScouty/3.webp"),
        thumb: require("./assets/images/WorksScouty/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksScouty/3-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksScouty/3-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksScouty/3-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Personal email, sending, and replies",
        fit: "contain",
      },
    ],
    stack: [
      {
        group: "Front-end",
        items: ["Next.js", "Tailwind CSS", "TanStack Query", "Zustand", "shadcn/ui", "GSAP"],
      },
      {
        group: "Back-end",
        items: [
          "Next.js",
          "PostgreSQL",
          "Prisma",
          "Zod",
          "Firebase",
          "BullMQ",
          "OpenAI",
          "Stripe",
        ],
      },
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "shadcn/ui",
      "GSAP",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Firebase",
      "BullMQ",
      "OpenAI",
      "Stripe",
    ],
  },
  {
    id: 8,
    url: "Mermail",
    title: "Mermail",
    tagline: "Email and wallet infrastructure that lets AI agents communicate and transact.",
    content:
      "Mermail is email and wallet infrastructure for AI agents, operated by Nudgen LLC, where I work as a Forward Deployed Engineer. It gives an agent a dedicated inbox through API and MCP, plus an optional Agent Wallet for controlled payments, so teams can build workflows from auto GTM to customer support.",
    accent: "#3fc8c8",
    ink: "#0f6b70",
    onAccent: "#06282b",
    role: "Forward Deployed Engineer",
    category: "AI agent infrastructure",
    platform: "Web app · API · MCP",
    status: "Live",
    liveUrl: "https://mermail.app",
    challenge:
      "An AI agent that can only chat cannot finish real work. To handle a support request or run outreach it needs its own address to send and receive email, and sometimes the ability to pay, without being handed unlimited access to a company's inbox or funds.",
    approach:
      "Give each agent its own inbox first, reachable from the tools developers already use, and add a wallet only when the task needs one. Rules and limits set the boundaries, and the agent pauses to ask when a request falls outside them.",
    features: [
      {
        title: "Dedicated agent inboxes",
        body: "An email identity for each agent, available through the API, MCP, cURL, and a CLI, with setup guides for Codex, Claude Code, and Cursor.",
      },
      {
        title: "Agent Wallet",
        body: "Optional wallet access for controlled payments such as refunds, guarded by limits and payment checks you define.",
      },
      {
        title: "Workflows",
        body: "Worked examples for auto GTM, customer support, travel and stay, and signing up and paying online.",
      },
      {
        title: "Business context",
        body: "Connections to CRM, e-commerce, and support tools bring customer records and order history into the same conversation.",
      },
    ],
    outcome:
      "Mermail is live at mermail.app and also powers the email side of Scouty.",
    facts: [
      { label: "Access", value: "API · MCP · cURL · CLI" },
      { label: "Capabilities", value: "Inbox · Agent Wallet" },
      { label: "Workflows", value: "Auto GTM · Support · Travel · Pay" },
    ],
    video: require("./assets/videos/Mermail.mp4"),
    videoMobile: require("./assets/videos/Mermail-mobile.mp4"),
    videoHiDpi: require("./assets/videos/Mermail-2x.mp4"),
    videoWebm: require("./assets/videos/Mermail.webm"),
    videoHiDpiWebm: require("./assets/videos/Mermail-2x.webm"),
    videoWidth: 1280,
    videoHeight: 800,
    poster: require("./assets/videos/Mermail-poster.webp"),
    posterHiDpi: require("./assets/videos/Mermail-poster-2x.webp"),
    duration: 14.8,
    mediaCaption:
      "A walkthrough of the mermail.app landing page, from the hero to the getting-started steps.",
    demoSteps: [
      "Opens on the hero: an inbox and wallet for your AI agent",
      "A support agent reads an email and issues a refund within set limits",
      "See your agent put it together: the workflow explorer",
      "Auto GTM: follow-ups written from the conversation context",
      "Customer support: answers that know your business",
      "Agent Wallet: every step of a payment accounted for",
      "How to start: create an inbox, add context, set permissions",
      "Ends on the footer",
    ],
    screens: [
      {
        src: require("./assets/images/WorksMermail/1.webp"),
        thumb: require("./assets/images/WorksMermail/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksMermail/1-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksMermail/1-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksMermail/1-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Hero: connect an agent over MCP",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksMermail/2.webp"),
        thumb: require("./assets/images/WorksMermail/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksMermail/2-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksMermail/2-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksMermail/2-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Workflow explorer: auto GTM",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksMermail/3.webp"),
        thumb: require("./assets/images/WorksMermail/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksMermail/3-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksMermail/3-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksMermail/3-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Agent Wallet: a payment, step by step",
        fit: "contain",
      },
    ],
    stack: [
      {
        group: "Front-end",
        items: ["Next.js", "Tailwind CSS", "TanStack Query", "Zustand"],
      },
      {
        group: "Back-end",
        items: [
          "Next.js",
          "PostgreSQL",
          "Prisma",
          "Zod",
          "Firebase",
          "BullMQ",
          "OpenAI",
          "Langfuse",
          "Stripe",
          "Resend",
        ],
      },
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Firebase",
      "BullMQ",
      "OpenAI",
      "Langfuse",
      "Stripe",
      "Resend",
    ],
  },
  {
    id: 9,
    url: "ThomasRider",
    title: "Thomas Rider",
    tagline: "A bilingual storefront for Veldt and Hedon helmets, riding accessories, and classic moto parts in Vietnam.",
    content:
      "Thomas Rider is a Saigon store for classic motorcycles, established in 2016, that sells Veldt and Hedon helmets in Vietnam alongside accessories and parts. I worked on its website as a Forward Deployed Engineer: an editorial storefront in English and Vietnamese with a catalogue, size guide, journal, and gallery.",
    accent: "#c98a5a",
    ink: "#8a4b1f",
    onAccent: "#2a1407",
    role: "Forward Deployed Engineer",
    category: "E-commerce storefront",
    platform: "Website · EN / VI",
    status: "Client project · live",
    liveUrl: "https://thomasrider.co",
    challenge:
      "Premium helmets are bought on trust: riders want to see the finish, understand each maker's sizing, and know the piece is in stock. The site also had to serve two audiences, in English and Vietnamese, and carry a brand built on classic machines rather than a generic shop template.",
    approach:
      "Lead with the product and the brand's voice. Large photography, serif display type, and a warm palette set the tone, then three clear ways in (helmets, lifestyle, moto parts) take visitors to the catalogue, with sizing and fitting guidance close to every helmet.",
    features: [
      {
        title: "Helmet catalogue",
        body: "Veldt and Hedon collections with stock status on every model and a size guide for each maker.",
      },
      {
        title: "Shop by machine",
        body: "Parts grouped by motorcycle: Triumph, BMW Motorrad, and Harley-Davidson, then by material and finish.",
      },
      {
        title: "Journal and gallery",
        body: "Guides on choosing gear and sizes, plus a gallery of machines, helmets, and details from the store.",
      },
      {
        title: "English and Vietnamese",
        body: "The whole site switches between EN and VI from the header.",
      },
    ],
    outcome:
      "The site is live at thomasrider.co, with helmets, accessories, moto parts, the journal, and store contact details all in both languages.",
    facts: [
      { label: "Languages", value: "English · Vietnamese" },
      { label: "Brands", value: "Veldt · Hedon" },
      { label: "Sections", value: "Helmets · Accessories · Moto parts · Journal" },
    ],
    video: require("./assets/videos/ThomasRider.mp4"),
    videoMobile: require("./assets/videos/ThomasRider-mobile.mp4"),
    videoHiDpi: require("./assets/videos/ThomasRider-2x.mp4"),
    videoWebm: require("./assets/videos/ThomasRider.webm"),
    videoHiDpiWebm: require("./assets/videos/ThomasRider-2x.webm"),
    videoWidth: 1280,
    videoHeight: 800,
    poster: require("./assets/videos/ThomasRider-poster.webp"),
    posterHiDpi: require("./assets/videos/ThomasRider-poster-2x.webp"),
    duration: 14.8,
    mediaCaption:
      "A walkthrough of the thomasrider.co homepage, from the hero to the footer.",
    demoSteps: [
      "Opens on the hero: built for the classic life",
      "Three ways in: helmets, classic lifestyle, moto parts",
      "Veldt and Hedon, with links to each shop and the size guide",
      "Accessories: caps, gloves, visors, and more",
      "Shop by machine: Triumph, BMW Motorrad, Harley-Davidson",
      "The house of Thomas Rider: more than a store",
      "Journal: notes from the road",
      "Ends on the contact section and footer",
    ],
    screens: [
      {
        src: require("./assets/images/WorksThomasRider/1.webp"),
        thumb: require("./assets/images/WorksThomasRider/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksThomasRider/1-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksThomasRider/1-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksThomasRider/1-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Hero: built for the classic life",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksThomasRider/2.webp"),
        thumb: require("./assets/images/WorksThomasRider/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksThomasRider/2-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksThomasRider/2-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksThomasRider/2-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Veldt and Hedon helmets",
        fit: "contain",
      },
      {
        src: require("./assets/images/WorksThomasRider/3.webp"),
        thumb: require("./assets/images/WorksThomasRider/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksThomasRider/3-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksThomasRider/3-thumb-1100.webp"),
        thumbWide: require("./assets/images/WorksThomasRider/3-thumb-1440.webp"),
        width: 1440,
        height: 1000,
        cardRatio: "1440 / 810",
        caption: "Shop by machine",
        fit: "contain",
      },
    ],
    stack: [
      {
        group: "Front-end",
        items: ["Next.js", "Tailwind CSS", "TanStack Query", "Zustand", "GSAP", "Radix UI"],
      },
      {
        group: "Back-end",
        items: ["PostgreSQL", "Cloudflare R2", "Express.js", "Prisma", "Zod"],
      },
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "GSAP",
      "Radix UI",
      "PostgreSQL",
      "Cloudflare R2",
      "Express.js",
      "Prisma",
      "Zod",
    ],
  },
  {
    id: 1,
    url: "CoranoJewelry",
    title: "Corano Jewelry",
    tagline: "A complete jewelry storefront homepage, hand\u2011coded with HTML, CSS, and jQuery.",
    content:
      "Corano is a jewelry e-commerce homepage I built from the Corano theme design to master the fundamentals. It covers what a real store needs on one page: search, wishlist and cart counters, a banner slider, new arrivals, product tabs, best sellers, testimonials, a blog, and a newsletter sign-up.",
    accent: "#c29958",
    ink: "#7a5c2c",
    onAccent: "#2b1f0c",
    role: "Front-end Developer",
    category: "E-commerce homepage",
    platform: "Responsive web",
    status: "Personal project",
    liveUrl: "https://corano-webpage.vercel.app",
    repoUrl: "https://github.com/binhnguyen2501/Corano-Webpage",
    challenge:
      "A store homepage packs a lot in: navigation, search, account, wishlist, cart, and several product sections. It has to stay elegant and usable on desktop, tablet, and phone, without the help of a component framework.",
    approach:
      "No single-page framework: semantic HTML, three purpose-built navigation bars (desktop, tablet, mobile) instead of one squeezed layout, jQuery for interactions, Bootstrap for the grid, and WOW.js to reveal sections as you scroll.",
    features: [
      {
        title: "Store-grade header",
        body: "Search, account, wishlist, and cart with live counters, plus dedicated tablet and mobile menus.",
      },
      {
        title: "Banner slider",
        body: "A hand-written slider with previous and next controls to lead with the newest collection.",
      },
      {
        title: "Product discovery",
        body: "New arrivals, tabbed product panels, featured items, and best sellers for different ways to browse.",
      },
      {
        title: "Trust and content",
        body: "Shipping and returns highlights, client testimonials, a blog, and a newsletter sign-up.",
      },
    ],
    outcome:
      "The site is live on Vercel. Building every piece by hand, from sliders to menus, gave me a solid grasp of the DOM, CSS layout, and responsive breakpoints that I still rely on in React.",
    facts: [
      { label: "Menus", value: "Home · Shop · Blog · Pages · Contact" },
      { label: "Store promises", value: "Free shipping · 24/7 support · 30-day returns" },
      { label: "Hosting", value: "Live on Vercel" },
    ],
    video: require("./assets/videos/CoranoMarket.mp4"),
    videoMobile: require("./assets/videos/CoranoMarket-mobile.mp4"),
    videoHiDpi: require("./assets/videos/CoranoMarket-2x.mp4"),
    videoHiDpiWebm: require("./assets/videos/CoranoMarket-2x.webm"),
    videoWidth: 1280,
    videoHeight: 646,
    poster: require("./assets/videos/CoranoMarket-poster.webp"),
    posterHiDpi: require("./assets/videos/CoranoMarket-poster-2x.webp"),
    duration: 93.5,
    mediaCaption:
      "A walkthrough of the live homepage: menus, slider, and product sections.",
    demoSteps: [
      "Opens the Home, Shop, Blog, and Pages menus",
      "Steps through the banner slider",
      "Scrolls the trust bar and new arrivals",
      "Browses product tabs, featured items, and best sellers",
      "Hovers products to reveal quick actions",
      "Reaches the blog, then returns to the hero slider",
    ],
    screens: [
      {
        src: require("./assets/images/WorksCorano/1.webp"),
        thumb: require("./assets/images/WorksCorano/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksCorano/1-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksCorano/1-thumb-1100.webp"),
        width: 1440,
        height: 2434,
        caption: "Homepage: hero and new arrivals",
      },
      {
        src: require("./assets/images/WorksCorano/2.webp"),
        thumb: require("./assets/images/WorksCorano/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksCorano/2-thumb-400.webp"),
        thumbLarge: require("./assets/images/WorksCorano/2-thumb-1100.webp"),
        width: 1440,
        height: 2966,
        caption: "Products, testimonials, blog, and footer",
      },
      {
        src: require("./assets/images/WorksCorano/3.webp"),
        thumb: require("./assets/images/WorksCorano/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksCorano/3-thumb-400.webp"),
        width: 780,
        height: 5600,
        caption: "Mobile layout with its own header",
      },
    ],
    stack: [
      { group: "Core", items: ["HTML", "CSS", "JavaScript"] },
      { group: "Libraries", items: ["jQuery", "Bootstrap", "WOW.js"] },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "WOW.js"],
  },
  {
    id: 2,
    url: "Kyyeudreamers",
    title: "Kyyeudreamers",
    tagline: "A showcase site and admin tool for a yearbook photography studio.",
    content:
      "Kyyeudreamers is a yearbook photography studio in Vietnam. I built its public website, where students discover the studio and browse albums, and an admin dashboard where the team manages that content without touching code.",
    accent: "#abffb2",
    ink: "#1f7a3a",
    onAccent: "#0d3318",
    role: "Full-stack Developer",
    category: "Studio website",
    platform: "Web · Admin dashboard",
    status: "Client project · not public",
    challenge:
      "The studio needed to be found when students search for yearbook photographers, show off its albums beautifully, and keep the site up to date without calling a developer every time.",
    approach:
      "Two surfaces on one stack: server-rendered Next.js pages for SEO, and an Ant Design admin backed by MongoDB, with photos stored in Firebase.",
    features: [
      {
        title: "SEO-first pages",
        body: "Server-rendered routes with clean metadata so the studio shows up when students search.",
      },
      {
        title: "Photo-led albums",
        body: "Concept and featured-album carousels, plus a full-bleed moments gallery for every shoot.",
      },
      {
        title: "Self-serve admin",
        body: "An Ant Design back office with tables and forms for managing albums and content.",
      },
      {
        title: "Split storage",
        body: "Large images live in Firebase Storage while structured content lives in MongoDB.",
      },
    ],
    outcome:
      "The studio got a site it can run on its own. For me, it was the first project where I owned both the public experience and the internal tool, and designed the data so both stay simple.",
    facts: [
      { label: "Surfaces", value: "Public site + admin dashboard" },
      { label: "Pricing", value: "3 packages · 109K–189K VND" },
      { label: "Content updates", value: "Self-serve by the studio" },
    ],
    video: require("./assets/videos/Kyyeudreamer.mp4"),
    videoMobile: require("./assets/videos/Kyyeudreamer-mobile.mp4"),
    videoHiDpi: require("./assets/videos/Kyyeudreamer-2x.mp4"),
    videoWidth: 1280,
    videoHeight: 584,
    poster: require("./assets/videos/Kyyeudreamer-poster.webp"),
    posterHiDpi: require("./assets/videos/Kyyeudreamer-poster-2x.webp"),
    duration: 120.5,
    mediaCaption:
      "A walkthrough of the public site: concept albums, featured shoots, and pricing.",
    demoSteps: [
      "Opens on the hero and studio introduction",
      "Browses concept albums in a carousel",
      "Scrolls the featured-albums slider",
      "Views the moments gallery",
      "Reads the pricing packages",
      "Ends on the contact section",
    ],
    screens: [
      {
        src: require("./assets/images/WorksKyyeudreamer/1.webp"),
        thumb: require("./assets/images/WorksKyyeudreamer/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksKyyeudreamer/1-thumb-400.webp"),
        width: 1440,
        height: 2456,
        caption: "Public homepage",
      },
      {
        src: require("./assets/images/WorksKyyeudreamer/2.webp"),
        thumb: require("./assets/images/WorksKyyeudreamer/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksKyyeudreamer/2-thumb-400.webp"),
        width: 1440,
        height: 3085,
        caption: "Albums, pricing, and contact",
      },
      {
        src: require("./assets/images/WorksKyyeudreamer/3.webp"),
        thumb: require("./assets/images/WorksKyyeudreamer/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksKyyeudreamer/3-thumb-400.webp"),
        width: 1440,
        height: 786,
        caption: "Admin: album manager",
        fit: "contain",
      },
    ],
    stack: [
      { group: "Front-end", items: ["Next.js", "Ant Design"] },
      { group: "Styling", items: ["Tailwind CSS", "SCSS"] },
      { group: "Data & storage", items: ["MongoDB", "Firebase"] },
    ],
    techStack: ["Next.js", "Tailwind CSS", "SCSS", "Ant Design", "MongoDB", "Firebase"],
  },
  {
    id: 4,
    url: "SocialApp",
    title: "Social App",
    tagline: "A full-stack social platform with posts, comments, and hearts.",
    content:
      "Social App is a full-stack project I built to own a product end to end. Users sign in, publish posts, comment, and heart other people's posts, and manage everything they have written from a personal dashboard.",
    accent: "#e60112",
    ink: "#c40010",
    onAccent: "#ffffff",
    tintStrength: 8,
    role: "Full-stack Developer",
    category: "Social platform",
    platform: "Web app",
    status: "Personal project",
    liveUrl: "https://social-app-project.vercel.app",
    repoUrl: "https://github.com/binhnguyen2501/social-app",
    challenge:
      "Go beyond the front end and own the whole product: authentication, data modelling, caching, and UI. Every layer had to work with the others, so a bug in one showed up everywhere.",
    approach:
      "Next.js for pages and API routes, NextAuth.js for sign-in, Prisma models on MongoDB, and TanStack Query so lists update the moment a post, comment, or heart changes.",
    features: [
      {
        title: "Sign-in with NextAuth.js",
        body: "Email and password, or one click with GitHub, Google, or Facebook, with sessions stored through Prisma.",
      },
      {
        title: "Posts, comments, hearts",
        body: "A relational model with cascade deletes, so removing a post cleans up its comments and hearts.",
      },
      {
        title: "Instant updates",
        body: "TanStack Query mutations invalidate the right queries, so the feed refreshes without a reload.",
      },
      {
        title: "Personal dashboard",
        body: "A private page where each user sees, edits, and deletes their own posts.",
      },
    ],
    outcome:
      "The app is live on Vercel. It was my first time designing a schema, auth flow, and cache strategy together, and it changed how I think about front-end state.",
    facts: [
      { label: "Sign-in options", value: "Email · 3 OAuth providers" },
      { label: "Data models", value: "User · Post · Comment · Heart" },
      { label: "Hosting", value: "Live on Vercel" },
    ],
    video: require("./assets/videos/SocialApp.mp4"),
    videoMobile: require("./assets/videos/SocialApp-mobile.mp4"),
    videoHiDpi: require("./assets/videos/SocialApp-2x.mp4"),
    videoWebm: require("./assets/videos/SocialApp.webm"),
    videoHiDpiWebm: require("./assets/videos/SocialApp-2x.webm"),
    videoWidth: 1280,
    videoHeight: 730,
    poster: require("./assets/videos/SocialApp-poster.webp"),
    posterHiDpi: require("./assets/videos/SocialApp-poster-2x.webp"),
    duration: 105.5,
    mediaCaption:
      "A walkthrough of the live app: signing up, posting, commenting, and hearting.",
    demoSteps: [
      "Signs up for a new account",
      "Signs in, including a wrong-password error",
      "Creates a new post from the composer",
      "Edits a post from the personal dashboard",
      "Opens a post, then adds and edits a comment",
      "Deletes a comment and signs out",
    ],
    screens: [
      {
        src: require("./assets/images/WorksSocialApp/1.webp"),
        thumb: require("./assets/images/WorksSocialApp/1-thumb.webp"),
        thumbSmall: require("./assets/images/WorksSocialApp/1-thumb-400.webp"),
        width: 1440,
        height: 1471,
        caption: "Sign in with email or social accounts",
      },
      {
        src: require("./assets/images/WorksSocialApp/2.webp"),
        thumb: require("./assets/images/WorksSocialApp/2-thumb.webp"),
        thumbSmall: require("./assets/images/WorksSocialApp/2-thumb-400.webp"),
        width: 1440,
        height: 1727,
        caption: "Feed with composer and hearts",
      },
      {
        src: require("./assets/images/WorksSocialApp/3.webp"),
        thumb: require("./assets/images/WorksSocialApp/3-thumb.webp"),
        thumbSmall: require("./assets/images/WorksSocialApp/3-thumb-400.webp"),
        width: 1267,
        height: 1353,
        caption: "Post detail with comments",
      },
    ],
    stack: [
      { group: "Front-end", items: ["Next.js", "TanStack Query"] },
      { group: "Styling", items: ["Tailwind CSS", "SCSS"] },
      { group: "Auth & data", items: ["NextAuth.js", "Prisma", "MongoDB"] },
    ],
    techStack: ["Next.js", "TanStack Query", "NextAuth.js", "Tailwind CSS", "SCSS", "Prisma", "MongoDB"],
  },
];

export const WorkList = [
  {
    id: 5,
    url: "Nimbus",
    title: "Nimbus",
    src: require("./assets/images/Nimbus.png"),
    content:
      "Nimbus is a multi-chain Web3 portfolio tracker and yield aggregator built at Nimbus Tech JSC. It brings token holdings, DeFi positions (liquidity pools, lending, staking), NFT collections, and real-time PnL across Sui, TON, Solana, Bitcoin, and EVM chains into a single dashboard, plus a yield explorer that ranks audited pools by APY, TVL, and risk.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web3 / Multi-chain", "PWA"],
  },
  {
    id: 1,
    url: "CoranoJewelry",
    title: "Corano Jewelry",
    src: require("./assets/images/Corano.png"),
    content:
      "A personal jewelry brand landing page built with HTML, CSS, and vanilla JavaScript, featuring smooth animations and a fully responsive experience across devices.",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    url: "Kyyeudreamers",
    title: "Kyyeudreamers",
    src: require("./assets/images/Kyyeudreammer.png"),
    content:
      "A showcase website for Kyyeudreamers, a yearbook photography studio in Vietnam, built with Next.js for SEO, Tailwind CSS, SCSS, Ant Design, MongoDB, and Firebase.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "SCSS",
      "Ant Design",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    id: 4,
    url: "SocialApp",
    title: "Social App",
    src: require("./assets/images/SocialApp.png"),
    content:
      "A full-stack social platform built with Next.js, TanStack Query, NextAuth.js, Tailwind CSS, SCSS, and Prisma with MongoDB, created to strengthen end-to-end product development skills.",
    techStack: [
      "Next.js",
      "TanStack Query",
      "NextAuth.js",
      "Tailwind CSS",
      "SCSS",
      "Prisma",
      "MongoDB",
    ],
  },
];

export const SkillCategories: { category: string; items: string[] }[] = [
  {
    category: "Core web",
    items: ["HTML", "CSS", "SCSS", "JavaScript (ES6+)", "TypeScript"],
  },
  { category: "Frameworks", items: ["React", "Next.js", "Vue.js", "Nuxt.js"] },
  { category: "Backend", items: ["Node.js", "Express.js", "PostgreSQL"] },
  {
    category: "State",
    items: ["Zustand", "TanStack Query", "React Context API"],
  },
  { category: "Forms", items: ["Zod", "React Hook Form"] },
  { category: "UI libraries", items: ["Ant Design", "shadcn/ui", "Material UI"] },
  { category: "Styling", items: ["Tailwind CSS", "SCSS", "Styled Components"] },
  { category: "Testing & delivery", items: ["Playwright", "CI/CD", "Sentry"] },
  {
    category: "AI-assisted",
    items: ["Cursor IDE", "Claude", "Claude Skills", "Codex", "MCP"],
  },
];

export interface Experience {
  company: string;
  site: string;
  kind: string;
  role: string;
  start: string;
  end: string;
  /** Extra line under the role, e.g. contract history */
  note?: string;
  /** Short description of the products / domain */
  summary?: string;
  /** Case study on this site */
  caseStudy?: string;
  highlights: string[];
}

export const ExperienceList: Experience[] = [
  {
    company: "Nimbus Tech JSC",
    site: "https://getnimbus.io",
    kind: "Product startup",
    role: "Software Engineer",
    start: "Mar 2022",
    end: "Jun 2026",
    note: "Contract Mar 2022 – Mar 2023, full-time from Apr 2023",
    summary:
      "GetNimbus and LP Agent: blockchain fintech covering DeFi, digital asset management, liquidity protocols, and real-time market data.",
    caseStudy: "Nimbus",
    highlights: [
      "Owned end-to-end frontend delivery for GetNimbus and LP Agent with Next.js, TypeScript, and Tailwind CSS, serving 1,000+ daily active users.",
      "Built multi-chain portfolio tracking across Solana, Sui, TON, and Bitcoin with 50+ integrated protocols in one interface.",
      "Cut portfolio load time from 1–2 minutes to 600–700 ms and API requests by ~70% with a TanStack Query caching strategy.",
      "Built real-time dashboards and candlestick charts on WebSocket price feeds, plus LP Agent analytics across Meteora, Orca, Raydium, and Uniswap.",
      "Reduced user-facing production errors by 60% with a frontend CI/CD pipeline, Playwright end-to-end tests, and Sentry monitoring.",
      "Worked directly with founders, product, and design; coordinated releases, reviewed code, and mentored 2 frontend developers.",
      "Extended the backend with Express.js endpoints, Mintlify API docs, and MoonPay subscriptions and recurring payments.",
    ],
  },
  {
    company: "Eastplayers",
    site: "https://eastplayers.io",
    kind: "Software outsourcing",
    role: "Frontend Developer",
    start: "Mar 2022",
    end: "Mar 2023",
    highlights: [
      "Built an SEO-friendly crypto trading platform in Next.js for a Singapore-based client, serving 200+ daily active users.",
      "Built a React admin dashboard for a fresh-produce business: orders, inventory, suppliers, and revenue reporting.",
      "Created reusable Ant Design and Tailwind CSS components that kept client interfaces consistent and easy to maintain.",
    ],
  },
  {
    company: "JAMstack Vietnam",
    site: "https://jamstackvietnam.com",
    kind: "Software outsourcing",
    role: "Frontend Intern",
    start: "Jul 2021",
    end: "Oct 2021",
    highlights: [
      "Built responsive, mobile-first, API-connected layouts with Vue.js, Tailwind CSS, and SCSS.",
      "Presented features to clients and cross-functional teams in sprint reviews.",
      "Earned excellent internship evaluations and a full-time return offer.",
    ],
  },
];

export const EducationList = [
  {
    school: "Ho Chi Minh City University of Technology (HCMUT)",
    program: "Control Engineering and Automation · part-time",
    years: "2020–2023",
    grade: "Good",
  },
  {
    school: "Cao Thang Technical College",
    program: "Control Engineering and Automation · full-time",
    years: "2016–2019",
    grade: "Good",
  },
];
