import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

import { ExperienceList, ProjectDetail, WorkDetailList } from "@/constants";
import Footer from "@/components/Footer";
import HighlightTitle from "@/components/HighlightTitle";
import Seo from "@/components/Seo";
import { PAGE_SEO } from "@/seo";
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
    }
  }
`;

const Row = styled(Link)`
  --wipe: color-mix(in srgb, var(--accent) 12%, #ffffff);
  position: relative;
  display: grid;
  isolation: isolate;
  color: inherit;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #f6f6f4;
    background: var(--wipe);
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
    z-index: -1;
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleX(1);
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
    transition: border-color 400ms ease;
  }

  .tile-logo {
    opacity: var(--rest-opacity, 0.85);
    transition: transform 500ms cubic-bezier(0.77, 0, 0.175, 1),
      filter 400ms ease, opacity 400ms ease;
  }

  /* Grey at rest only where hover can bring the colour back (mouse/trackpad);
     touch screens show the brand colour all the time. */
  @media (hover: hover) and (pointer: fine) {
    .tile-logo {
      filter: grayscale(1);
    }
  }

  &:hover .tile,
  &:focus-visible .tile {
    border-color: var(--ink);
  }

  &:hover .tile-logo,
  &:focus-visible .tile-logo {
    transform: scale(1.06);
    filter: grayscale(0);
    opacity: 1;
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
    className={`text-xs font-bold uppercase tracking-[0.14em] text-[#646464] ${className}`}
  >
    {children}
  </span>
);

/* ---------- Project tile: the homepage slider logos on a flat card ---------- */

// Trimmed, transparent versions of the homepage slider logos, each with a
// visual scale so marks of different shapes read at a similar weight.
const TILE_LOGOS: Record<string, { src: string; scale: number; rest?: number }> = {
  Nimbus: { src: require("@/assets/images/tiles/Nimbus.webp"), scale: 0.5 },
  CoranoJewelry: { src: require("@/assets/images/tiles/Corano.webp"), scale: 0.62 },
  Kyyeudreamers: { src: require("@/assets/images/tiles/Kyyeudreamers.webp"), scale: 0.74 },
  // the solid disc is the heaviest mark: smaller and lighter at rest
  SocialApp: { src: require("@/assets/images/tiles/SocialApp.webp"), scale: 0.46, rest: 0.7 },
};

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
          style={
            {
              "--s": logo.scale,
              "--rest-opacity": logo.rest ?? 0.85,
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
  // The pressed button follows the user's latest click immediately, even while
  // a leave-fade is still running.
  const [selected, setSelected] = useState<Filter>("All");
  const requested = useRef<Filter>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: WorkDetailList.length };
    WorkDetailList.forEach((w) => {
      const k = kindOf(w);
      c[k] = (c[k] ?? 0) + 1;
    });
    return c;
  }, []);

  const visibleCount = filter === "All" ? WorkDetailList.length : counts[filter] ?? 0;

  const stats = [
    { value: "5+", label: "Years" },
    {
      value: String(WorkDetailList.filter((w) => w.liveUrl).length),
      label: "Live sites",
    },
    { value: String(ExperienceList.length), label: "Companies" },
  ];

  const hover = {
    onMouseEnter: () => setType("hover-item"),
    onMouseLeave: () => setType("default"),
  };

  const filtering = useRef(false);

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
        flipState.current = Flip.getState(listRef.current.children);
      }
      setFilter(requested.current);
    };
    // Rows that are about to disappear fade out while they are still in the
    // layout; only then is the filter applied and the rest re-flowed by Flip.
    const leaving = rows.filter(
      (row, i) =>
        !row.hidden &&
        next !== "All" &&
        kindOf(WorkDetailList[i]) !== next
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

  // Filtering: every row stays mounted; hidden rows leave and enter with Flip.
  // Afterwards, ScrollTriggers are re-measured because the page height changed.
  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state || !listRef.current) return;
    const rows = Array.from(listRef.current.children) as HTMLElement[];
    // The user is working with the list now: make sure no row is still waiting
    // for its scroll reveal.
    gsap.set(rows, { clearProps: "opacity,visibility,transform" });
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }
    Flip.from(state, {
      targets: rows,
      duration: 0.6,
      ease: "expo.inOut",
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.06 }
        ),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";

        SplitText.create(".js-title", {
          type: "words,chars",
          mask: "chars",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              duration: 1.1,
              ease,
              stagger: 0.025,
              delay: 0.1,
            }),
        });

        gsap.from(".js-fade", {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease,
          stagger: 0.08,
          delay: 0.35,
        });

        // Set the hidden state up front, then reveal with .to (no flash).
        // Opacity only — visibility:hidden would drop links from the tab order.
        gsap.set(".js-row, .js-cta", { opacity: 0, y: 40 });

        // A keyboard user tabbing ahead of the scroll reveal sees the item at once.
        const onFocusIn = (e: FocusEvent) => {
          const el = (e.target as HTMLElement).closest(".js-row, .js-cta");
          if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
        };
        root.current?.addEventListener("focusin", onFocusIn);

        ScrollTrigger.batch(".js-row", {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease,
              stagger: 0.1,
            }),
        });

        ScrollTrigger.create({
          trigger: ".js-cta",
          start: "top 95%",
          once: true,
          onEnter: () =>
            gsap.to(".js-cta", { opacity: 1, y: 0, duration: 1, ease }),
        });

        return () => root.current?.removeEventListener("focusin", onFocusIn);
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
      />

      <main className="lg:px-[8%] md:px-[4%] px-[8%]">
        {/* Intro */}
        <section className="pt-8 md:pt-10 pb-8 md:pb-10">
          {/* Original highlighted title with its own flash + underline effect */}
          <HighlightTitle title="Selected Projects," />
          <h1 className="js-title mt-4 md:mt-5 max-w-[1100px] text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
            Dashboards, storefronts, and web apps I&rsquo;ve shipped.
          </h1>
          <p className="js-fade mt-5 md:mt-6 max-w-[720px] text-lg md:text-xl leading-snug text-[#3d3d3d] text-balance">
            Product work, client sites, and personal builds. Each case study
            covers the problem, the approach, and the result.
          </p>

          <dl className="js-fade mt-8 md:mt-10 grid grid-cols-3 gap-px bg-[#e6e6e6] border-y border-[#e6e6e6]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white py-4 md:py-5 px-3 sm:px-6 first:pl-0 flex flex-col justify-between"
              >
                <dt>
                  <Eyebrow className="max-sm:!tracking-[0.04em]">{stat.label}</Eyebrow>
                </dt>
                <dd className="mt-1.5 text-3xl md:text-4xl font-extrabold tracking-tight tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Index */}
        <section aria-labelledby="index-heading">
          <div className="js-fade flex flex-wrap items-center justify-between gap-4 pb-6">
            <h2
              id="index-heading"
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
            >
              Case studies
            </h2>
            <div
              role="group"
              aria-label="Filter case studies by type"
              className="grid grid-cols-4 gap-1.5 w-full sm:flex sm:w-auto sm:gap-2"
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
                    className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border h-10 px-2 sm:px-4 text-[13px] sm:text-sm font-bold transition-colors ${
                      active
                        ? "bg-[#1a1a1a] border-[#1a1a1a] text-white"
                        : "border-[#8a8a8a] text-[#1a1a1a] hover:border-[#1a1a1a] hover:bg-[#f6f6f4]"
                    }`}
                    {...hover}
                  >
                    {name}
                    <span
                      className={`font-mono text-xs ${
                        active ? "text-white/70" : "text-[#646464]"
                      }`}
                    >
                      <span className="sm:hidden">{count}</span>
                      <span className="hidden sm:inline">{pad(count)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {`Showing ${visibleCount} ${visibleCount === 1 ? "case study" : "case studies"}`}
          </p>

          <ol
            ref={listRef}
            className="border-t border-[#e6e6e6]"
            aria-label="Case studies"
          >
            {WorkDetailList.map((work, i) => {
              const shown = filter === "All" || kindOf(work) === filter;
              const id = `case-${work.url}`;
              return (
                <li
                  key={work.url}
                  data-flip-id={work.url}
                  hidden={!shown}
                  className="js-row border-b border-[#e6e6e6]"
                >
                  <Row
                    to={`/works/${work.url}`}
                    aria-labelledby={`${id}-title`}
                    aria-describedby={`${id}-meta ${id}-tagline`}
                    style={
                      {
                        "--accent": work.accent,
                        "--ink": work.ink,
                      } as React.CSSProperties
                    }
                    className="grid-cols-[72px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[minmax(0,1fr)_200px] lg:grid-cols-[64px_minmax(0,1fr)_220px] gap-x-5 md:gap-x-10 gap-y-4 py-7 md:py-10 md:px-4 md:-mx-4 items-center"
                    {...hover}
                  >
                    <span
                      aria-hidden
                      className="hidden lg:block self-start pt-3 font-mono text-sm text-[#646464]"
                    >
                      {pad(i + 1)}
                    </span>

                    <div className="md:order-last max-md:self-start max-md:mt-1">
                      <Tile work={work} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <p
                          id={`${id}-meta`}
                          className="min-w-0 flex flex-wrap items-center gap-x-3 gap-y-1"
                        >
                          <Eyebrow className="lg:hidden font-mono !tracking-normal max-sm:!text-[11px]">
                            <span aria-hidden>{pad(i + 1)}</span>
                          </Eyebrow>
                          <Eyebrow className="max-sm:!tracking-[0.05em] max-sm:!text-[11px]">{work.category}</Eyebrow>
                          <span aria-hidden className="hidden sm:inline text-[#c4c4c4]">
                            /
                          </span>
                          <Eyebrow className="hidden sm:inline">{work.status}</Eyebrow>
                          <span className="sr-only sm:hidden">{work.status}</span>
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
                        className="row-title mt-2 text-[clamp(1.75rem,5vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.03em]"
                      >
                        {work.title}
                        <span
                          aria-hidden
                          className="hidden sm:inline-flex row-arrow ml-4 align-middle relative -top-[0.08em] items-center justify-center w-11 h-11 rounded-full border border-[#1a1a1a] text-lg font-bold tracking-normal"
                        >
                          →
                        </span>
                      </h3>
                      <p
                        id={`${id}-tagline`}
                        className="mt-3 max-w-[620px] text-base md:text-lg leading-snug text-[#3d3d3d] text-balance"
                      >
                        {work.tagline}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {work.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[#e3e3e3] bg-white px-3 py-1 text-xs font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                        {work.techStack.length > 4 && (
                          <span className="text-xs font-bold text-[#646464]">
                            +{work.techStack.length - 4} more
                          </span>
                        )}
                        <span className="ml-auto hidden sm:inline text-sm font-bold">
                          {work.role}
                        </span>
                      </div>
                      <p className="sm:hidden mt-3 text-sm font-bold">
                        {work.role}
                        <span className="block mt-0.5 font-semibold text-[#646464]">
                          {work.status}
                        </span>
                      </p>
                    </div>
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
            <p className="mt-3 text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance max-w-[820px]">
              Have a product that needs a careful front end?
            </p>
          </div>
          <a
            href="mailto:binhnnt.98@gmail.com"
            className="inline-flex items-center justify-center gap-2 self-start md:self-end rounded-full bg-[#1a1a1a] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#b23d43] transition-colors"
            {...hover}
          >
            Email me <span aria-hidden>→</span>
          </a>
        </section>
      </main>

      <div className="border-t border-[#e6e6e6]">
        <Footer />
      </div>
    </Page>
  );
};

export default Works;
