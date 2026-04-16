import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./NotFound.css";

const glitchLines = [
  "$ locate --path",
  "tracing route...",
  "hop 1:  router.local          [  12ms ]",
  "hop 2:  edge-gateway-03       [  34ms ]",
  "hop 3:  ???.???.???.???       [timeout]",
  "hop 4:  * * *",
  "",
  "ERROR: destination unreachable",
  "ERROR: path does not exist in filesystem",
  "",
  "→ connection terminated",
];

export default function NotFound() {
  const location = useLocation();
  const [typed, setTyped] = useState([]);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (line >= glitchLines.length) return;
    const target = glitchLines[line];
    if (char < target.length) {
      const t = setTimeout(() => setChar((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped((p) => [...p, target]);
      setLine((l) => l + 1);
      setChar(0);
    }, 120);
    return () => clearTimeout(t);
  }, [line, char]);

  const currentLine =
    line < glitchLines.length ? glitchLines[line].slice(0, char) : "";
  const done = line >= glitchLines.length;

  return (
    <>
      <Navbar />
      <main className="nf">
        <div className="nf__grid" />
        <div className="nf__glow nf__glow--a" />
        <div className="nf__glow nf__glow--b" />

        <div className="container nf__inner">
          <div className="nf__code" data-text="404">
            404
          </div>

          <p className="section-tag nf__tag">signal lost</p>
          <h1 className="nf__title">This page doesn't exist.</h1>
          <p className="nf__sub">
            The path <code>{location.pathname}</code> wasn't found on the
            server. It might have been moved, renamed, or it never existed in
            the first place.
          </p>

          <div className="nf__terminal">
            <div className="nf__bar">
              <div className="nf__dots">
                <span />
                <span />
                <span />
              </div>
              <div className="nf__path">~/trace — error log</div>
              <div className="nf__pill nf__pill--err">error</div>
            </div>
            <div className="nf__body">
              {typed.map((l, i) => (
                <div
                  key={i}
                  className={`nf__line ${
                    l.startsWith("ERROR") ? "is-err" : ""
                  } ${l.startsWith("$") ? "is-cmd" : ""}`}
                >
                  {l || "\u00A0"}
                </div>
              ))}
              {!done && (
                <div
                  className={`nf__line ${
                    currentLine.startsWith("ERROR") ? "is-err" : ""
                  } ${currentLine.startsWith("$") ? "is-cmd" : ""}`}
                >
                  {currentLine || "\u00A0"}
                  <span className="nf__caret">▋</span>
                </div>
              )}
              {done && (
                <div className="nf__line is-cmd">
                  $<span className="nf__caret">▋</span>
                </div>
              )}
            </div>
          </div>

          <div className="nf__actions">
            <Link to="/" className="nf__btn nf__btn--primary">
              <span>←</span> return to base
            </Link>
            <Link to="/projects" className="nf__btn nf__btn--ghost">
              view all projects
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
