import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";
import { skillCategories, skillIcons } from "../data/skills.js";
import SkillIcon from "./SkillIcon.jsx";
import "./Skills.css";

const third = Math.ceil(skillIcons.length / 3);
const rowA = skillIcons.slice(0, third);
const rowB = skillIcons.slice(third, third * 2);
const rowC = skillIcons.slice(third * 2);

export default function Skills() {
  const [ref, visible] = useReveal();

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <p className="section-tag">skills & toolkit</p>
          <h2 className="section-heading">What I work with</h2>
          <p className="skills__intro">
            Tap any category to open its dedicated page with tooling, detail
            and context.
          </p>
        </div>

        <div className="skills__grid">
          {skillCategories.map((g, gi) => (
            <SkillCard key={g.slug} group={g} index={gi} />
          ))}
        </div>
      </div>

      <div className="skills__swim">
        <IconRow items={rowA} duration={45} />
        <IconRow items={rowB} duration={55} offset />
        <IconRow items={rowC} duration={65} />
      </div>
    </section>
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

function SkillCard({ group, index }) {
  const [ref, visible] = useReveal();
  const previewTools = group.tools.slice(0, 6);
  return (
    <Link
      ref={ref}
      to={`/myapp/skills/${group.slug}`}
      className={`skill-card reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms`, "--card-accent": group.accent }}
    >
      <div className="skill-card__glow" />
      <div className="skill-card__head">
        <span className="skill-card__num">0{index + 1}</span>
        <h3>{group.category}</h3>
      </div>
      <p className="skill-card__tagline">{group.tagline}</p>
      <p className="skill-card__summary">{group.summary}</p>

      <div className="skill-card__tools">
        {previewTools.map((t) => (
          <div key={t.name} className="skill-card__tool" title={t.name}>
            <SkillIcon name={t.name} src={t.icon} size={22} />
          </div>
        ))}
        {group.tools.length > previewTools.length && (
          <div className="skill-card__tool skill-card__tool--more">
            +{group.tools.length - previewTools.length}
          </div>
        )}
      </div>

      <div className="skill-card__open">
        explore category <span>→</span>
      </div>
    </Link>
  );
}
