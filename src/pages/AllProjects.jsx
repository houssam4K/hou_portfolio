import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useReveal } from "../hooks/useReveal.js";
import "./AllProjects.css";

const ALL_TAGS = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function AllProjects() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <>
      <Navbar />
      <main className="ap">
        <div className="ap__hero">
          <div className="container">
            <Link to="/" className="ap__back">
              ← back to home
            </Link>
            <div className="ap__terminal-bar">
              <div className="ap__dots">
                <span /><span /><span />
              </div>
              <div className="ap__path">~/projects — ls -la</div>
              <div className="ap__pill">{projects.length} entries</div>
            </div>
            <p className="section-tag">all work</p>
            <h1 className="ap__title">Project archive</h1>
            <p className="ap__sub">
              Every project I've built, broken, or investigated. Click any card
              to read the full case study.
            </p>
          </div>
        </div>

        <div className="container ap__body">
          <div className="ap__filters">
            <span className="ap__filter-label">$ filter --tag</span>
            <div className="ap__filter-btns">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  className={`ap__filter-btn ${filter === tag ? "is-active" : ""}`}
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="ap__count">
            <span className="ap__count-num">{filtered.length}</span>
            {" "}project{filtered.length !== 1 ? "s" : ""} found
          </div>

          <div className="ap__grid">
            {filtered.map((p, i) => (
              <APCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function APCard({ project, index }) {
  const [ref, visible] = useReveal();
  return (
    <Link
      ref={ref}
      to={`/projects/${project.slug}`}
      className={`ap-card reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="ap-card__glow" style={{ background: project.accent }} />

      <div className="ap-card__top">
        <span className="ap-card__num">{String(index + 1).padStart(2, "0")}</span>
        <span className="ap-card__badge">case study</span>
      </div>

      <h2 className="ap-card__title">{project.title}</h2>
      <p className="ap-card__tagline">{project.tagline}</p>
      <p className="ap-card__desc">{project.description}</p>

      <div className="ap-card__footer">
        <div className="ap-card__tags">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="ap-card__open">
          view <span>→</span>
        </div>
      </div>
    </Link>
  );
}
