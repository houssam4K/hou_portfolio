import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getProject, projects } from "../data/projects.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  // Fallbacks so partial projects still look good
  const overview = project.overview || [project.description];
  const problem = project.problem;
  const approach = project.approach;
  const results = project.results;
  const keyLearnings = project.keyLearnings;
  const screenshots = project.screenshots;
  const codeSnippets = project.codeSnippets;
  const stack = project.stack || project.tags;

  return (
    <>
      <Navbar />
      <main className="pd">
        <div className="pd__hero">
          <div className="container">
            <Link to="/#projects" className="pd__back">
              ← back to projects
            </Link>
            <p className="section-tag">case study</p>
            <h1 className="pd__title">{project.title}</h1>
            <p className="pd__tagline">{project.tagline}</p>
            <div className="pd__tags">
              {project.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            {(project.github || project.demo || project.pdf) && (
              <div className="pd__links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="pd__link"
                  >
                    <span>▸</span> github
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="pd__link"
                  >
                    <span>▸</span> live demo
                  </a>
                )}
                {project.pdf && (
                  <a
                    href={project.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="pd__link"
                  >
                    <span>▸</span> read pdf
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container pd__body">
          <div className="pd__grid">
            <aside className="pd__meta">
              <MetaRow label="role" value={project.role || "Security engineer"} />
              <MetaRow label="status" value={project.status || "ongoing"} />
              <MetaRow label="stack" value={stack.join(" · ")} />
              <MetaRow label="year" value={project.year || "2025"} />
            </aside>

            <article className="pd__content">
              <Section title="Overview" paragraphs={overview} />

              {problem && problem.length > 0 && (
                <Section title="The problem" paragraphs={problem} />
              )}

              {approach && approach.length > 0 && (
                <Section title="The approach" paragraphs={approach} />
              )}

              {results && results.length > 0 && (
                <section>
                  <h2>Results</h2>
                  <ul>
                    {results.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}

              {keyLearnings && keyLearnings.length > 0 && (
                <section>
                  <h2>Key learnings</h2>
                  <ul className="pd__learnings">
                    {keyLearnings.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </section>
              )}

              {codeSnippets && codeSnippets.length > 0 && (
                <section>
                  <h2>Code</h2>
                  {codeSnippets.map((s, i) => (
                    <CodeBlock
                      key={i}
                      title={s.title}
                      language={s.language}
                      code={s.code}
                    />
                  ))}
                </section>
              )}

              {screenshots && screenshots.length > 0 && (
                <section>
                  <h2>Screenshots</h2>
                  <div className="pd__shots">
                    {screenshots.map((s, i) => (
                      <figure key={i} className="pd__shot">
                        <img src={s.src} alt={s.caption || project.title} />
                        {s.caption && <figcaption>{s.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {!problem && !approach && !results && !keyLearnings && !screenshots && !codeSnippets && (
                <div className="pd__placeholder">
                  <span>full write-up</span>
                  <p>coming soon</p>
                </div>
              )}
            </article>
          </div>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="pd__next"
          >
            <div>
              <span className="section-tag">next project</span>
              <h3>{nextProject.title}</h3>
            </div>
            <span className="pd__next-arrow">→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, paragraphs }) {
  return (
    <section>
      <h2>{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="pd__meta-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
