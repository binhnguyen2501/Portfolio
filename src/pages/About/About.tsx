import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import { CustomCursorContext } from "@/contexts/CustomCursorContext";
import {
  EducationList,
  Experience,
  ExperienceList,
  SkillCategories,
} from "@/constants";
import Footer from "@/components/Footer";
import HighlightTitle from "@/components/HighlightTitle";
import Seo from "@/components/Seo";
import { PAGE_SEO, aboutJsonLd } from "@/seo";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const CV_URL = "/CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Engineer.pdf";

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

  /* Never print an empty section because a scroll reveal hasn't run yet. */
  @media print {
    .js-fade,
    .js-reveal {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

const Eyebrow = ({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p";
}) => (
  <Tag
    className={`text-xs font-bold uppercase tracking-[0.14em] text-[#646464] ${className}`}
  >
    {children}
  </Tag>
);

/** A numbered section heading on a hairline, shared by every section. */
const SectionHead = ({
  id,
  number,
  title,
  aside,
}: {
  id: string;
  number: string;
  title: string;
  aside?: React.ReactNode;
}) => (
  <div className="js-reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-3 border-b border-[#1a1a1a]">
    <h2
      id={id}
      className="flex items-baseline gap-3 text-[clamp(1.5rem,1.2vw+1rem,2rem)] leading-tight font-extrabold tracking-[-0.02em]"
    >
      <span aria-hidden className="font-mono text-xs font-semibold text-[#646464] tracking-normal">
        {number}
      </span>
      {title}
    </h2>
    {aside}
  </div>
);

/* Joins parts with " · " and only lets lines break before a separator. */
const Segments = ({ parts }: { parts: string[] }) => (
  <>
    {parts.map((t, i) => (
      <React.Fragment key={t}>
        {i > 0 && " "}
        <span className="whitespace-nowrap">
          {i > 0 && <span className="text-[#9a9a9a]">· </span>}
          {t}
        </span>
      </React.Fragment>
    ))}
  </>
);

/* ---------- Data that is only used here ---------- */

// Headline numbers, all taken from the CV.
const STATS: {
  value: number;
  prefix?: string;
  suffix?: string;
  unit: string;
  label: string;
}[] = [
  { value: 4, suffix: "+", unit: "years", label: "building fintech and Web3 products" },
  { value: 1000, suffix: "+", unit: "", label: "daily active users on products I owned" },
  { value: 1, prefix: "<", unit: "s", label: "portfolio load, down from 1–\u20602\u00a0minutes" },
  { value: 60, suffix: "%", unit: "", label: "fewer user-facing production errors" },
];

const formatStat = (n: number) => Math.round(n).toLocaleString("en-US");

/* ---------- Experience entry ---------- */

const Role = ({ job, hover }: { job: Experience; hover: object }) => (
  <li className="js-reveal grid lg:grid-cols-[220px_minmax(0,1fr)] gap-x-10 gap-y-3 py-8 md:py-10 border-b border-[#e6e6e6]">
    <div className="flex flex-col items-start gap-1">
      <p className="font-mono text-sm font-semibold text-[#1a1a1a] whitespace-nowrap">
        {job.start} – {job.end}
      </p>
      <Eyebrow as="p">{job.kind}</Eyebrow>
    </div>

    <div className="min-w-0">
      <h3 className="text-[clamp(1.375rem,1vw+1rem,1.75rem)] leading-tight font-extrabold tracking-[-0.02em]">
        {job.role}
        <span className="font-normal text-[#646464]"> at </span>
        <a
          href={job.site}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-[#c4c4c4] decoration-2 underline-offset-[6px] hover:text-[#b23d43] hover:decoration-[#b23d43] transition-colors"
          {...hover}
        >
          {job.company}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </h3>
      {job.note && <p className="mt-1.5 text-sm text-[#646464]">{job.note}</p>}
      {job.summary && (
        <p className="mt-4 max-w-[68ch] text-base md:text-[17px] leading-relaxed text-[#3d3d3d] text-pretty">
          {job.summary}
        </p>
      )}
      <ul className="mt-5 grid gap-3 max-w-[72ch]">
        {job.highlights.map((h) => (
          <li
            key={h}
            className="relative pl-5 text-[15px] md:text-base leading-relaxed text-[#3d3d3d] text-pretty before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-[#1a1a1a]"
          >
            {h}
          </li>
        ))}
      </ul>
      {job.caseStudy && (
        <Link
          to={`/works/${job.caseStudy}`}
          className="group mt-4 inline-flex items-center gap-2 min-h-[44px] text-sm font-bold"
          {...hover}
        >
          <span className="underline decoration-[#c4c4c4] decoration-2 underline-offset-4 group-hover:decoration-[#b23d43] group-hover:text-[#b23d43] transition-colors">
            Read the Nimbus case study
          </span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  </li>
);

/* ---------- Page ---------- */

const About: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);
  const root = useRef<HTMLDivElement>(null);

  const hover = {
    onMouseEnter: () => setType("hover-item"),
    onMouseLeave: () => setType("default"),
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";

        // Intro: the red title's own flash first, then the h1 by word, then
        // the lede, actions and portrait.
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

        gsap.from(".js-portrait", {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.1,
          ease: "expo.inOut",
          delay: 0.3,
        });

        // Opacity only — visibility:hidden would drop links from the tab order.
        gsap.set(".js-reveal", { opacity: 0, y: 32 });

        const onFocusIn = (e: FocusEvent) => {
          const el = (e.target as HTMLElement).closest(".js-reveal");
          if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
        };
        const node = root.current;
        node?.addEventListener("focusin", onFocusIn);

        const started = performance.now();
        const INTRO_END = 0.65;
        ScrollTrigger.batch(".js-reveal", {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            const delay = Math.max(
              0,
              INTRO_END - (performance.now() - started) / 1000
            );
            // A big jump (End key, tabbing far ahead) reveals many items at
            // once: keep the whole cascade short.
            const each = Math.min(0.08, 0.3 / batch.length);
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: batch.length > 4 ? 0.5 : 0.7,
              ease,
              stagger: each,
              delay,
            });
            // Stat numbers count up as their own cell fades in, not before.
            batch.forEach((item, i) => {
              const el = item.querySelector<HTMLElement>(".js-count");
              // Small numbers (4+, <1 s) read better static than counted.
              if (!el || Number(el.dataset.value) < 10) return;
              const counter = { n: 0 };
              gsap.to(counter, {
                n: Number(el.dataset.value),
                duration: 1.4,
                ease: "power3.out",
                delay: delay + i * each,
                onUpdate: () => {
                  el.textContent = formatStat(counter.n);
                },
              });
            });
          },
        });

        // Counters start from zero until their cell is revealed.
        gsap.utils.toArray<HTMLElement>(".js-count").forEach((el) => {
          if (Number(el.dataset.value) >= 10) el.textContent = formatStat(0);
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
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        path={PAGE_SEO.about.path}
        type="profile"
        jsonLd={aboutJsonLd}
      />

      <main className="lg:px-[8%] md:px-[4%] px-[8%]">
        {/* Intro */}
        <section className="pt-8 md:pt-10 pb-12 md:pb-16 grid md:grid-cols-[minmax(0,1fr)_minmax(240px,34%)] lg:grid-cols-[minmax(0,1fr)_360px] gap-x-12 lg:gap-x-16 gap-y-10 items-start">
          <div className="min-w-0">
            <div aria-hidden="true">
              <HighlightTitle title="Building Thoughtful," />
            </div>
            <h1 className="mt-3 lg:text-7xl md:text-6xl text-4xl leading-[1.05] font-bold tracking-[-0.02em]">
              <span className="sr-only">Building Thoughtful, User-Centric Products.</span>
              <span aria-hidden className="js-title block">
                User-Centric Products.
              </span>
            </h1>
            <p className="js-fade mt-8 md:mt-10 max-w-[620px] text-lg md:text-xl leading-snug font-bold text-[#1a1a1a]">
              Hi, I&rsquo;m{" "}
              <span className="whitespace-nowrap">Nguyen Ngoc Thanh Binh</span>
              <span className="font-normal text-[#646464]">
                {" "}
                &mdash; Frontend Engineer for fintech and Web3 products.
              </span>
            </p>
            <div className="js-fade mt-4 max-w-[620px] grid gap-4 text-lg md:text-xl leading-snug text-[#3d3d3d] text-pretty">
              <p>
                For 4+ years I&rsquo;ve built real-time, multi-chain apps with
                React, Next.js, and TypeScript, and owned their frontend from
                UI and API integration to testing and production monitoring.
              </p>
              <p className="text-base md:text-[17px] leading-relaxed">
                I also work on the backend with Node.js, Express.js, and
                PostgreSQL, and I work directly with founders and product teams:
                planning releases, reviewing code, and mentoring frontend
                developers.
              </p>
            </div>
            <div className="js-fade mt-7 flex flex-wrap gap-3">
              <a
                href={CV_URL}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#b23d43] transition-colors"
                {...hover}
              >
                Download CV <span aria-hidden>↓</span>
                <span className="sr-only"> (PDF)</span>
              </a>
              <Link
                to="/works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a1a1a] px-6 py-3.5 text-sm font-bold hover:border-[#b23d43] hover:text-[#b23d43] transition-colors"
                {...hover}
              >
                See my work
              </Link>
            </div>
          </div>

          <figure className="js-fade md:mt-2 max-w-[420px] md:max-w-none">
            <div className="js-portrait overflow-hidden rounded-2xl border border-[#e8e8e8] bg-[#f7f7f7] aspect-[4/5]">
              <img
                src={require("../../assets/images/me.png")}
                alt="Binh smiling at a Web3 conference, wearing a Nimbus lanyard"
                className="w-full h-full object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[13px] text-[#646464]">
              <span>Ho Chi Minh City, Vietnam</span>
              <span>English: intermediate working proficiency</span>
            </figcaption>
          </figure>
        </section>

        {/* Stats */}
        <section aria-labelledby="stats-heading" className="pb-16 md:pb-24">
          <h2 id="stats-heading" className="sr-only">
            At a glance
          </h2>
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#1a1a1a]">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`js-reveal flex flex-col-reverse justify-end gap-2 pt-5 pb-6 pr-4 border-b border-[#e6e6e6] lg:border-b-0 ${
                  i % 2 === 1 ? "pl-4 md:pl-6 border-l border-[#e6e6e6]" : ""
                } ${i === 2 ? "lg:pl-6 lg:border-l" : ""}`}
              >
                <dt className="text-sm leading-snug text-[#3d3d3d] max-w-[22ch]">
                  {s.label}
                </dt>
                <dd className="flex items-baseline gap-1 text-[clamp(2.25rem,2.5vw+1.25rem,3.5rem)] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
                  <span className="sr-only">
                    {`${s.prefix ?? ""}${formatStat(s.value)}${s.suffix ?? ""} ${s.unit}`}
                  </span>
                  <span aria-hidden className="flex items-baseline whitespace-nowrap">
                    {s.prefix && <span>{s.prefix}</span>}
                    <span className="js-count" data-value={s.value}>
                      {formatStat(s.value)}
                    </span>
                    {s.suffix && <span>{s.suffix}</span>}
                  </span>
                  {s.unit && (
                    <span aria-hidden className="text-lg md:text-xl font-bold tracking-normal text-[#646464]">
                      {s.unit}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience-heading" className="pb-16 md:pb-24">
          <SectionHead
            id="experience-heading"
            number="01"
            title="Experience"
            aside={
              <span className="text-sm text-[#646464]">
                {ExperienceList.length} roles · 2021–2026
              </span>
            }
          />
          <ol>
            {ExperienceList.map((job) => (
              <Role key={job.company} job={job} hover={hover} />
            ))}
          </ol>
        </section>

        {/* Toolkit */}
        <section aria-labelledby="toolkit-heading" className="pb-16 md:pb-24">
          <SectionHead id="toolkit-heading" number="02" title="Toolkit" />
          <dl className="grid md:grid-cols-2 md:gap-x-12">
            {SkillCategories.map((skill) => (
              <div
                key={skill.category}
                className="js-reveal grid sm:grid-cols-[148px_minmax(0,1fr)] gap-x-4 gap-y-1 py-4 border-b border-[#e6e6e6]"
              >
                <dt className="text-sm font-bold text-[#1a1a1a] leading-relaxed">
                  {skill.category}
                </dt>
                <dd className="text-[15px] leading-relaxed text-[#3d3d3d]">
                  <Segments parts={skill.items} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Education */}
        <section aria-labelledby="education-heading" className="pb-4">
          <SectionHead id="education-heading" number="03" title="Education" />
          <ol className="grid md:grid-cols-2 md:gap-x-12">
            {EducationList.map((school) => (
              <li
                key={school.school}
                className="js-reveal grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 py-6 border-b border-[#e6e6e6]"
              >
                <h3 className="text-lg font-extrabold leading-snug tracking-[-0.01em] text-pretty">
                  {school.school}
                </h3>
                <p className="font-mono text-sm font-semibold whitespace-nowrap pt-1">
                  {school.years}
                </p>
                <p className="col-span-2 text-[15px] text-[#3d3d3d]">
                  {school.program}
                </p>
                <p className="col-span-2 text-sm text-[#646464]">
                  Classification: {school.grade}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Closing CTA */}
        <section className="js-reveal py-16 md:py-24 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <p className="mt-3 text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance max-w-[640px]">
              Building something in fintech or Web3?
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start md:self-end">
            <a
              href="mailto:binhnnt.98@gmail.com?subject=Hello%20Binh"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#b23d43] transition-colors"
              {...hover}
            >
              Get in touch <span aria-hidden>→</span>
            </a>
            <Link
              to="/works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a1a1a] px-6 py-3.5 text-sm font-bold hover:border-[#b23d43] hover:text-[#b23d43] transition-colors"
              {...hover}
            >
              See my work
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

export default About;
