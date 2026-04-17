import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useReveal } from "../hooks/useReveal.js";
import { useIsDesktop } from "../hooks/useIsDesktop.js";
import { skillCategories, skillIcons } from "../data/skills.js";
import SkillIcon from "./SkillIcon.jsx";
import "./Skills.css";

const third = Math.ceil(skillIcons.length / 3);
const rowA = skillIcons.slice(0, third);
const rowB = skillIcons.slice(third, third * 2);
const rowC = skillIcons.slice(third * 2);

// Header stats — computed once, avoids recomputation on every render.
const totalTools = skillCategories.reduce((n, c) => n + c.tools.length, 0);
const totalCategories = skillCategories.length;

export default function Skills() {
  const [ref, visible] = useReveal();
  const isDesktop = useIsDesktop();
  const sectionRef = useRef(null);

  // Scroll-linked parallax for the swim section. Only wired up on
  // desktop — on mobile the transform would cause extra repaints.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const swimY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headerY = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  return (
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""}`}
          style={isDesktop ? { y: headerY } : undefined}
        >
          <p className="section-tag">skills & toolkit</p>
          <h2 className="section-heading">What I work with</h2>
          <p className="skills__intro">
            Tap any category to open its dedicated page with tooling, detail
            and context.
          </p>

          <StatsStrip isDesktop={isDesktop} />
        </motion.div>

        <div className="skills__grid">
          {skillCategories.map((g, gi) => (
            <SkillCard
              key={g.slug}
              group={g}
              index={gi}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="skills__swim"
        aria-hidden="true"
        style={isDesktop ? { y: swimY } : undefined}
      >
        <div className="skills__swim-label">
          <span className="skills__swim-dot" />
          live stack · always learning
        </div>
        <IconRow items={rowA} duration={45} isDesktop={isDesktop} />
        <IconRow items={rowB} duration={55} offset isDesktop={isDesktop} />
        <IconRow items={rowC} duration={65} isDesktop={isDesktop} />
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Animated stats strip — numbers count up on scroll into view.
   ────────────────────────────────────────────────────────────── */
function StatsStrip({ isDesktop }) {
  return (
    <div className="skills__stats">
      <Stat value={totalCategories} label="categories" animated={isDesktop} />
      <div className="skills__stat-sep" />
      <Stat
        value={totalTools}
        label="tools & technologies"
        suffix="+"
        animated={isDesktop}
      />
      <div className="skills__stat-sep" />
      <Stat
        value={skillIcons.length}
        label="in active stack"
        animated={isDesktop}
      />
    </div>
  );
}

function Stat({ value, label, suffix = "", animated }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) return;
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, animated]);

  return (
    <div className="skills__stat" ref={ref}>
      <span className="skills__stat-num">
        {display}
        {suffix}
      </span>
      <span className="skills__stat-label">{label}</span>
    </div>
  );
}

function IconRow({ items, duration, offset = false }) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];
  return (
    <div className={`swim-row ${offset ? "swim-row--offset" : ""}`}>
      <div className="swim-track" style={{ animationDuration: `${duration}s` }}>
        {loop.map((it, i) => (
          <div
            key={i}
            className="swim-icon"
            style={{ animationDelay: `${(i % items.length) * 0.25}s` }}
          >
            <SkillIcon name={it.name} src={it.src} size={36} />
            <span>{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Skill card — 3D tilt, cursor spotlight, staggered scroll entrance.
   All motion effects are desktop-only.
   ────────────────────────────────────────────────────────────── */
function SkillCard({ group, index, isDesktop }) {
  const previewTools = group.tools.slice(0, 6);
  const extra = group.tools.length - previewTools.length;

  if (!isDesktop) {
    // Mobile / no-hover: keep the original IntersectionObserver reveal,
    // no framer-motion state, no tilt, no spotlight.
    return (
      <SkillCardStatic
        group={group}
        index={index}
        previewTools={previewTools}
        extra={extra}
      />
    );
  }

  return (
    <SkillCardMotion
      group={group}
      index={index}
      previewTools={previewTools}
      extra={extra}
    />
  );
}

function SkillCardStatic({ group, index, previewTools, extra }) {
  const [ref, visible] = useReveal();
  return (
    <Link
      ref={ref}
      to={`/skills/${group.slug}`}
      className={`skill-card reveal ${visible ? "visible" : ""}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        "--card-accent": group.accent,
      }}
    >
      <CardInner group={group} index={index} previewTools={previewTools} extra={extra} />
    </Link>
  );
}

function SkillCardMotion({ group, index, previewTools, extra }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  // Raw mouse position within the card, normalised to [-0.5, 0.5].
  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);

  // Spring-smoothed versions drive the tilt — feels liquid instead
  // of snappy, which is what "impressive" looks like.
  const springCfg = { stiffness: 180, damping: 18, mass: 0.4 };
  const xSpring = useSpring(xPct, springCfg);
  const ySpring = useSpring(yPct, springCfg);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Spotlight gradient position — follows the cursor inside the card.
  const spotX = useTransform(xSpring, (v) => `${(v + 0.5) * 100}%`);
  const spotY = useTransform(ySpring, (v) => `${(v + 0.5) * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, ${group.accent}22, transparent 55%)`;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    xPct.set((e.clientX - rect.left) / rect.width - 0.5);
    yPct.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    xPct.set(0);
    yPct.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 1000,
        "--card-accent": group.accent,
      }}
      initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(12px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={`/skills/${group.slug}`}
          className="skill-card skill-card--motion"
        >
          {/* Cursor spotlight — sits above the base, below content. */}
          <motion.div
            className="skill-card__spotlight"
            style={{ background: spotlight }}
          />

          <CardInner
            group={group}
            index={index}
            previewTools={previewTools}
            extra={extra}
            hovered={hovered}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function CardInner({ group, index, previewTools, extra, hovered = false }) {
  return (
    <>
      <div className="skill-card__glow" />
      <div className="skill-card__bar" />
      <div className="skill-card__corner" aria-hidden="true">{`</>`}</div>

      <div className="skill-card__head">
        <span className="skill-card__num">0{index + 1}</span>
        <h3>{group.category}</h3>
      </div>
      <p className="skill-card__tagline">{group.tagline}</p>
      <p className="skill-card__summary">{group.summary}</p>

      <div className="skill-card__tools">
        {previewTools.map((t, i) => (
          <motion.div
            key={t.name}
            className="skill-card__tool"
            title={t.name}
            initial={false}
            animate={hovered ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: hovered ? i * 0.04 : 0,
              ease: "easeOut",
            }}
          >
            <SkillIcon name={t.name} src={t.icon} size={22} />
          </motion.div>
        ))}
        {extra > 0 && (
          <motion.div
            className="skill-card__tool skill-card__tool--more"
            initial={false}
            animate={hovered ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: hovered ? previewTools.length * 0.04 : 0,
              ease: "easeOut",
            }}
          >
            +{extra}
          </motion.div>
        )}
      </div>

      <div className="skill-card__open">
        <span className="skill-card__open-text">explore category</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={hovered ? "hover" : "idle"}
            className="skill-card__open-arrow"
            initial={{ x: -6, opacity: 0 }}
            animate={{ x: hovered ? 6 : 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            →
          </motion.span>
        </AnimatePresence>
      </div>
    </>
  );
}
