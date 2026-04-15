import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";
import { projects } from "../data/projects.js";
import "./Projects.css";

export default function Projects() {
  const [ref, visible] = useReveal();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx];
    if (card) {
      track.scrollTo({
        left: card.offsetLeft - 24,
        behavior: "smooth",
      });
    }
  };

  const next = () => {
    const n = Math.min(active + 1, projects.length - 1);
    setActive(n);
    scrollTo(n);
  };
  const prev = () => {
    const n = Math.max(active - 1, 0);
    setActive(n);
    scrollTo(n);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardW = track.children[0]?.offsetWidth || 1;
      const gap = 24;
      const idx = Math.round(track.scrollLeft / (cardW + gap));
      setActive(Math.min(idx, projects.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div
          ref={ref}
          className={`projects__head reveal ${visible ? "visible" : ""}`}
        >
          <div>
            <p className="section-tag">selected work</p>
            <h2 className="section-heading">Featured projects</h2>
          </div>
          <div className="projects__controls">
            <button
              className="projects__btn"
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous project"
            >
              ←
            </button>
            <span className="projects__count">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <button
              className="projects__btn"
              onClick={next}
              disabled={active === projects.length - 1}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>

        <div className="projects__track" ref={trackRef}>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="projects__dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`projects__dot ${active === i ? "active" : ""}`}
              onClick={() => {
                setActive(i);
                scrollTo(i);
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <div className="projects__viewall">
          <Link to="/myapp/projects" className="projects__viewall-btn">
            <span className="projects__viewall-icon">⌗</span>
            view all {projects.length} projects
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  return (
    <Link
      to={`/myapp/projects/${project.slug}`}
      ref={ref}
      className={`project-card reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="project-card__glow" style={{ background: project.accent }} />
      <div className="project-card__header">
        <span className="project-card__num">0{index + 1}</span>
        <span className="project-card__badge">case study</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__tagline">{project.tagline}</p>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="project-card__open">
        read case study <span>→</span>
      </div>
    </Link>
  );
}
