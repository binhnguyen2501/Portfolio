import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

import { ProjectDetail, WorkDetailList } from "@/constants";
import { TILE_LOGOS, WIPES } from "@/components/projectBrand";
import Footer from "@/components/Footer";
import HighlightTitle from "@/components/HighlightTitle";
import Seo from "@/components/Seo";
import { PAGE_SEO, worksJsonLd } from "@/seo";
import { CustomCursorContext } from "@/contexts/CustomCursorContext";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);

/* ---------- Data helpers ---------- */

type Kind = "Product" | "Client" | "Personal";
type Filter = "All" | Kind;
const FILTERS: Filter[] = ["All", "Product", "Client", "Personal"];

const kindOf = (work: ProjectDetail): Kind =>
  work.status.startsWith("Client")
    ? "Client"
    : work.status.startsWith("Personal")
    ? "Personal"
    : "Product";

const pad = (n: number) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Flat building blocks ---------- */

const Page = styled.div`
  color: #1a1a1a;
  -webkit-user-select: text;
  user-select: text;

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid #b23d43;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-delay: 0s !important;
    }
  }

  /* Never print an empty list because a scroll reveal hasn't run yet. */
  @media print {
    .js-row,
    .js-cta,
    .js-fade {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

const Row = styled(Link)`
  position: relative;
  display: grid;
  isolation: isolate;
  color: inherit;
  text-decoration: none;

  /* The tint bleeds past the text column; rules and text stay on the grid. */
  &::before {
    content: "";
    position: absolute;
    inset: 0 -12px;
    background: var(--wipe, #f6f6f4);
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
    z-index: -1;
  }

  @media (min-width: 768px) {
    &::before {
      inset: 0 -16px;
    }
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleX(1);
  }

  /* The focus ring is drawn on the tint itself, so ring and tint match. */
  &&:focus-visible {
    outline: none;
  }

  &:focus-visible::before {
    box-shadow: inset 0 0 0 2px #b23d43;
  }

  .row-title {
    transition: color 400ms ease;
  }

  &:hover .row-title,
  &:focus-visible .row-title {
    color: var(--ink);
  }

  .row-arrow {
    transition: transform 500ms cubic-bezier(0.77, 0, 0.175, 1),
      background-color 400ms ease, color 400ms ease, border-color 400ms ease;
  }

  &:hover .row-arrow,
  &:focus-visible .row-arrow {
    transform: translateX(6px);
    background: var(--ink);
    border-color: var(--ink);
    color: #fff;
  }

  .tile {
    transition: border-color 400ms ease, background-color 400ms ease;
  }

  &:hover .tile,
  &:focus-visible .tile {
    border-color: var(--ink);
    background-color: #fff;
  }

  .tile-logo {
    transition: transform 500ms cubic-bezier(0.77, 0, 0.175, 1),
      filter 400ms ease;
  }

  /* Crisp greys at rest where hover can bring the colour back (mouse or
     trackpad); touch screens show the brand colour all the time. */
  @media (hover: hover) and (pointer: fine) {
    .tile-logo {
      filter: var(--rest-filter, grayscale(1) contrast(1.1));
    }
  }

  &:hover .tile-logo,
  &:focus-visible .tile-logo {
    transform: scale(1.08);
    filter: none;
  }

  /* Marks whose brand colours would clash with the row's tint stay mono. */
  && .tile-logo[data-mono] {
    filter: var(--rest-filter);
  }
`;

const Eyebrow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`text-xs font-bold uppercase tracking-[0.06em] sm:tracking-[0.14em] text-[#646464] ${className}`}
  >
    {children}
  </span>
);

/* ---------- Project tile: the homepage slider logos on a flat card ---------- */

const Tile = ({ work }: { work: ProjectDetail }) => {
  const logo = TILE_LOGOS[work.url];
  return (
    <div
      aria-hidden
      className="tile relative aspect-square w-full overflow-hidden rounded-xl md:rounded-2xl border border-[#e8e8e8] bg-[#f7f7f7] flex items-center justify-center"
    >
      {logo && (
        <img
          src={logo.src}
          alt=""
          loading="lazy"
          decoding="async"
          data-mono={logo.mono || undefined}
          style={
            {
              "--s": logo.scale,
              "--rest-filter": logo.rest,
            } as React.CSSProperties
          }
          className="tile-logo object-contain w-[calc(min(var(--s)*1.3,0.9)*100%)] h-[calc(min(var(--s)*1.3,0.9)*100%)] md:w-[calc(var(--s)*100%)] md:h-[calc(var(--s)*100%)]"
        />
      )}
    </div>
  );
};

/* ---------- Page ---------- */

const Works: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);
  const root = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  // The pressed tab follows the user's latest click immediately, even while a
  // leave-fade is still running.
  const [selected, setSelected] = useState<Filter>("All");
  const requested = useRef<Filter>("All");
  const filtering = useRef(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: WorkDetailList.length };
    WorkDetailList.forEach((w) => {
      const k = kindOf(w);
      c[k] = (c[k] ?? 0) + 1;
    });
    return c;
  }, []);

  const visible = WorkDetailList.filter(
    (w) => filter === "All" || kindOf(w) === filter
  );

  const hover = {
    onMouseEnter: () => setType("hover-item"),
    onMouseLeave: () => setType("default"),
  };

  const changeFilter = (next: Filter) => {
    setSelected(next);
    requested.current = next;
    // A fade is in flight: its commit will apply the latest request.
    if (filtering.current || !listRef.current) return;
    if (next === filter) return;
    const rows = Array.from(listRef.current.children) as HTMLElement[];
    const commit = () => {
      filtering.current = false;
      // The user switched back to the current filter mid-fade: just undo it.
      if (requested.current === filter) {
        gsap.to(rows, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" });
        return;
      }
      if (listRef.current) {
        // Hold the list's height so a shorter list can't clamp the scroll
        // position mid-transition; it is released smoothly after Flip.
        listRef.current.style.minHeight = `${listRef.current.offsetHeight}px`;
        flipState.current = Flip.getState(listRef.current.children);
      }
      setFilter(requested.current);
    };
    // Rows that are about to disappear fade out while they are still in the
    // layout; only then is the filter applied and the rest re-flowed by Flip.
    const leaving = rows.filter(
      (row, i) =>
        !row.hidden && next !== "All" && kindOf(WorkDetailList[i]) !== next
    );
    if (!leaving.length || prefersReducedMotion()) {
      commit();
      return;
    }
    filtering.current = true;
    gsap.to(leaving, {
      opacity: 0,
      y: -16,
      duration: 0.25,
      ease: "power2.in",
      onComplete: commit,
    });
  };

  // After a filter change: every row stays mounted; Flip re-flows the rest
  // and ScrollTriggers are re-measured because the page height changed.
  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    const list = listRef.current;
    if (!state || !list) return;
    const rows = Array.from(list.children) as HTMLElement[];
    gsap.set(rows, { clearProps: "opacity,visibility,transform" });
    const release = () => {
      // Ease the held height down to the list's natural height (summed from
      // the rows: un-setting min-height to measure would clamp the scroll).
      const natural = rows.reduce(
        (sum, row) => sum + (row.hidden ? 0 : row.offsetHeight),
        0
      );
      gsap.to(list, {
        minHeight: natural,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(list, { clearProps: "minHeight" });
          ScrollTrigger.refresh();
        },
      });
    };
    if (prefersReducedMotion()) {
      gsap.set(list, { clearProps: "minHeight" });
      ScrollTrigger.refresh();
      return;
    }
    // The page height settles while the rows reflow, not afterwards.
    release();
    Flip.from(state, {
      targets: rows,
      duration: 0.5,
      ease: "power3.out",
      // Leaving rows are already faded out, so nothing needs to be lifted
      // out of the flow; returning rows simply fade in where they belong.
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
            stagger: 0.06,
            // wait until the rows that stay have moved out of the way
            delay: 0.35,
          }
        ),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";

        // Sequenced intro: the red title's own flash (≈1s CSS) first, then the
        // h1 by word, then the lede and filters.
        SplitText.create(".js-title", {
          type: "words",
          mask: "words",
          aria: "none",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: 0.9,
              ease,
              stagger: 0.04,
              delay: 0.35,
            }),
        });

        gsap.from(".js-fade", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease,
          stagger: 0.08,
          delay: 0.55,
        });

        // Opacity only — visibility:hidden would drop links from the tab order.
        gsap.set(".js-row, .js-cta", { opacity: 0, y: 40 });

        // A keyboard user tabbing ahead of the scroll reveal sees the item at once.
        const onFocusIn = (e: FocusEvent) => {
          const el = (e.target as HTMLElement).closest(".js-row, .js-cta");
          if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
        };
        const node = root.current;
        node?.addEventListener("focusin", onFocusIn);

        // Rows visible at load wait for the intro (title → h1 → lede/filters);
        // rows revealed later by scrolling start straight away.
        const started = performance.now();
        const INTRO_END = 0.65;
        ScrollTrigger.batch(".js-row", {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease,
              stagger: 0.1,
              delay: Math.max(0, INTRO_END - (performance.now() - started) / 1000),
            }),
        });

        ScrollTrigger.create({
          trigger: ".js-cta",
          start: "top 95%",
          once: true,
          onEnter: () =>
            gsap.to(".js-cta", { opacity: 1, y: 0, duration: 1, ease }),
        });

        return () => node?.removeEventListener("focusin", onFocusIn);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <Page ref={root}>
      <Seo
        title={PAGE_SEO.works.title}
        description={PAGE_SEO.works.description}
        path={PAGE_SEO.works.path}
        image={PAGE_SEO.works.image}
        imageAlt={PAGE_SEO.works.imageAlt}
        jsonLd={worksJsonLd}
      />

      <main className="lg:px-[8%] md:px-[4%] px-[8%]">
        {/* Intro */}
        <section className="pt-8 md:pt-10 pb-8 md:pb-10">
          {/* Original highlighted title with its own flash + underline effect */}
          <div aria-hidden="true">
            <HighlightTitle title="Selected Projects," />
          </div>
          <h1 className="mt-4 md:mt-5 max-w-[900px] text-[clamp(2rem,2vw+1.25rem,2.75rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-pretty">
            <span className="sr-only">
              Selected Projects: dashboards, storefronts, and web apps I&rsquo;ve
              built.
            </span>
            <span aria-hidden className="js-title block">
              Dashboards, storefronts, and web apps I&rsquo;ve built.
            </span>
          </h1>
          <p className="js-fade mt-4 md:mt-5 max-w-[640px] lg:max-w-[min(640px,60ch)] text-lg md:text-xl leading-snug text-[#3d3d3d] text-pretty">
            Product work, client sites, and personal builds. Each case study
            covers the problem, the approach, and the result.
          </p>
        </section>

        {/* Index */}
        <section aria-labelledby="index-heading">
          <div className="js-fade flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pb-2 border-b border-[#e6e6e6]">
            <h2 id="index-heading" className="text-sm font-bold text-[#1a1a1a]">
              Case studies
            </h2>
            <div
              role="group"
              aria-label="Filter case studies by type"
              className="flex flex-nowrap gap-x-3 min-[360px]:gap-x-4 sm:gap-x-5 max-sm:w-full max-sm:pr-1 max-sm:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {FILTERS.map((name) => {
                const active = selected === name;
                const count = counts[name] ?? 0;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={active}
                    disabled={count === 0}
                    onClick={() => changeFilter(name)}
                    className={`relative shrink-0 inline-flex items-baseline gap-1.5 h-10 text-sm font-bold transition-colors after:absolute after:left-0 after:right-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:transition-colors ${
                      active
                        ? "text-[#1a1a1a] after:bg-[#1a1a1a]"
                        : "text-[#646464] hover:text-[#1a1a1a] after:bg-transparent hover:after:bg-[#c4c4c4]"
                    }`}
                    {...hover}
                  >
                    <span className="self-center">{name}</span>
                    <span className="sr-only">, </span>
                    <span className="self-center font-mono text-xs font-semibold text-[#646464]">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {`Showing ${visible.length} ${
              visible.length === 1 ? "case study" : "case studies"
            }`}
          </p>

          <ol ref={listRef} aria-label="Case studies">
            {WorkDetailList.map((work) => {
              const shown = filter === "All" || kindOf(work) === filter;
              // Numbers follow what is on screen, so a filtered list reads 01, 02…
              const number = visible.indexOf(work) + 1;
              const id = `case-${work.url}`;
              return (
                <li
                  key={work.url}
                  data-flip-id={work.url}
                  hidden={!shown}
                  className="js-row"
                >
                  <Row
                    to={`/works/${work.url}`}
                    aria-labelledby={`${id}-title`}
                    aria-describedby={`${id}-meta ${id}-tagline`}
                    style={
                      {
                        "--accent": work.accent,
                        "--ink": work.ink,
                        "--wipe": WIPES[work.url],
                      } as React.CSSProperties
                    }
                    className="border-b border-[#e6e6e6] grid-cols-[56px_1fr] min-[360px]:grid-cols-[72px_1fr] sm:grid-cols-[112px_1fr] md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_140px] xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_160px] gap-x-4 min-[360px]:gap-x-5 md:gap-x-10 gap-y-3 py-7 md:py-8 items-center lg:items-start"
                    {...hover}
                  >
                    {/* Tile: first on phones, last from md */}
                    <div className="md:order-last max-md:self-start max-md:mt-1">
                      <Tile work={work} />
                    </div>

                    {/* Column 1: number, category, title, tagline */}
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p
                          id={`${id}-meta`}
                          className="min-w-0 flex items-baseline gap-x-3 pt-1.5 sm:pt-0"
                        >
                          <Eyebrow className="shrink-0 font-mono !tracking-normal max-[359px]:hidden">
                            <span aria-hidden>{pad(number)}</span>
                          </Eyebrow>
                          <Eyebrow className="max-[359px]:!tracking-normal">
                            {work.category}
                          </Eyebrow>
                          <span className="sr-only">{`, ${work.status}`}</span>
                        </p>
                        <span
                          aria-hidden
                          className="sm:hidden row-arrow shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#1a1a1a] text-sm font-bold"
                        >
                          →
                        </span>
                      </div>
                      <h3
                        id={`${id}-title`}
                        className="row-title mt-2 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.05] font-extrabold tracking-[-0.02em]"
                      >
                        {work.title}
                        <span
                          aria-hidden
                          className="hidden sm:inline-flex row-arrow ml-3 align-middle relative -top-[0.06em] items-center justify-center w-9 h-9 rounded-full border border-[#1a1a1a] text-base font-bold tracking-normal"
                        >
                          →
                        </span>
                      </h3>
                      <p
                        id={`${id}-tagline`}
                        className="mt-2.5 max-w-[46ch] text-base md:text-[17px] leading-snug text-[#3d3d3d] text-pretty"
                      >
                        {work.tagline}
                      </p>

                      {/* Details below the tagline until lg, then in column 2 */}
                      <p className="min-[360px]:hidden mt-3 text-[13px] leading-snug">
                        <span className="block font-bold">{work.role}</span>
                        <span className="block text-[#3d3d3d]">
                          <Segments parts={work.status.split(" · ")} />
                        </span>
                      </p>
                      <Details
                        work={work}
                        className="mt-4 max-[359px]:hidden sm:hidden"
                        maxStack={2}
                      />
                      <Details work={work} className="mt-4 hidden sm:grid lg:hidden" />
                    </div>

                    {/* Column 2 (lg): role, status, stack */}
                    <Details work={work} className="hidden lg:grid xl:hidden" maxStack={3} maxChars={30} />
                    <Details work={work} className="hidden xl:grid" maxStack={99} />
                  </Row>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Closing CTA */}
        <section className="js-cta py-16 md:py-24 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <p className="mt-3 text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance max-w-[640px]">
              Have a product that needs a careful front end?
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start md:self-end">
            <a
              href="mailto:binhnnt.98@gmail.com?subject=Project%20enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#b23d43] transition-colors"
              {...hover}
            >
              Start a project <span aria-hidden>→</span>
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a1a1a] px-6 py-3.5 text-sm font-bold hover:border-[#b23d43] hover:text-[#b23d43] transition-colors"
              {...hover}
            >
              About me
            </Link>
          </div>
        </section>
      </main>

      <div className="border-t border-[#e6e6e6]">
        <Footer />
      </div>
    </Page>
  );
};

/* Joins parts with " · " and only lets lines break before a separator, so a
   wrapped line starts with "· Next item" and no item is split in two. */
const Segments = ({ parts, suffix }: { parts: string[]; suffix?: string }) => (
  <>
    {parts.map((t, i) => (
      <React.Fragment key={t}>
        {i > 0 && " "}
        <span className="whitespace-nowrap">
          {i > 0 && "· "}
          {t}
          {i === parts.length - 1 && suffix}
        </span>
      </React.Fragment>
    ))}
  </>
);

/* ---------- Row details: role, status, stack as one quiet list ---------- */

const Details = ({
  work,
  className = "",
  maxStack = 3,
  maxChars = Infinity,
}: {
  work: ProjectDetail;
  className?: string;
  maxStack?: number;
  /** Fit as many items as stay within this many characters (one line). */
  maxChars?: number;
}) => {
  const shownStack = work.techStack
    .slice(0, maxStack)
    .filter(
      (_, i, all) =>
        i === 0 || all.slice(0, i + 1).join(" · ").length <= maxChars
    );
  const more = work.techStack.length - shownStack.length;
  const items = [
    { label: "Role", value: work.role },
    { label: "Status", value: <Segments parts={work.status.split(" · ")} /> },
    {
      label: "Stack",
      value: (
        <Segments
          parts={shownStack}
          suffix={more > 0 ? ` +${more}` : undefined}
        />
      ),
    },
  ];
  return (
    <dl
      className={`grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr] gap-x-3 gap-y-1.5 text-[13px] leading-snug ${className}`}
    >
      {items.map((item) => (
        <React.Fragment key={item.label}>
          <dt className="text-[#646464]">{item.label}</dt>
          <dd
            className={
              item.label === "Role" ? "font-bold text-[#1a1a1a]" : "text-[#3d3d3d]"
            }
          >
            {item.value}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

export default Works;
