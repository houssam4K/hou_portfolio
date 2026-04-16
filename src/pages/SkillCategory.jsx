import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { skillCategories, getCategory } from "../data/skills.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SkillIcon from "../components/SkillIcon.jsx";
import "./SkillCategory.css";

export default function SkillCategory() {
  const { slug } = useParams();
  const category = getCategory(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) return <Navigate to="/#skills" replace />;

  const idx = skillCategories.findIndex((c) => c.slug === slug);
  const nextCategory =
    skillCategories[(idx + 1) % skillCategories.length];

  return (
    <>
      <Navbar />
      <main className="sc">
        <div className="sc__hero">
          <div className="container">
            <Link to="/#skills" className="sc__back">
              ← back to skills
            </Link>

            <div
              className="sc__terminal-bar"
              style={{ "--cat-accent": category.accent }}
            >
              <div className="sc__dots">
                <span />
                <span />
                <span />
              </div>
              <div className="sc__path">
                ~/skills/{category.slug} — cat README.md
              </div>
              <div className="sc__pill">category</div>
            </div>

            <p className="section-tag">/ skill category</p>
            <h1 className="sc__title">{category.category}</h1>
            <p className="sc__tagline">{category.tagline}</p>
            <p className="sc__summary">{category.summary}</p>
          </div>
        </div>

        <div className="container sc__body">
          <div className="sc__grid">
            <article className="sc__content">
              <h2>About this discipline</h2>
              {category.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <h2>What I can do</h2>
              <ul className="sc__highlights">
                {category.highlights.map((h, i) => (
                  <li key={i}>
                    <span>▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              <h2>Tools & technologies</h2>
              <div className="sc__tools">
                {category.tools.map((t) => (
                  <div key={t.name} className="sc__tool">
                    <SkillIcon name={t.name} src={t.icon} size={28} />
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </article>

            <aside className="sc__side">
              <div className="sc__meta">
                <MetaRow label="category" value={category.category} />
                <MetaRow label="focus" value={category.tagline} />
                <MetaRow
                  label="tools"
                  value={`${category.tools.length} technologies`}
                />
                <MetaRow label="status" value="active" highlight />
              </div>

              <div className="sc__nav">
                <p className="sc__nav-title">$ ls ../</p>
                <ul>
                  {skillCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/skills/${c.slug}`}
                        className={c.slug === slug ? "is-active" : ""}
                      >
                        <span>▸</span>
                        {c.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <Link
            to={`/skills/${nextCategory.slug}`}
            className="sc__next"
          >
            <div>
              <span className="section-tag">next category</span>
              <h3>{nextCategory.category}</h3>
            </div>
            <span className="sc__next-arrow">→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function MetaRow({ label, value, highlight }) {
  return (
    <div className={`sc__meta-row ${highlight ? "sc__meta-row--hl" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
