import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import { WorkDetailList } from "@/constants";
import Footer from "@/components/Footer";
import HighlightTitle from "@/components/HighlightTitle";
import Seo from "@/components/Seo";
import { TILE_LOGOS, WIPES } from "@/components/projectBrand";
import { CustomCursorContext } from "@/contexts/CustomCursorContext";
import { PAGE_SEO, personJsonLd, websiteJsonLd } from "@/seo";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Flat building blocks ---------- */

const Page = styled.div`
  color: #1a1a1a;
  -webkit-user-select: text;
  user-select: text;

  a:focus-visible,
  button:focus-visible,
  [tabindex]:focus-visible {
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

  @media print {
    .js-fade,
    .js-line,
    .js-slide {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

// The slider track: native horizontal scrolling with snap points, so touch,
// trackpad, keyboard and screen readers all work; GSAP drives the buttons.
const Track = styled.ul`
  --gap: 20px;
  display: flex;
  gap: var(--gap);
  overflow-x: auto;
  /* Room above and below for focus rings, which overflow would clip. */
  padding-block: 8px;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  /* The track's own gutter. Up to the page's max width it equals the page
     gutter, so the first slide lines up with the content. On wider screens
     the page gutter keeps growing to centre the content, but the slider
     should not follow it: its gutter shrinks back (down to 2.5rem) so the
     slides run edge to edge instead of starting in the middle of the screen. */
  --excess: max(0px, calc(100vw - 2 * var(--gutter-base) - var(--page-max)));
  --track-gutter: max(
    min(2.5rem, var(--gutter-base)),
    calc(var(--gutter-base) - var(--excess))
  );
  scroll-padding-inline: var(--track-gutter);
  padding-inline: var(--track-gutter);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.is-dragging {
    scroll-snap-type: none;
    cursor: grabbing;
  }

  &.is-dragging a {
    pointer-events: none;
  }

  /* The full-bleed track draws its ring inside itself. */
  &&:focus-visible {
    outline-offset: -2px;
  }

  /* The closing "all work" slide fills what is left of the row when the last
     project sits at the start, so every project can snap to the start
     without leaving a blank strip. On a very wide, full-width track that
     would be enormous, so it stops at two slides wide. */
  .end-slide {
    width: min(
      max(calc(var(--slide) * 0.75), calc(100% - var(--slide) - var(--gap))),
      calc(var(--slide) * 2)
    );
  }

  @media (min-width: 768px) {
    --gap: 28px;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
  text-decoration: none;
  -webkit-user-drag: none;

  .card-tile {
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }

  /* The project's tint wipes up from the bottom on hover/focus. */
  .card-tile::before {
    content: "";
    position: absolute;
    inset: 0;
    /* a deeper shade of the same tint */
    background: color-mix(in srgb, var(--ink) 16%, var(--wipe));
    transform: scaleY(0);
    transform-origin: 50% 100%;
    transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
    z-index: -1;
  }

  .card-logo {
    transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1),
      filter 400ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .card-logo {
      filter: var(--rest-filter, grayscale(1) contrast(1.1));
    }
  }

  .card-title {
    transition: color 400ms ease;
  }

  .card-arrow {
    transition: transform 500ms cubic-bezier(0.77, 0, 0.175, 1),
      background-color 400ms ease, color 400ms ease, border-color 400ms ease;
  }

  &:hover .card-tile::before,
  &:focus-visible .card-tile::before {
    transform: scaleY(1);
  }

  .card-logo {
    transform: translate(-50%, -50%);
  }

  &:hover .card-logo,
  &:focus-visible .card-logo {
    transform: translate(-50%, -50%) scale(1.06);
    filter: none;
  }

  && .card-logo[data-mono] {
    filter: var(--rest-filter);
  }

  &:hover .card-title,
  &:focus-visible .card-title {
    color: var(--ink);
  }

  &:hover .card-arrow,
  &:focus-visible .card-arrow {
    transform: translateX(6px);
    background: var(--ink);
    border-color: var(--ink);
    color: #fff;
  }

  /* The ring sits on the tile, where the hover state is drawn. */
  &&:focus-visible {
    outline: none;
  }

  &:focus-visible .card-tile {
    outline: 2px solid #b23d43;
    outline-offset: 4px;
  }
`;

const ArrowButton = ({
  dir,
  disabled,
  onClick,
  hover,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  hover: object;
}) => (
  <button
    type="button"
    aria-label={dir === "prev" ? "Previous project" : "Next project"}
    aria-controls="featured-track"
    disabled={disabled}
    onClick={onClick}
    className="inline-flex items-center justify-center w-11 h-11 max-sm:w-10 max-sm:h-10 rounded-full border border-[#1a1a1a] text-base font-bold transition-colors enabled:hover:bg-[#1a1a1a] enabled:hover:text-white disabled:border-[#d4d4d4] disabled:text-[#b0b0b0]"
    {...hover}
  >
    <span aria-hidden>{dir === "prev" ? "←" : "→"}</span>
  </button>
);

/* ---------- Page ---------- */

const Main: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const total = WorkDetailList.length;

  const hover = {
    onMouseEnter: () => setType("hover-item"),
    onMouseLeave: () => setType("default"),
  };

  const slides = () =>
    Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  // Track position → active slide, end states and the progress bar.
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const items = Array.from(track.children) as HTMLElement[];
    const left = track.getBoundingClientRect().left;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;
    let index = 0;
    let best = Infinity;
    items.forEach((item, i) => {
      const d = Math.abs(item.getBoundingClientRect().left - left - pad);
      if (d < best) {
        best = d;
        index = i;
      }
    });
    // On a wide track the last projects cannot reach the start position, so
    // at the end of the scroll the counter reports the last project.
    if (max > 0 && track.scrollLeft >= max - 2) {
      index = Math.max(index, items.length - 2);
    }
    setActive(index);
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max - 2);
    if (barRef.current) {
      const p = max > 0 ? track.scrollLeft / max : 1;
      gsap.to(barRef.current, {
        scaleX: 1 / items.length + p * (1 - 1 / items.length),
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    }
  }, []);

  // Where the slider is heading (a scroll position): rapid presses build on
  // the pending target instead of wherever the track happens to be mid-tween.
  const targetXRef = useRef(0);

  // Each slide's resting scroll position. Positions past the end of the
  // scroll range are clamped, as the browser's own snapping does.
  const snapXs = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    const max = track.scrollWidth - track.clientWidth;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;
    return (Array.from(track.children) as HTMLElement[]).map((item) =>
      Math.max(0, Math.min(max, item.offsetLeft - pad))
    );
  }, []);

  const scrollTrackTo = useCallback((x: number, duration = 0.8, ease = "expo.inOut") => {
    const track = trackRef.current;
    if (!track) return;
    targetXRef.current = x;
    if (prefersReducedMotion()) {
      track.scrollLeft = x;
      return;
    }
    // Snap would fight the tween, so it is paused while GSAP scrolls.
    track.style.scrollSnapType = "none";
    gsap.to(track, {
      scrollTo: { x },
      duration,
      ease,
      overwrite: true,
      onComplete: () => {
        track.style.scrollSnapType = "";
      },
    });
  }, []);

  // One press = the next (or previous) position the track can actually rest
  // at, measured from where it is heading. Returns the slide it lands on.
  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return null;
    const xs = snapXs();
    const from = gsap.isTweening(track) ? targetXRef.current : track.scrollLeft;
    let index = -1;
    if (dir === 1) {
      index = xs.findIndex((x) => x > from + 2);
    } else {
      for (let i = xs.length - 1; i >= 0; i--) {
        if (xs[i] < from - 2) {
          index = i;
          break;
        }
      }
    }
    if (index < 0) return null;
    scrollTrackTo(xs[index]);
    return slides()[index];
  };

  // Mouse drag to scroll; touch and trackpads already scroll natively.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    let down = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      gsap.killTweensOf(track);
      track.style.scrollSnapType = "";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        track.classList.add("is-dragging");
        setType("slider-drag");
      }
      if (moved) track.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      track.classList.remove("is-dragging");
      setType("default");
      // Settle on the nearest resting position; arrow presses during the
      // settle build on it.
      const xs = snapXs();
      const nearest = xs.reduce(
        (best, x) =>
          Math.abs(x - track.scrollLeft) < Math.abs(best - track.scrollLeft) ? x : best,
        xs[0] ?? 0
      );
      scrollTrackTo(nearest, 0.5, "power3.out");
    };
    // A drag must not also open the card it started on.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        moved = false;
      }
    };
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    track.addEventListener("click", onClick, true);
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      track.removeEventListener("click", onClick, true);
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [setType, sync, snapXs, scrollTrackTo]);

  const onTrackKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const target = step(e.key === "ArrowRight" ? 1 : -1);
    // Pressed on a card: focus follows to the new card so it stays in view.
    if (target && e.target !== e.currentTarget) {
      target.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";

        // Headline: each line rises out of its own mask.
        gsap.from(".js-line", {
          yPercent: 112,
          duration: 1.1,
          ease,
          stagger: 0.09,
          delay: 0.3,
        });
        // The stroke under "creative" draws itself once the line has landed.
        gsap.fromTo(
          ".js-scribble path",
          { attr: { "stroke-dashoffset": 100 } },
          {
            attr: { "stroke-dashoffset": 0 },
            duration: 0.9,
            ease: "power2.inOut",
            delay: 1,
          }
        );

        gsap.from(".js-fade", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease,
          stagger: 0.08,
          delay: 0.75,
        });

        // The slides glide in from the right once the hero has landed.
        gsap.from(".js-slide", {
          x: 80,
          opacity: 0,
          duration: 1,
          ease,
          stagger: 0.08,
          delay: 0.9,
        });

        // The closing line drifts into place as the page scrolls to it.
        gsap.fromTo(
          ".js-outro",
          { xPercent: 10 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".js-outro",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // The last slide is the "all work" card, not a project.
  const onEndCard = active >= total;
  const current = WorkDetailList[Math.min(active, total - 1)];

  return (
    <Page ref={root}>
      <Seo
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        path={PAGE_SEO.home.path}
        image={PAGE_SEO.home.image}
        imageAlt={PAGE_SEO.home.imageAlt}
        jsonLd={[websiteJsonLd, personJsonLd]}
      />

      {/* Same gutters as .page-gutter (index.css), as a variable because the
          full-bleed slider needs the value for its scroll padding. */}
      <main className="[--gutter-base:8vw] md:[--gutter-base:4vw] lg:[--gutter-base:8vw] [--gutter:8vw] md:[--gutter:4vw] lg:[--gutter:max(8vw,calc((100vw_-_var(--page-max))_/_2))]">
        {/* Hero */}
        <section className="px-[var(--gutter)] pt-8 md:pt-10 pb-[clamp(1.5rem,6vh,3.5rem)]">
          <div aria-hidden="true">
            <HighlightTitle title="Hello!" />
          </div>
          <h1 className="mt-2 md:mt-3 text-[11.5vw] min-[480px]:text-[9vw] md:text-[10vw] lg:text-[clamp(3rem,min(9vw,12vh),8.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            <span className="sr-only">
              Hello! I&rsquo;m a creative Front-end Developer based in Vietnam.
            </span>
            {/* The original sentence, one phrase per line; each line rises
                out of its own mask. Below 480px a phrase may wrap. */}
            <span aria-hidden className="block">
              <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em] pl-[0.08em] -ml-[0.08em]">
                <span className="js-line block min-[480px]:whitespace-nowrap -ml-[0.05em]">
                  I&rsquo;m a{" "}
                  <span className="relative inline-block">
                    creative
                    {/* A hand-drawn stroke under the one word that matters. */}
                    <svg
                      className="js-scribble absolute left-[-0.02em] bottom-[-0.04em] w-[calc(100%+0.04em)] h-[0.16em] overflow-visible"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M3 12 C 46 3, 88 18, 142 10 S 236 3, 297 11"
                        stroke="#b23d43"
                        strokeWidth="7"
                        strokeLinecap="round"
                        pathLength={100}
                        strokeDasharray="100 200"
                        strokeDashoffset="0"
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[0.08em] -ml-[0.08em]">
                <span className="js-line block min-[480px]:whitespace-nowrap -ml-[0.07em]">
                  Front-end Developer
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[0.08em] -ml-[0.08em]">
                <span className="js-line block min-[480px]:whitespace-nowrap -ml-[0.05em]">
                  based in Vietnam<span className="text-[#b23d43]">.</span>
                </span>
              </span>
            </span>
          </h1>
          <div className="js-fade mt-[clamp(1rem,4vh,2.25rem)] flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
            <p className="font-mono text-[13px] md:text-sm text-[#3d3d3d]">
              Fintech &amp; Web3 <span className="text-[#b23d43]">/</span> React,
              Next.js, TypeScript
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 min-h-[44px] text-sm font-bold"
              {...hover}
            >
              <span className="underline decoration-[#c4c4c4] decoration-2 underline-offset-[6px] group-hover:decoration-[#b23d43] group-hover:text-[#b23d43] transition-colors">
                About me
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* Featured projects slider */}
        <section
          aria-labelledby="featured-heading"
          aria-roledescription="carousel"
          className="pb-20 md:pb-28"
        >
          <div className="js-fade px-[var(--gutter)] flex items-center justify-between gap-x-3 pb-3">
            <h2
              id="featured-heading"
              className="text-xs font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-[#646464] whitespace-nowrap"
            >
              Selected projects
            </h2>
            <div className="flex items-center gap-3 sm:gap-5">
              <p className="font-mono text-sm font-semibold tabular-nums whitespace-nowrap" aria-live="polite">
                <span className="sr-only">
                  {onEndCard
                    ? "All work"
                    : `Project ${active + 1} of ${total}: ${current.title}`}
                </span>
                <span aria-hidden className="max-[359px]:hidden">
                  <span className="text-[#1a1a1a]">
                    {pad(Math.min(active, total - 1) + 1)}
                  </span>
                  <span className="text-[#646464]"> / {pad(total)}</span>
                </span>
              </p>
              <div className="flex gap-2">
                <ArrowButton dir="prev" disabled={atStart} onClick={() => step(-1)} hover={hover} />
                <ArrowButton dir="next" disabled={atEnd} onClick={() => step(1)} hover={hover} />
              </div>
            </div>
          </div>

          <Track
            id="featured-track"
            ref={trackRef}
            aria-label="Selected projects"
            tabIndex={0}
            onKeyDown={onTrackKey}
            className="cursor-grab [--slide:min(82vw,560px)] sm:[--slide:min(60vw,560px)] md:[--slide:min(40vw,560px)] lg:[--slide:min(36vw,560px)] xl:[--slide:min(32vw,560px)]"
          >
            {WorkDetailList.map((work, i) => {
              const logo = TILE_LOGOS[work.url];
              return (
                <li
                  key={work.url}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  className="js-slide shrink-0 snap-start w-[var(--slide)]"
                >
                  <Card
                    to={`/works/${work.url}`}
                    draggable={false}
                    style={
                      {
                        "--ink": work.ink,
                        "--wipe": WIPES[work.url],
                      } as React.CSSProperties
                    }
                    {...hover}
                  >
                    {/* One flat poster per project, in the project's own
                        tint: number and category on top, the mark in the
                        middle, the name set large along the bottom. */}
                    <div className="card-tile aspect-[4/5] sm:aspect-[6/5] rounded-2xl bg-[var(--wipe)] p-5 md:p-6 flex flex-col">
                      <p className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-[#3d3d3d]">
                        <span aria-hidden className="font-mono tracking-normal">
                          {pad(i + 1)}
                        </span>
                        {work.category}
                      </p>
                      {/* Every mark is fitted into the same square box, placed
                          at the exact centre of the tile, so all logos share
                          one size and one position. */}
                      <span className="flex-1 min-h-0" />
                      {logo && (
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <span className="relative block aspect-square w-[36%] max-w-[168px]">
                            <img
                              src={logo.src}
                              alt=""
                              draggable={false}
                              data-mono={logo.mono || undefined}
                              style={
                                {
                                  "--rest-filter": logo.rest,
                                  width: `${(logo.fit ?? 1) * 100}%`,
                                  height: `${(logo.fit ?? 1) * 100}%`,
                                } as React.CSSProperties
                              }
                              className="card-logo absolute left-1/2 top-1/2 max-w-none object-contain"
                            />
                          </span>
                        </span>
                      )}
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="card-title min-w-0 text-[clamp(1.375rem,1.5vw+1rem,2.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
                          {work.title}
                        </h3>
                        <span
                          aria-hidden
                          className="card-arrow shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#1a1a1a] text-base font-bold"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
            <li
              aria-roledescription="slide"
              aria-label="All work"
              className="js-slide end-slide shrink-0 snap-start"
            >
              <Link
                to="/works"
                draggable={false}
                aria-label="See all work"
                className="group h-[calc(var(--slide)*1.25)] sm:h-[calc(var(--slide)*5/6)] flex flex-col justify-between rounded-2xl bg-[#1a1a1a] text-white p-6 md:p-8 hover:bg-[#b23d43] focus-visible:bg-[#b23d43] transition-colors duration-500"
                {...hover}
              >
                <span aria-hidden className="font-mono text-xs font-semibold text-[#d4d4d4] group-hover:text-white group-focus-visible:text-white transition-colors">
                  {pad(total)} projects
                </span>
                <span aria-hidden className="flex items-end justify-between gap-4">
                  <span className="text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">
                    All
                    <br />
                    work
                  </span>
                  <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white text-lg font-bold transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-rotate-45">
                    →
                  </span>
                </span>
              </Link>
            </li>
          </Track>

          {/* Progress */}
          <div className="js-fade px-[var(--gutter)] mt-6" aria-hidden>
            <div className="h-0.5 bg-[#e6e6e6] overflow-hidden">
              <span
                ref={barRef}
                className="block h-full bg-[#1a1a1a] origin-left"
                style={{ transform: `scaleX(${1 / (total + 1)})` }}
              />
            </div>
          </div>
        </section>

        {/* Closing line */}
        <section className="px-[var(--gutter)] pt-2 -mt-2 pb-16 md:pb-24 overflow-hidden">
          <a
            href="mailto:binhnnt.98@gmail.com?subject=Project%20enquiry"
            aria-label="Let's talk: email binhnnt.98@gmail.com"
            className="js-outro group inline-flex items-center gap-[0.18em] text-[clamp(3rem,15vw,12rem)] leading-[0.95] font-extrabold tracking-[-0.045em] hover:text-[#b23d43] transition-colors duration-500"
            {...hover}
          >
            <span aria-hidden className="-ml-[0.07em]">Let&rsquo;s talk</span>
            <span
              aria-hidden
              className="inline-flex items-center justify-center w-[0.62em] h-[0.62em] mt-[0.08em] rounded-full bg-[#1a1a1a] text-white group-hover:bg-[#b23d43] transition-[transform,background-color] duration-500 group-hover:-rotate-45"
            >
              <span className="text-[0.3em] tracking-normal">→</span>
            </span>
          </a>
        </section>
      </main>

      <div className="border-t border-[#e6e6e6]">
        <Footer />
      </div>
    </Page>
  );
};

export default Main;
