import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const links = [
  { hash: "about",     label: "about" },
  { hash: "skills",    label: "skills" },
  { hash: "education", label: "education" },
  { hash: "projects",  label: "projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("about");
  const location                = useLocation();
  const navigate                = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking (only on home page)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = [...links.map((l) => l.hash), "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        // Trigger when section crosses the middle of the viewport
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [location.pathname]);

  const scrollToHash = (hash) => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      // Already on home — just smooth-scroll
      scrollToHash(hash);
    } else {
      // On a sub-page — go home then scroll after paint
      navigate("/");
      setTimeout(() => scrollToHash(hash), 80);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      scrollToHash("contact");
    } else {
      navigate("/");
      setTimeout(() => scrollToHash("contact"), 80);
    }
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo">
          <span className="nav__bracket">&lt;</span>
          houssam
          <span className="nav__cursor">_</span>
          <span className="nav__bracket">/&gt;</span>
        </Link>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {links.map((l, i) => (
            <a
              key={l.hash}
              href={`/#${l.hash}`}
              onClick={(e) => handleNavClick(e, l.hash)}
              className={
                location.pathname === "/" && active === l.hash
                  ? "is-active"
                  : ""
              }
              style={{ "--i": i }}
            >
              <span className="nav__num">0{i + 1}.</span>
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="nav__cta"
            onClick={handleContactClick}
          >
            contact
          </a>
        </nav>

        <button
          className="nav__burger"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
