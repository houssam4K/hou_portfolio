import { useReveal } from "../hooks/useReveal.js";
import { education, languages } from "../data/education.js";
import "./Education.css";

export default function Education() {
  const [ref, visible] = useReveal();

  return (
    <section id="education" className="section education">
      <div className="container">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <p className="section-tag">learning path</p>
          <h2 className="section-heading">Education & certifications</h2>
        </div>

        <div className="edu__timeline">
          {education.map((e, i) => (
            <EduCard key={e.title} item={e} index={i} />
          ))}
        </div>

        <div className="edu__langs">
          <h3 className="edu__langs-title">
            <span className="section-tag">/ languages</span>
          </h3>
          <div className="edu__langs-grid">
            {languages.map((l) => (
              <div key={l.name} className="edu__lang">
                <span className="edu__lang-name">{l.name}</span>
                <span className="edu__lang-level">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EduCard({ item, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`edu__card reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="edu__marker">
        <div className="edu__marker-dot" />
      </div>
      <div className="edu__body">
        <div className="edu__meta">
          <span className="edu__type">{item.type}</span>
          <span className="edu__year">{item.year}</span>
        </div>
        <h3 className="edu__title">{item.title}</h3>
        <p className="edu__issuer">{item.issuer}</p>
        <p className="edu__desc">{item.description}</p>
        {item.credential && (
          <div className="edu__cred">
            <span>credential</span>
            <code>{item.credential}</code>
          </div>
        )}
      </div>
    </div>
  );
}
