import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import { CustomCursorContext } from "@/contexts/CustomCursorContext";
import { CheckRouteWorkContext } from "@/contexts/CheckRouteWorkContext";
import { ProjectDetail, WorkDetailList } from "@/constants";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound/NotFound";
import { getProjectJsonLd, getProjectSeo } from "@/seo";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pad = (n: number) => String(n).padStart(2, "0");

const HI_DPI = "(min-width: 1024px) and (min-resolution: 2dppx)";
// AV1 sources are listed first; browsers without AV1 fall through to H.264.
const AV1 = 'video/webm; codecs="av01.0.08M.08"';

const clock = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "--:--";
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const hostOf = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

/* ---------- Flat building blocks ---------- */

const Page = styled.div`
  --accent: #b23d43;
  --ink: #b23d43;
  --on-accent: #fff;
  --muted: #646464;
  --line: #e6e6e6;
  --surface: #f6f6f4;
  /* Plain fallback first for browsers without color-mix(). */
  --tint: #f1f1f1;
  --tint: color-mix(in srgb, var(--accent) var(--tint-strength, 16%), #ffffff);
  background: #fff;
  color: #1a1a1a;
  /* The site disables selection globally; case studies are for reading. */
  -webkit-user-select: text;
  user-select: text;

  a:focus-visible,
  button:focus-visible,
  [tabindex="0"]:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
  }

  ::selection {
    background: var(--accent);
    color: var(--on-accent);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
    }
  }
`;

const NextLink = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--next-accent);
    transform: scaleY(0);
    transform-origin: 50% 100%;
    transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
    z-index: -1;
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleY(1);
  }

  &:hover .next-swap,
  &:focus-visible .next-swap {
    color: var(--next-on-accent);
  }

  &:hover .next-arrow,
  &:focus-visible .next-arrow {
    transform: translateX(12px);
  }
`;

/* ---------- Pieces ---------- */

interface SectionProps {
  index: number;
  title: string;
  id?: string;
  reveal?: boolean;
  children: React.ReactNode;
}

const Section = ({ index, title, id, reveal = true, children }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`section-${index}`}
    className="grid md:grid-cols-12 gap-y-5 md:gap-x-10 py-14 md:py-20 border-t border-[color:var(--line)] scroll-mt-20 md:scroll-mt-24"
  >
    <div className="md:col-span-3">
      <div className="md:sticky md:top-28 flex md:flex-col items-baseline md:items-start gap-3 md:gap-2">
        <span className="font-mono text-sm text-[color:var(--ink)]">
          {pad(index)}
        </span>
        <h2
          id={`section-${index}`}
          className="text-2xl md:text-3xl font-extrabold tracking-tight"
        >
          {title}
        </h2>
      </div>
    </div>
    <div className={`md:col-span-9 ${reveal ? "js-reveal" : ""}`}>
      {children}
    </div>
  </section>
);

const Eyebrow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)] ${className}`}
  >
    {children}
  </span>
);

// Renders "A · B · C" so lines only break between parts, with the dot kept
// at the end of the line it follows.
const Segments = ({ value }: { value: string }) => {
  const parts = value.split(" · ");
  // A single phrase wraps normally; only multi-part values are kept whole.
  if (parts.length === 1) return <>{value}</>;
  return (
  <>
    {parts.map((part, i) => (
      <React.Fragment key={part}>
        {i > 0 && " "}
        <span className="whitespace-nowrap">
          {part}
          {i < parts.length - 1 && " ·"}
        </span>
      </React.Fragment>
    ))}
  </>
  );
};

/* ---------- Lightbox ---------- */

interface LightboxProps {
  work: ProjectDetail;
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

const Lightbox = ({ work, index, onClose, onStep }: LightboxProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const screen = work.screens[index];
  const many = work.screens.length > 1;

  // Fade the dialog out before unmounting (instant with reduced motion).
  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReducedMotion() || !panelRef.current) {
      onClose();
      return;
    }
    gsap.to(panelRef.current, {
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    if (!prefersReducedMotion() && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: "power2.out" }
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight" && many) onStep(1);
      if (e.key === "ArrowLeft" && many) onStep(-1);
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            "button, [tabindex='0']"
          )
        ).filter((el) => el.offsetParent !== null);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [requestClose, onStep, many]);

  // Preload the neighbouring screens so stepping feels instant.
  useEffect(() => {
    if (!many) return;
    const total = work.screens.length;
    [index + 1, index - 1].forEach((i) => {
      new Image().src = work.screens[(i + total) % total].src;
    });
  }, [index, many, work.screens]);

  // One-finger horizontal swipe steps through screens. Pinch-zoom stays
  // available: multi-touch gestures and zoomed-in views never trigger a step.
  const pointers = useRef(new Set<number>());
  const swipe = useRef<{ x: number; y: number; multi: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    pointers.current.add(e.pointerId);
    if (pointers.current.size > 1 && swipe.current) swipe.current.multi = true;
    else swipe.current = { x: e.clientX, y: e.clientY, multi: false };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const start = swipe.current;
    if (pointers.current.size > 0) return;
    swipe.current = null;
    const zoomed = (window.visualViewport?.scale ?? 1) > 1.01;
    if (!start || start.multi || zoomed || !many) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      onStep(dx < 0 ? 1 : -1);
    }
  };
  const onPointerCancel = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    swipe.current = null;
  };

  useEffect(() => {
    panelRef.current
      ?.querySelector<HTMLElement>("[data-scroll]")
      ?.scrollTo({ top: 0 });
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      ".js-lightbox-img",
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "expo.out" }
    );
  }, [index]);

  const navBtn =
    "h-11 w-11 shrink-0 rounded-full border border-white/30 text-white text-lg hover:bg-white hover:text-[#1a1a1a] transition-colors";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} screens`}
      className="fixed inset-0 z-50 flex flex-col bg-[#111]"
    >
      <div className="flex items-center justify-between gap-4 px-5 md:px-10 min-h-16 py-2 text-white shrink-0">
        <div className="min-w-0 text-sm font-semibold">
          <p aria-live="polite">
            <span className="font-mono text-white/60 mr-3">
              {pad(index + 1)} / {pad(work.screens.length)}
            </span>
            <span className="line-clamp-2 sm:line-clamp-1 sm:inline">
              {screen.caption}
            </span>
          </p>
          {many && (
            <p className="sm:hidden mt-0.5 text-xs font-normal text-white/60">
              Swipe to change · pinch to zoom
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {many && (
            <>
              <button
                type="button"
                className={`${navBtn} hidden sm:inline-flex items-center justify-center`}
                onClick={() => onStep(-1)}
                aria-label="Previous screen"
              >
                ←
              </button>
              <button
                type="button"
                className={`${navBtn} hidden sm:inline-flex items-center justify-center`}
                onClick={() => onStep(1)}
                aria-label="Next screen"
              >
                →
              </button>
            </>
          )}
          <button
            ref={closeRef}
            type="button"
            className={`${navBtn} inline-flex items-center justify-center`}
            onClick={requestClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <div
        data-scroll
        tabIndex={0}
        role="region"
        aria-label="Full-page view, scroll to explore"
        className="flex-1 flex flex-col overflow-y-auto overscroll-contain px-5 md:px-10 pb-10 [touch-action:pan-y_pinch-zoom]"
        onClick={(e) => e.target === e.currentTarget && requestClose()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <img
          src={screen.src}
          width={screen.width}
          height={screen.height}
          alt={`${work.title}: ${screen.caption}`}
          className="js-lightbox-img my-auto mx-auto w-full h-auto max-w-[1100px] rounded-xl"
        />
      </div>
    </div>
  );
};

/* ---------- Case study ---------- */

interface CaseStudyProps {
  work: ProjectDetail;
  index: number;
  focusTitle: boolean;
}

const CaseStudy = ({ work, index, focusTitle }: CaseStudyProps) => {
  const { toggleRoute } = useContext(CheckRouteWorkContext);
  const { setType } = useContext(CustomCursorContext);
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [openScreen, setOpenScreen] = useState<number | null>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [time, setTime] = useState({ current: 0, duration: work.duration });
  // Same test as the retina <source>, so the poster matches the video.
  const [hiDpi] = useState(() => window.matchMedia(HI_DPI).matches);
  const screensRef = useRef<HTMLUListElement>(null);

  const next = WorkDetailList[(index + 1) % WorkDetailList.length];
  const host = hostOf(work.liveUrl);

  // Reset scroll before any ScrollTrigger is created (runs before useGSAP).
  // CaseStudy is keyed by project, so this runs once per project.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (focusTitle) titleRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";

        SplitText.create(".js-title", {
          type: "words,chars",
          mask: "chars",
          // the class gives each mask the .split-char-mask rule (index.css),
          // which leaves room for descenders below the tight line box
          charsClass: "split-char",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              // far enough to start fully below the taller mask
              yPercent: 150,
              duration: 1.1,
              ease,
              stagger: 0.035,
              delay: 0.1,
            }),
        });

        gsap.from(".js-hero-fade", {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease,
          stagger: 0.08,
          delay: 0.35,
        });

        gsap.from(".js-meta > div", {
          y: 16,
          autoAlpha: 0,
          duration: 0.8,
          ease,
          stagger: 0.06,
          delay: 0.55,
        });

        const frame = root.current?.querySelector(".js-media-frame");
        const frameReveal = {
          clipPath: "inset(12% 6% 12% 6% round 24px)",
          duration: 1.3,
          ease: "expo.inOut",
        };
        if (frame && ScrollTrigger.isInViewport(frame, 0.08)) {
          // Already visible on load: play after the hero entrance, not with it.
          gsap.from(frame, { ...frameReveal, delay: 0.75 });
        } else {
          gsap.from(".js-media-frame", {
            ...frameReveal,
            scrollTrigger: { trigger: ".js-media-frame", start: "top 92%" },
          });
        }

        gsap.from(".js-screen", {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease,
          stagger: 0.12,
          scrollTrigger: { trigger: ".js-screens", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        gsap.from(".js-feature", {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease,
          stagger: 0.1,
          scrollTrigger: { trigger: ".js-features", start: "top 85%" },
        });

        gsap.from(".js-next-title", {
          yPercent: 40,
          autoAlpha: 0,
          duration: 1,
          ease,
          scrollTrigger: { trigger: ".js-next", start: "top 90%" },
        });

        // Play the demo only while it is on screen.
        ScrollTrigger.create({
          trigger: ".js-media-frame",
          start: "top 70%",
          end: "bottom 30%",
          onToggle: (self) => {
            const video = videoRef.current;
            if (!video) return;
            if (self.isActive) {
              if (!userPaused.current) video.play().catch(() => undefined);
            } else if (!video.paused) {
              video.pause();
            }
          },
        });
      });

      gsap.to(".js-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  // Hover or keyboard-focus a screenshot to pan through the full page inside
  // its frame. Skipped on touch screens, where a tap opens the lightbox.
  const peek = contextSafe((e: React.SyntheticEvent<HTMLElement>, on: boolean) => {
    if (e.type.startsWith("mouse") && !window.matchMedia("(hover: hover)").matches)
      return;
    const frame = e.currentTarget.querySelector<HTMLElement>(".js-peek");
    const img = frame?.querySelector("img");
    if (!frame || !img) return;
    const distance = Math.max(0, img.offsetHeight - frame.clientHeight);
    if (prefersReducedMotion() || distance === 0) return;
    gsap.to(img, {
      y: on ? -distance : 0,
      duration: on ? Math.min(6, Math.max(1.2, distance / 450)) : 0.8,
      ease: on ? "power1.inOut" : "expo.out",
      overwrite: true,
    });
  });

  // "Watch the demo" scrolls to the frame and starts playback — a user-started
  // play is fine even with reduced motion, where autoplay is off.
  const playDemo = () => {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = false;
    video.play().catch(() => undefined);
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const syncTime = () => {
    const video = videoRef.current;
    if (!video) return;
    setTime({
      current: video.currentTime,
      duration: Number.isFinite(video.duration) ? video.duration : work.duration,
    });
  };

  // Seek to a fraction of the demo, loading metadata first if needed.
  const seekTo = (fraction: number) => {
    const video = videoRef.current;
    if (!video) return;
    const apply = () => {
      // Stop a second short of the end so the looping video doesn't wrap to 0
      // the instant someone seeks to the end.
      const end = Math.max(0, video.duration - 1);
      video.currentTime = Math.min(end, Math.max(0, fraction) * video.duration);
      syncTime();
    };
    if (Number.isFinite(video.duration)) apply();
    else {
      video.addEventListener("loadedmetadata", apply, { once: true });
      video.load();
    }
  };

  const onSeekPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.type === "pointerdown") e.currentTarget.setPointerCapture(e.pointerId);
    else if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo((e.clientX - rect.left) / rect.width);
  };

  const onSeekKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const keys = ["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    // Not loaded yet: load metadata first, then apply the same key.
    if (!Number.isFinite(video.duration)) {
      const key = e.key;
      video.addEventListener(
        "loadedmetadata",
        () => {
          syncTime();
          onSeekKey({ key, preventDefault: () => undefined } as React.KeyboardEvent<HTMLDivElement>);
        },
        { once: true }
      );
      video.load();
      return;
    }
    const jump: Record<string, number> = {
      ArrowRight: 5,
      ArrowUp: 5,
      ArrowLeft: -5,
      ArrowDown: -5,
      PageUp: 15,
      PageDown: -15,
    };
    let target: number | null = null;
    if (e.key in jump) target = video.currentTime + jump[e.key];
    if (e.key === "Home") target = 0;
    if (e.key === "End") target = video.duration;
    if (target === null) return;
    seekTo(target / video.duration);
  };

  // On touch screens a tap opens the demo full screen (it is too small to read
  // inline); with a mouse a click toggles playback.
  const onVideoTap = () => {
    if (window.matchMedia("(hover: none)").matches) enterFullscreen();
    else toggleVideo();
  };

  const enterFullscreen = () => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!video) return;
    userPaused.current = false;
    video.play().catch(() => undefined);
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => video.webkitEnterFullscreen?.());
    } else {
      video.webkitEnterFullscreen?.();
    }
  };

  // Native controls only while the demo is full screen.
  useEffect(() => {
    const onChange = () => {
      const video = videoRef.current;
      if (video) video.controls = document.fullscreenElement === video;
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const screenStep = () => {
    const list = screensRef.current;
    const item = list?.firstElementChild as HTMLElement | null;
    return item ? item.offsetWidth + 16 : 1;
  };

  const onScreensScroll = (e: React.UIEvent<HTMLUListElement>) => {
    setActiveScreen(
      Math.min(
        work.screens.length - 1,
        Math.round(e.currentTarget.scrollLeft / screenStep())
      )
    );
  };

  const goToScreen = (i: number) => {
    screensRef.current?.scrollTo({
      left: i * screenStep(),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const progress =
    Number.isFinite(time.duration) && time.duration > 0
      ? time.current / time.duration
      : 0;

  const closeLightbox = useCallback(() => setOpenScreen(null), []);
  const stepLightbox = useCallback(
    (dir: 1 | -1) =>
      setOpenScreen((i) =>
        i === null ? i : (i + dir + work.screens.length) % work.screens.length
      ),
    [work.screens.length]
  );

  const projectSeo = getProjectSeo(work.url);
  const projectJsonLd = getProjectJsonLd(work.url);

  const hover = {
    onMouseEnter: () => setType("hover-item"),
    onMouseLeave: () => setType("default"),
  };

  const leaveRoute = () => {
    toggleRoute(false);
    setType("default");
  };

  const meta = [
    { label: "Role", value: work.role },
    { label: "Category", value: work.category },
    { label: "Platform", value: work.platform },
    { label: "Status", value: work.status },
  ];

  const pageStyle = {
    "--accent": work.accent,
    "--ink": work.ink,
    "--on-accent": work.onAccent,
    "--tint-strength": `${work.tintStrength ?? 16}%`,
    "--next-accent": next.accent,
    "--next-on-accent": next.onAccent,
  } as React.CSSProperties;

  const primaryBtn =
    "inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] text-white px-5 py-3 text-sm font-bold hover:bg-[color:var(--ink)] transition-colors";

  const ctrlBtn =
    "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-[color:var(--line)] text-[#1a1a1a] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] transition-colors";

  // Landscape screens get a full-width card, so the grid drops to 2 columns.
  const hasWide = work.screens.some((screen) => screen.fit === "contain");
  const allWide = work.screens.every((screen) => screen.fit === "contain");
  const threeUp = work.screens.length === 3 && !hasWide;

  // Card widths in a 1200px grid: 3-up ≈352px, 2-up ≈544px, wide ≈1120px.
  const screenSizes = (wide: boolean) =>
    wide
      ? "(min-width: 1200px) 1120px, (min-width: 640px) 90vw, 78vw"
      : threeUp
      ? "(min-width: 1200px) 352px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw"
      : "(min-width: 1200px) 544px, (min-width: 640px) 45vw, 78vw";

  const screenCols = threeUp ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <Page ref={root} style={pageStyle}>
      {projectSeo && (
        <Seo
          title={projectSeo.title}
          description={projectSeo.description}
          path={projectSeo.path}
          image={projectSeo.image}
          imageAlt={projectSeo.imageAlt}
          section={projectSeo.section}
          type="article"
          keywords={projectSeo.keywords}
          jsonLd={projectJsonLd || undefined}
        />
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[color:var(--line)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
          <Link to="/" className="text-lg" onClick={leaveRoute} {...hover}>
            Nguyen <span className="font-extrabold">Binh</span>
          </Link>
          <Link
            to="/works"
            className="group inline-flex items-center gap-2 text-sm font-semibold hover:text-[color:var(--ink)] transition-colors"
            onClick={leaveRoute}
            {...hover}
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-1"
            >
              ←
            </span>
            All projects
          </Link>
        </div>
        <div
          aria-hidden
          className="js-progress absolute left-0 bottom-[-1px] h-[2px] w-full origin-left scale-x-0 bg-[color:var(--ink)]"
        />
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Hero */}
        <section className="pt-14 md:pt-24 pb-12 md:pb-16">
          <p className="js-hero-fade flex items-center gap-3 text-sm font-semibold text-[color:var(--muted)]">
            <span
              aria-hidden
              className="inline-block w-2.5 h-2.5 rounded-full bg-[color:var(--ink)]"
            />
            Case study
            <span className="font-mono">
              {pad(index + 1)} / {pad(WorkDetailList.length)}
            </span>
          </p>
          <h1
            ref={titleRef}
            tabIndex={-1}
            className="js-title mt-5 text-[clamp(2rem,10.5vw,7.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-balance focus:outline-none"
          >
            {work.title}
          </h1>
          <p className="js-hero-fade mt-6 md:mt-8 max-w-[720px] text-xl md:text-2xl leading-snug text-[#3d3d3d] text-balance">
            {work.tagline}
          </p>

          <div className="js-hero-fade mt-8">
            <a
              href="#demo"
              className={primaryBtn}
              onClick={playDemo}
              {...hover}
            >
              Watch the demo <span aria-hidden>↓</span>
            </a>
          </div>

          <dl className="js-meta mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--line)] border-y border-[color:var(--line)]">
            {meta.map((item) => (
              <div
                key={item.label}
                className="bg-white py-5 px-4 md:px-6 [&:nth-child(odd)]:pl-0 md:[&:nth-child(odd)]:pl-6 md:first:!pl-0"
              >
                <dt>
                  <Eyebrow>{item.label}</Eyebrow>
                </dt>
                <dd className="mt-1.5 min-w-0 break-words font-bold text-balance">
                  <Segments value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Product demo */}
        <section
          id="demo"
          aria-labelledby="demo-heading"
          className="scroll-mt-20 md:scroll-mt-24"
        >
          <h2 id="demo-heading" className="sr-only">
            {work.title} product demo and screens
          </h2>
          <figure>
            <div className="js-media-frame rounded-2xl md:rounded-3xl overflow-hidden border border-[color:var(--line)] bg-[color:var(--surface)]">
              <div className="flex items-center gap-3 px-4 md:px-5 h-12 border-b border-[color:var(--line)] bg-white">
                <div className="flex gap-1.5 shrink-0" aria-hidden>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dcdcdc]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dcdcdc]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--ink)]" />
                </div>
                <div className="flex-1 min-w-0 flex justify-center">
                  {work.liveUrl && host ? (
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/host inline-flex items-center gap-1.5 truncate rounded-full bg-[color:var(--surface)] px-4 py-1.5 text-xs font-semibold text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
                      {...hover}
                    >
                      {host}
                      <span
                        aria-hidden
                        className="transition-transform group-hover/host:translate-x-0.5 group-hover/host:-translate-y-0.5"
                      >
                        ↗
                      </span>
                      <span className="sr-only">(live site, opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="truncate rounded-full bg-[color:var(--surface)] px-4 py-1.5 text-xs font-semibold text-[color:var(--muted)]">
                      {`${work.title} · demo`}
                    </span>
                  )}
                </div>
                <div className="w-[42px] shrink-0" aria-hidden />
              </div>
              <div className="relative">
                <video
                  ref={videoRef}
                  className="block w-full h-auto bg-[color:var(--surface)]"
                  width={work.videoWidth}
                  height={work.videoHeight}
                  style={{ aspectRatio: `${work.videoWidth} / ${work.videoHeight}` }}
                  poster={hiDpi ? work.posterHiDpi : work.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={syncTime}
                  onLoadedMetadata={syncTime}
                  onClick={onVideoTap}
                  aria-label={`${work.title} demo video, muted`}
                  aria-describedby="demo-steps"
                >
                  {work.videoHiDpiWebm && (
                    <source
                      src={work.videoHiDpiWebm}
                      type={AV1}
                      media={HI_DPI}
                    />
                  )}
                  <source
                    src={work.videoHiDpi}
                    type="video/mp4"
                    media={HI_DPI}
                  />
                  <source
                    src={work.videoMobile}
                    type="video/mp4"
                    media="(max-width: 640px)"
                  />
                  {work.videoWebm && <source src={work.videoWebm} type={AV1} />}
                  <source src={work.video} type="video/mp4" />
                </video>
              </div>

              {/* Flat control bar */}
              <div className="flex items-center gap-3 md:gap-4 px-3 md:px-4 h-14 border-t border-[color:var(--line)] bg-white">
                <button
                  type="button"
                  onClick={toggleVideo}
                  aria-label="Play demo video"
                  aria-pressed={playing}
                  className={ctrlBtn}
                  {...hover}
                >
                  {playing ? (
                    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14">
                      <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
                      <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14">
                      <path d="M3 1.5v11a.6.6 0 0 0 .9.5l9-5.5a.6.6 0 0 0 0-1l-9-5.5a.6.6 0 0 0-.9.5Z" fill="currentColor" />
                    </svg>
                  )}
                </button>
                <span className="shrink-0 font-mono text-xs tabular-nums text-[color:var(--muted)]">
                  <span className="sm:hidden">
                    <span aria-hidden>
                      {Number.isFinite(time.duration)
                        ? `\u2212${clock(time.duration - time.current)}`
                        : "0:00"}
                    </span>
                    <span className="sr-only">
                      {Number.isFinite(time.duration)
                        ? `${clock(time.duration - time.current)} remaining`
                        : "Not loaded yet"}
                    </span>
                  </span>
                  <span className="hidden sm:inline">
                    {clock(time.current)} / {clock(time.duration)}
                  </span>
                </span>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Seek demo video"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(Number.isFinite(time.duration) ? time.duration : 0)}
                  aria-valuenow={Math.round(time.current)}
                  aria-valuetext={
                    Number.isFinite(time.duration)
                      ? `${clock(time.current)} of ${clock(time.duration)}`
                      : "Not loaded yet"
                  }
                  className="group/seek relative flex-1 h-10 flex items-center cursor-pointer touch-none focus-visible:!outline-none"
                  onPointerDown={onSeekPointer}
                  onPointerMove={onSeekPointer}
                  onKeyDown={onSeekKey}
                  {...hover}
                >
                  <div className="relative w-full h-1 rounded-full bg-[#949494] overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 w-full origin-left bg-[color:var(--ink)]"
                      style={{ transform: `scaleX(${progress})` }}
                    />
                  </div>
                  <span
                    aria-hidden
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[color:var(--ink)] scale-0 [@media(hover:none)]:scale-100 group-hover/seek:scale-100 group-focus-visible/seek:scale-100 group-focus-visible/seek:ring-2 group-focus-visible/seek:ring-offset-2 group-focus-visible/seek:ring-[color:var(--ink)] transition-transform"
                    style={{ left: `${progress * 100}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={enterFullscreen}
                  className={`${ctrlBtn} max-sm:w-auto max-sm:px-3.5 max-sm:gap-1.5`}
                  {...hover}
                >
                  <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M1.5 5V1.5H5M9 1.5h3.5V5M12.5 9v3.5H9M5 12.5H1.5V9" />
                  </svg>
                  <span className="sm:hidden text-xs font-bold">Expand</span>
                  <span className="hidden sm:inline sr-only">
                    Watch demo full screen
                  </span>
                </button>
              </div>
            </div>
            <figcaption className="mt-4 text-sm text-[color:var(--muted)]">
              {work.mediaCaption}
            </figcaption>
            <details className="group/steps mt-3">
              <summary className="inline-flex items-center gap-2 cursor-pointer list-none text-sm font-bold hover:text-[color:var(--ink)] transition-colors [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden
                  className="inline-block transition-transform group-open/steps:rotate-90"
                >
                  →
                </span>
                What the demo shows
              </summary>
              <ol
                id="demo-steps"
                className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-[#3d3d3d]"
              >
                {work.demoSteps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-[color:var(--muted)]">
                      {pad(i + 1)}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </details>
          </figure>

          <ul
            className={`js-screens mt-10 md:mt-14 flex items-start sm:grid gap-4 sm:gap-6 md:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-6 sm:scroll-px-0 -mx-6 px-6 sm:mx-0 sm:px-0 pb-2 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${screenCols}`}
            aria-label={`${work.title} screens`}
            ref={screensRef}
            onScroll={onScreensScroll}
          >
            {work.screens.map((screen, i) => (
              <li
                key={screen.caption}
                className={`js-screen shrink-0 w-[78%] sm:w-auto snap-start ${
                  screen.fit === "contain" ? "sm:col-span-2" : ""
                }`}
              >
                <button
                  type="button"
                  className="group block w-full text-left rounded-2xl"
                  onClick={() => setOpenScreen(i)}
                  onMouseEnter={(e) => {
                    setType("hover-item");
                    peek(e, true);
                  }}
                  onMouseLeave={(e) => {
                    setType("default");
                    peek(e, false);
                  }}
                  onFocus={(e) => peek(e, true)}
                  onBlur={(e) => peek(e, false)}
                  aria-label={`${screen.caption}, view full screen`}
                >
                  <div
                    style={
                      screen.fit === "contain"
                        ? ({
                            "--ar": screen.cardRatio ?? `${screen.width} / ${screen.height}`,
                          } as React.CSSProperties)
                        : undefined
                    }
                    className={`js-peek relative ${
                      screen.fit === "contain"
                        ? `${allWide ? "aspect-[16/9]" : "aspect-[4/5]"} sm:aspect-[var(--ar)]`
                        : screen.fit === "square"
                        ? "aspect-square"
                        : "aspect-[4/5]"
                    } overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] transition-colors group-hover:border-[color:var(--ink)] group-focus-visible:border-[color:var(--ink)]`}>
                    <img
                      src={screen.thumb}
                      srcSet={[
                        `${screen.thumbSmall} 400w`,
                        `${screen.thumb} 800w`,
                        screen.thumbLarge && `${screen.thumbLarge} 1100w`,
                        screen.fit === "contain" &&
                          (screen.thumbWide
                            ? `${screen.thumbWide} 1440w`
                            : `${screen.src} ${screen.width}w`),
                      ]
                        .filter(Boolean)
                        .join(", ")}
                      sizes={screenSizes(screen.fit === "contain")}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={
                        screen.fit === "contain"
                          ? "absolute inset-0 w-full h-full object-contain sm:object-cover"
                          : "absolute inset-x-0 top-0 w-full h-auto min-h-full object-cover object-left-top"
                      }
                    />
                    <span className="absolute right-3 bottom-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                      View full screen
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className="font-mono text-sm text-[color:var(--muted)]"
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="font-bold leading-snug group-hover:text-[color:var(--ink)] transition-colors">
                      {screen.caption}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* Swipe indicator (mobile carousel only) */}
          <div className="sm:hidden mt-3 flex items-center gap-2">
            <span
              aria-hidden
              className="font-mono text-xs tabular-nums text-[color:var(--muted)]"
            >
              {pad(activeScreen + 1)} / {pad(work.screens.length)}
            </span>
            <div className="flex">
              {work.screens.map((screen, i) => (
                <button
                  key={screen.caption}
                  type="button"
                  onClick={() => goToScreen(i)}
                  aria-label={`Show screen ${i + 1}: ${screen.caption}`}
                  aria-current={i === activeScreen ? "true" : undefined}
                  className="w-7 h-7 inline-flex items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeScreen
                        ? "w-5 bg-[color:var(--ink)]"
                        : "w-1.5 bg-[#8c8c8c]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span
              aria-hidden
              className={`ml-auto text-xs font-semibold text-[color:var(--muted)] transition-opacity ${
                activeScreen === work.screens.length - 1 ? "opacity-0" : ""
              }`}
            >
              Swipe →
            </span>
          </div>
        </section>

        {/* Story */}
        <div className="mt-14 md:mt-24">
          <Section index={1} title="Overview">
            <p className="text-lg md:text-[1.375rem] leading-[1.6]">
              {work.content}
            </p>
          </Section>

          <Section index={2} title="Challenge & approach">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div className="rounded-2xl bg-[color:var(--surface)] p-6 md:p-8">
                <h3>
                  <Eyebrow>The challenge</Eyebrow>
                </h3>
                <p className="mt-3 text-lg leading-relaxed">{work.challenge}</p>
              </div>
              <div className="rounded-2xl bg-[color:var(--tint)] p-6 md:p-8">
                <h3>
                  <Eyebrow className="!text-[color:var(--ink)]">
                    The approach
                  </Eyebrow>
                </h3>
                <p className="mt-3 text-lg leading-relaxed">{work.approach}</p>
              </div>
            </div>
          </Section>

          <Section index={3} title="Key features" id="features" reveal={false}>
            <ol className="js-features grid sm:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)]">
              {work.features.map((feature) => (
                <li
                  key={feature.title}
                  className="js-feature bg-white p-6 md:p-8"
                >
                  <span
                    aria-hidden
                    className="block h-[3px] w-8 rounded-full bg-[color:var(--ink)]"
                  />
                  <h3 className="mt-4 text-lg md:text-xl font-extrabold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#4a4a4a]">
                    {feature.body}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          <Section index={4} title="Tech stack">
            <dl className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
              {work.stack.map((group) => (
                <div
                  key={group.group}
                  className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 py-5 items-center"
                >
                  <dt className="text-sm font-semibold text-[color:var(--muted)]">
                    {group.group}
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[color:var(--line)] px-3.5 py-1.5 text-sm font-bold"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
              {work.repoUrl && (
                <div className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 py-5 items-center">
                  <dt className="text-sm font-semibold text-[color:var(--muted)]">
                    Source
                  </dt>
                  <dd>
                    <a
                      href={work.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/repo inline-flex items-center gap-1.5 text-sm font-bold underline decoration-[color:var(--line)] decoration-2 underline-offset-4 hover:text-[color:var(--ink)] hover:decoration-[color:var(--ink)] transition-colors"
                      {...hover}
                    >
                      {work.repoUrl.replace(/^https?:\/\/(www\.)?/, "")}
                      <span aria-hidden>↗</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Section>

          <Section index={5} title="Outcome">
            <dl className="grid sm:grid-cols-3 gap-px bg-[color:var(--line)] border-y border-[color:var(--line)]">
              {work.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white py-5 sm:px-6 sm:first:pl-0"
                >
                  <dt>
                    <Eyebrow>{fact.label}</Eyebrow>
                  </dt>
                  <dd className="mt-1.5 min-w-0 break-words font-bold leading-snug text-balance">
                    <Segments value={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-lg md:text-[1.375rem] leading-[1.6]">
              {work.outcome}
            </p>
          </Section>
        </div>
      </main>

      {/* Next project */}
      <nav
        aria-label="Next project"
        className="js-next mt-6 border-t border-[color:var(--line)]"
      >
        <NextLink to={`/works/${next.url}`} {...hover}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <Eyebrow className="next-swap transition-colors duration-500">
                Next project
              </Eyebrow>
              <p className="js-next-title next-swap mt-3 text-[clamp(2rem,9vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-balance transition-colors duration-500">
                {next.title}
              </p>
            </div>
            <span
              aria-hidden
              className="next-arrow next-swap text-4xl md:text-6xl transition-all duration-500"
            >
              →
            </span>
          </div>
        </NextLink>
      </nav>

      <div className="border-t border-[color:var(--line)]">
        <Footer
          className="max-w-[1200px] mx-auto !px-6 md:!px-10"
          iconClassName="text-2xl"
          emailLabel="Email"
          phoneLabel="Phone"
          labelClassName="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]"
        />
      </div>

      {openScreen !== null && (
        <Lightbox
          work={work}
          index={openScreen}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />
      )}
    </Page>
  );
};

/* ---------- Route ---------- */

const Work = () => {
  const { workName } = useParams();
  const { toggleRoute } = useContext(CheckRouteWorkContext);
  // Move focus to the new title only when navigating between case studies.
  const previous = useRef<string | undefined>(undefined);
  const focusTitle =
    previous.current !== undefined && previous.current !== workName;

  useEffect(() => {
    previous.current = workName;
  }, [workName]);

  useEffect(() => {
    toggleRoute(true);
    return () => toggleRoute(false);
  }, [toggleRoute]);

  const index = WorkDetailList.findIndex((item) => item.url === workName);
  if (index === -1) return <NotFound />;

  return (
    <CaseStudy
      key={WorkDetailList[index].url}
      work={WorkDetailList[index]}
      index={index}
      focusTitle={focusTitle}
    />
  );
};

export default Work;
