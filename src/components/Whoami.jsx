import { useReveal } from "../hooks/useReveal.js";
import "./Whoami.css";

const roles = [
  "Developer",
  "SOC Analyst",
  "System Administrator",
  "Network Engineer",
  "Detection Engineer",
  "Threat Hunter",
];

export default function Whoami() {
  const [ref, visible] = useReveal();

  return (
    <section id="whoami" className="section whoami">
      <div className="container">
        <div
          ref={ref}
          className={`whoami__card reveal ${visible ? "visible" : ""}`}
        >
          <div className="whoami__bar">
            <div className="whoami__dots">
              <span />
              <span />
              <span />
            </div>
            <div className="whoami__path">~/houssam — whoami</div>
            <div className="whoami__pill">root@soc</div>
          </div>

          <div className="whoami__body">
            <div className="whoami__head">
              <p className="section-tag">$ whoami --verbose</p>
              <h2 className="whoami__heading">
                A <span>multitasker</span> who lives between <span>code</span>,{" "}
                <span>defense</span> and <span>numbers</span>.
              </h2>
            </div>

            <div className="whoami__grid">
              <div className="whoami__text">
                <p>
                  I'm Houssam — a cybersecurity enthusiast and full-stack
                  developer with a slightly unusual background: I hold a
                  <strong> Master's degree in Quantitative Economics</strong>,
                  which means I learned how to read data, model systems and spot
                  anomalies long before I started chasing them inside SIEMs and
                  packet captures. That analytical muscle is exactly what makes
                  me comfortable moving between roles that usually live in
                  different silos.
                </p>
                <p>
                  I can sit on the <strong>blue team</strong> as a SOC analyst,
                  triaging alerts in Splunk, writing Sigma detections, hunting
                  through Sysmon and ETW logs, and responding to incidents with
                  a clear playbook in hand. I can also wear the
                  <strong> system administrator</strong> hat — hardening Linux
                  and Windows boxes, managing Active Directory, handling
                  Defender, firewalls, Docker containers and cloud workloads. On
                  the <strong>network</strong> side, I'm fluent in TCP/IP,
                  traffic analysis with Wireshark and TCPdump, IDS/IPS tuning
                  with Suricata, and general troubleshooting.
                </p>
                <p>
                  And when the problem calls for building instead of defending,
                  I switch to <strong>developer mode</strong> — shipping
                  full-stack apps with the MERN stack, writing Python automation
                  for security tooling, crafting clean React interfaces, and
                  integrating everything with Git, CI and containers. I don't
                  see these worlds as separate: a good analyst who can code, a
                  sysadmin who thinks like an attacker, and a developer who
                  understands risk is worth more than three specialists who
                  can't talk to each other.
                </p>
                <p>
                  That's the role I'm looking for — one where I can keep
                  learning, wear multiple hats, and bring both the technical
                  skill and the analytical mindset that my economics background
                  trained me in. If your team needs someone adaptable, curious
                  and genuinely excited by security, I'm ready.
                </p>
              </div>

              <aside className="whoami__side">
                <div className="whoami__stats">
                  <Stat label="background" value="IT + Economics" />
                  <Stat label="focus" value="SOC / Dev / Sysadmin" />
                  <Stat label="languages" value="EN · FR · AR · DE" />
                  <Stat label="status" value="open to work" highlight />
                </div>

                <div className="whoami__roles">
                  <p className="whoami__roles-label">$ cat ./open-to.txt</p>
                  <ul>
                    {roles.map((r) => (
                      <li key={r}>
                        <span>▸</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className={`whoami__stat ${highlight ? "whoami__stat--hl" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
