import { useEffect, useRef, useState } from "react";
import Terminal from "./Terminal.jsx";
import "./Hero.css";

const roles = [
  "a hacker.",
  "a SOC analyst.",
  "a threat hunter.",
  "a detection engineer.",
];

function useTypewriter(words, typeSpeed = 90, deleteSpeed = 45, pause = 1500) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    let timer;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      timer = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

// Subtle 3D mouse-tilt for the terminal panel.
// Disabled automatically for users who prefer reduced motion
// or are on a touch device (no hover capability).
function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine   = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    let raf = 0;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0..1
      const y = (e.clientY - rect.top)  / rect.height;  // 0..1
      const rx = (0.5 - y) * (maxTilt * 2);             // -tilt..+tilt
      const ry = (x - 0.5) * (maxTilt * 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--tilt-mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--tilt-my", `${(y * 100).toFixed(1)}%`);
      });
    };

    const handleLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt]);

  return ref;
}

export default function Hero() {
  const typed = useTypewriter(roles);
  const tiltRef = useTilt(7);

  return (
    <section id="about" className="hero">
      <div className="hero__bg" />
      <div className="hero__plane" aria-hidden="true">
        <div className="hero__plane-grid" />
      </div>
      <div className="container hero__inner">
        <div className="hero__left">
          <p className="hero__greeting">
            <span className="hero__dot" />
            access granted · welcome
          </p>
          <h1 className="hero__title">
            Hello, I'm <span className="hero__name">Houssam</span>,
            <br />
            <span className="hero__typed">
              {typed}
              <span className="hero__caret">|</span>
            </span>
          </h1>
          <p className="hero__desc">
            I build, break and defend systems. Passionate about threat
            detection, incident response and hunting for the weird traces
            adversaries leave behind. Currently sharpening skills across the
            blue team toolkit — Splunk, Sysmon, Sigma, YARA — while keeping one
            foot in full-stack development.
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              view projects <span>→</span>
            </a>
            <a
              href="/cv.pdf"
              download="Houssam-CV.pdf"
              className="btn btn--ghost"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              download CV
            </a>
          </div>

          <div className="hero__socials">
            <a href="#" aria-label="GitHub">github</a>
            <span>·</span>
            <a href="#" aria-label="LinkedIn">linkedin</a>
            <span>·</span>
            <a href="#" aria-label="HackTheBox">hackthebox</a>
          </div>
        </div>

        <div className="hero__right" ref={tiltRef}>
          <div className="hero__tilt">
            <div className="hero__tilt-glow" />
            <Terminal />
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span>scroll</span>
        <div className="hero__scrollline" />
      </div>
    </section>
  );
}
