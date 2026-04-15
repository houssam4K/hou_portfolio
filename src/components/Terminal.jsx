import { useEffect, useState } from "react";
import "./Terminal.css";

const lines = [
  { prompt: "$", text: "whoami", out: "houssam // security analyst" },
  { prompt: "$", text: "cat /etc/profile", out: "role: SOC analyst & pentester" },
  { prompt: "$", text: "ls ./skills", out: "splunk sigma yara sysmon python react ..." },
  { prompt: "$", text: "nmap -sV target.corp", out: "scanning... [████████] 100%" },
  { prompt: "$", text: "./hire-me.sh", out: "connection established ✓" },
];

export default function Terminal() {
  const [rendered, setRendered] = useState([]);
  const [typing, setTyping] = useState({ line: 0, char: 0, phase: "cmd" });

  useEffect(() => {
    const { line, char, phase } = typing;
    if (line >= lines.length) return;
    const target = lines[line][phase === "cmd" ? "text" : "out"];
    if (char < target.length) {
      const t = setTimeout(
        () => setTyping((s) => ({ ...s, char: s.char + 1 })),
        phase === "cmd" ? 55 : 20
      );
      return () => clearTimeout(t);
    }
    if (phase === "cmd") {
      const t = setTimeout(
        () => setTyping((s) => ({ ...s, phase: "out", char: 0 })),
        300
      );
      return () => clearTimeout(t);
    }
    setRendered((r) => [...r, lines[line]]);
    const t = setTimeout(
      () => setTyping({ line: line + 1, char: 0, phase: "cmd" }),
      650
    );
    return () => clearTimeout(t);
  }, [typing]);

  const current = lines[typing.line];
  const shownCmd =
    current && (typing.phase === "cmd"
      ? current.text.slice(0, typing.char)
      : current.text);
  const shownOut =
    current && typing.phase === "out" ? current.out.slice(0, typing.char) : "";

  return (
    <div className="terminal">
      <div className="terminal__bar">
        <div className="terminal__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal__title">houssam@soc ~ bash</div>
        <div className="terminal__pill">secure</div>
      </div>
      <div className="terminal__body">
        {rendered.map((l, i) => (
          <div key={i}>
            <div className="terminal__line">
              <span className="terminal__prompt">{l.prompt}</span>
              <span>{l.text}</span>
            </div>
            <div className="terminal__out">{l.out}</div>
          </div>
        ))}
        {current && (
          <>
            <div className="terminal__line">
              <span className="terminal__prompt">{current.prompt}</span>
              <span>{shownCmd}</span>
              {typing.phase === "cmd" && <span className="terminal__blink">▋</span>}
            </div>
            {typing.phase === "out" && (
              <div className="terminal__out">
                {shownOut}
                <span className="terminal__blink">▋</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
