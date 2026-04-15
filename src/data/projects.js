/*
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS DATA — edit this file to add or update projects.
 * ─────────────────────────────────────────────────────────────
 *
 *  Minimum required fields:
 *    slug, title, tagline, description, tags, accent
 *
 *  Optional rich fields used by the project detail page:
 *    role         — your role on the project
 *    status       — "completed" | "ongoing" | "archived" | etc.
 *    year         — "2024", "2025"
 *    stack        — array of technologies (falls back to tags)
 *    overview     — array of paragraphs (long intro)
 *    problem      — array of paragraphs (the context / challenge)
 *    approach     — array of paragraphs (how you built it)
 *    results      — array of strings (bullet list of outcomes)
 *    screenshots  — array of { src, caption } (put images in public/)
 *    pdf          — "/my-project.pdf" (path to a PDF in /public)
 *    github       — github repo URL
 *    demo         — live demo URL
 *    codeSnippets — array of { title, language, code } (syntax highlighted)
 *                   supported languages: python, javascript, typescript, jsx,
 *                   tsx, json, yaml, bash, sql, css, html, markdown, ...
 *
 *  Any field you omit is gracefully hidden on the detail page.
 */

export const projects = [
  {
    slug: "soc-siem-integration",
    title: "SOC Log Analytics & SIEM Integration",
    tagline: "Splunk-based SIEM with real-time threat detection",
    description:
      "End-to-end Security Operations Center log pipeline. Ingests Windows, Linux and network device logs into Splunk, correlates events using Sigma rules, and raises alerts for suspicious activity.",
    tags: ["Splunk", "Sigma", "Sysmon", "SIEM"],
    accent: "#00ff9c",

    // optional rich fields
    role: "Security engineer",
    status: "ongoing",
    year: "2025",
    stack: ["Splunk", "Sigma", "Sysmon", "Windows Event Log", "Linux auditd"],
    overview: [
      "Replace me: one or two paragraphs describing what the project is and why it matters.",
    ],
    problem: [
      "Replace me: describe the context, the threat model and the constraints that shaped the design.",
    ],
    approach: [
      "Replace me: architecture notes, detection logic, and implementation details.",
    ],
    results: [
      "Coverage of the target detection scope",
      "Latency and alert volume benchmarks",
      "Lessons learned during deployment",
    ],
    // screenshots: [{ src: "/projects/soc-1.png", caption: "Splunk dashboard" }],
    // pdf: "/projects/soc.pdf",
    // github: "https://github.com/yourname/soc",
    // demo: "https://example.com",
  },
  {
    slug: "active-directory-monitoring",
    title: "Active Directory Threat Monitoring",
    tagline: "Enterprise AD attack detection lab",
    description:
      "A full enterprise Active Directory lab simulating Kerberoasting, Pass-the-Hash and Golden Ticket attacks. Detections built with Sysmon, ETW and Sigma rules fed into a central alerting pipeline.",
    tags: ["Active Directory", "Sysmon", "ETW", "Sigma"],
    accent: "#00e5ff",
    role: "Security engineer",
    status: "ongoing",
    year: "2025",
    stack: ["Active Directory", "Sysmon", "ETW", "Sigma", "Windows Server"],
  },
  {
    slug: "custom-ids-python",
    title: "Custom Signature-Based IDS",
    tagline: "Lightweight Python intrusion detection system",
    description:
      "A signature-based network IDS written in Python. Parses packets with Scapy, matches against a YARA-style rule set and emits alerts to a local dashboard.",
    tags: ["Python", "Scapy", "IDS", "YARA"],
    accent: "#00ff9c",
    role: "Developer",
    status: "completed",
    year: "2024",
    stack: ["Python", "Scapy", "YARA", "Flask"],
    codeSnippets: [
      {
        title: "ids/sniffer.py",
        language: "python",
        code: `from scapy.all import sniff, IP, TCP
from rules import load_rules, match_rule
from alerting import send_alert

RULES = load_rules("rules/")

def inspect(pkt):
    """Run every incoming packet through the rule engine."""
    if IP not in pkt:
        return

    for rule in RULES:
        if match_rule(rule, pkt):
            send_alert(
                rule_id=rule.id,
                severity=rule.severity,
                src=pkt[IP].src,
                dst=pkt[IP].dst,
            )

if __name__ == "__main__":
    print("[+] starting IDS on eth0 ...")
    sniff(iface="eth0", prn=inspect, store=False)`,
      },
      {
        title: "rules/bruteforce_ssh.yml",
        language: "yaml",
        code: `id: R-0042
name: SSH brute force attempt
severity: high
protocol: tcp
port: 22
conditions:
  - type: threshold
    count: 10
    window: 60s
    field: src_ip
tags:
  - network
  - bruteforce
  - credential_access`,
      },
    ],
  },
  {
    slug: "malware-triage-tool",
    title: "Automated Malware Triage Tool",
    tagline: "Static analysis for rapid sample review",
    description:
      "A pipeline that ingests suspicious binaries, extracts PE metadata, strings, imports and yara matches, then outputs a triage report for analysts in seconds.",
    tags: ["Python", "YARA", "Static Analysis", "Malware"],
    accent: "#00e5ff",
    role: "Developer",
    status: "completed",
    year: "2024",
    stack: ["Python", "YARA", "pefile", "Jinja2"],
  },
  {
    slug: "web-vuln-sanitizer",
    title: "Web Vulnerability Sanitization Middleware",
    tagline: "Defense-in-depth for modern web apps",
    description:
      "An Express.js middleware that sanitizes input against XSS, SQLi, and path traversal. Ships with logging hooks that forward blocked requests to a SIEM for correlation.",
    tags: ["Node.js", "Express", "Security", "Web"],
    accent: "#00ff9c",
    role: "Full-stack developer",
    status: "completed",
    year: "2024",
    stack: ["Node.js", "Express", "JavaScript", "DOMPurify"],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
