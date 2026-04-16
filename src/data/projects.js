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
 *    github       "https://github.com/houssamaitsouki45-sys/Advanced-Web-Vulnerability-Sanitization-Middleware.git"
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
    tagline:
      "Production-grade SIEM pipeline with automated threat detection and SOAR response",
    description:
      "End-to-end Security Operations Center built on the Elastic Stack. Ingests 12,000+ events/second from firewalls, endpoints, DNS, AD, and AWS — normalizes to ECS, enriches with threat intel, detects across 87 MITRE ATT&CK techniques, and automates triage via Shuffle SOAR to achieve an 8-minute mean time to respond.",
    tags: [
      "ELK Stack",
      "SIGMA",
      "Wazuh",
      "Suricata",
      "MITRE ATT&CK",
      "SOAR",
      "SIEM",
    ],
    accent: "#00ff9c",

    role: "Security Engineer",
    github:
      "https://github.com/houssamaitsouki45-sys/Security-Operations-Center-SOC-Log-Analytics-SIEM-Integration.git",
    status: "ongoing",
    year: "2025",
    stack: [
      "Elasticsearch 8.x",
      "Logstash",
      "Kibana",
      "Wazuh 4.x",
      "Sysmon",
      "Suricata",
      "pfSense",
      "Filebeat",
      "Winlogbeat",
      "Shuffle SOAR",
      "SIGMA",
      "Atomic Red Team",
      "AbuseIPDB",
      "AlienVault OTX",
      "VirusTotal",
      "AWS CloudTrail",
      "Docker",
      "Python 3",
      "Jira",
      "Slack",
    ],
    overview: [
      "A full-scale SOC environment designed to simulate a mid-size enterprise network across four segments — DMZ, corporate LAN, server VLAN, and an AWS cloud tier. Every segment generates distinct telemetry that feeds a centralized Elastic SIEM pipeline capable of ingesting over 12,000 events per second from heterogeneous sources.",
      "The pipeline normalizes all data to the Elastic Common Schema, enriches events with GeoIP and threat intelligence, tags them with MITRE ATT&CK technique IDs, and feeds a detection engine of 48 custom SIGMA rules. A Shuffle SOAR layer then handles 68% of alerts autonomously — cutting mean time to respond from 47 minutes down to 8.",
    ],
    problem: [
      "The core challenge was building a monitoring pipeline that could handle high-volume, heterogeneous log sources — firewalls, Windows endpoints, Linux servers, DNS, Active Directory, and cloud APIs — without losing fidelity or creating analyst fatigue from noisy, uncorrelated alerts.",
      "Detection had to be grounded in real adversary behavior rather than generic signatures, and repetitive Tier-1 tasks like IP lookups, firewall blocks, and ticket creation were consuming most of the analyst team's time. The design needed to solve visibility, signal quality, and response speed simultaneously.",
    ],
    approach: [
      "A multi-pipeline Logstash architecture separates ingestion by source type, each running in its own thread pool. Fifteen custom Grok patterns handle unstructured sources like pfSense, all validated against 500+ real log lines targeting a 99.5% parse success rate. Everything is normalized to ECS 8.x so detections and dashboards work uniformly across all sources.",
      "The detection library consists of 48 SIGMA rules organized by ATT&CK tactic and converted to ES|QL/KQL, supplemented by multi-event EQL correlation rules that dramatically cut false positives — the brute-force-plus-successful-login correlation eliminated 94% of standalone rule noise while maintaining 100% catch rate in testing. All 48 rules were validated using Atomic Red Team, with 45 passing automated tests.",
      "Six Shuffle SOAR playbooks automate the most frequent response workflows: malicious IP containment (query VirusTotal + AbuseIPDB → push pfSense block rule → open Jira ticket), brute force account lockout, suspicious process investigation, phishing email sandboxing, data exfiltration packet capture, and scheduled executive report generation.",
    ],
    results: [
      "12,400 events/second ingested across all sources — a 287% increase over the baseline capacity.",
      "Average detection latency reduced from 8.4 seconds to 1.2 seconds (−86%).",
      "Daily alert volume tuned from ~2,300 down to ~870 with a false positive rate of 4.7% (−62%).",
      "Mean time to respond dropped from 47 minutes to 8 minutes (−83%) with SOAR automation handling 68% of alerts without analyst intervention.",
      "87 MITRE ATT&CK techniques covered across 12 tactics; 93.75% detection rule pass rate on Atomic Red Team validation (45/48 rules).",
      "Key lesson: heavy upfront investment in Grok test corpora and a dedicated two-week tuning period were critical to achieving low false positive rates in production.",
    ],
  },
  {
    slug: "ad-threat-monitoring",
    title: "Enterprise Active Directory Threat Monitoring & Alerting",
    tagline:
      "Blue team detection lab for Kerberos abuse and credential dumping",
    description:
      "Virtualized Active Directory environment purpose-built for detection engineering. Simulates advanced attacks — LSASS credential dumping, Pass-the-Ticket, and Kerberos delegation abuse — then hunts for them using Sysmon telemetry and targeted PowerShell alerting logic.",
    tags: [
      "Active Directory",
      "Sysmon",
      "Kerberos",
      "Blue Team",
      "Detection Engineering",
    ],
    accent: "#00ff9c",

    role: "Security Engineer",
    github:
      "https://github.com/houssamaitsouki45-sys/Enterprise-Active-Directory-Threat-Monitoring-Alerting-Environment.git",
    status: "completed",
    year: "2025",
    stack: [
      "Windows Server 2022",
      "Windows 10 Enterprise",
      "Sysmon",
      "Windows Event Logs",
      "PowerShell",
      "Oracle VirtualBox",
      "Active Directory",
      "Group Policy (GPO)",
      "LAPS",
      "Mimikatz (simulation)",
    ],
    overview: [
      "A fully isolated, virtualized Active Directory domain — one Domain Controller and two domain-joined workstations — engineered specifically from the Blue Team perspective. The goal was not exploitation, but detection: configure deep endpoint telemetry, simulate realistic attack chains, and build alerting logic that catches what default Windows logging misses.",
      "The lab focuses on three high-impact attack categories commonly used by real threat actors: in-memory credential dumping via LSASS access, Kerberos ticket theft and Pass-the-Ticket lateral movement, and Unconstrained Delegation abuse to escalate to Domain Admin.",
    ],
    problem: [
      "Default Windows audit logging is too shallow to detect advanced, stealthy attacks like memory scraping or forged Kerberos ticket injection. Security teams that rely only on native event logs are blind to the exact techniques attackers use to move laterally and escalate privileges inside AD environments.",
      "The challenge was to close that visibility gap — deploying the right telemetry, tuning it to reduce noise, and writing hunt queries precise enough to flag malicious behavior without drowning analysts in false positives.",
    ],
    approach: [
      "Sysmon was deployed domain-wide using a customized SwiftOnSecurity configuration file to capture granular telemetry: process creation, network connections, and — critically — process memory access (Event ID 10). Advanced Audit Policies were enforced via GPO to enable Kerberos authentication and service ticket logging (Event IDs 4624, 4769, 4768, 4776).",
      "For LSASS credential dumping detection, a PowerShell hunt query filters Sysmon Event ID 10 for any process requesting PROCESS_VM_READ rights on lsass.exe, excluding known-legitimate callers like svchost.exe. The query successfully flagged a malicious PowerShell process performing the dump.",
      "For Pass-the-Ticket detection, the alerting logic correlates Logon Type 9 (NewCredentials) in Event ID 4624 with a sudden CIFS service ticket request (Event ID 4769) from a host with no recent DC authentication — a reliable indicator of ticket injection without a matching domain logon event.",
      "Hardening was applied based on findings: Unconstrained Delegation was audited and removed from all non-essential servers (transitioned to RBCD), LAPS was deployed via GPO to break lateral credential reuse, and RunAsPPL was enabled in the registry to protect lsass.exe from non-kernel memory reads.",
    ],
    results: [
      "Successfully detected LSASS memory scraping via Sysmon Event ID 10, catching what native Windows logs would have missed entirely.",
      "Pass-the-Ticket attack identified through Logon Type 9 + Event 4769 correlation — no SIEM required, pure PowerShell hunt logic.",
      "Key lesson: visibility is not about log volume — it's about the right telemetry at the right depth. Sysmon + targeted audit policy turns a default AD environment into a high-fidelity detection surface.",
      "All three attack vectors were fully remediated: Unconstrained Delegation removed, LAPS deployed, and LSASS protected via PPL.",
    ],
  },
  {
    slug: "python-ids",
    title: "Custom Signature-Based Intrusion Detection System",
    tagline: "Host-based IDS built from scratch in Python using raw sockets",
    description:
      "A lightweight, host-based IDS engineered from the ground up in Python. Captures live network traffic via raw sockets, decodes Ethernet/IPv4/TCP headers at the binary level, and inspects payloads in real-time against an expandable signature database — with multi-threaded architecture, URL-decode evasion bypass, and a color-coded alerting engine.",
    tags: [
      "Python",
      "IDS",
      "Network Security",
      "Raw Sockets",
      "Detection Engineering",
    ],
    accent: "#00ff9c",

    role: "Security Engineer",
    github:
      "https://github.com/houssamaitsouki45-sys/Custom-Signature-Based-Intrusion-Detection-System-Python-.git",
    status: "completed",
    year: "2025",
    stack: [
      "Python 3.x",
      "Raw Sockets (AF_PACKET)",
      "struct (binary unpacking)",
      "threading + queue.Queue",
      "re (Regex)",
      "colorama",
      "urllib.parse",
      "sqlmap",
      "nmap",
      "hydra",
      "XSStrike",
    ],
    overview: [
      "A host-based Intrusion Detection System built entirely from scratch in Python — no libpcap, no Scapy. The system opens a raw AF_PACKET socket to capture live Ethernet frames, then manually unpacks Ethernet, IPv4, and TCP headers using Python's struct module to produce structured packet objects for inspection.",
      "The detection layer combines a signature database of regex patterns (SQLi, XSS, RCE, path traversal) with stateful behavioral checks for SYN port scanning and brute-force login attempts. All alerts are dispatched to a color-coded console output, a persistent log file, and optionally via SMTP email — with URL-decoding applied to payloads before matching to defeat simple encoding evasion.",
    ],
    problem: [
      "Most IDS tooling sits on top of heavy libraries or kernel modules, making it a black box for learning and customization. The goal was to build a detection system where every layer — from raw frame capture to alert dispatch — is written and understood from first principles.",
      "A secondary challenge was evasion: naive string matching on raw HTTP payloads is trivially bypassed via URL encoding or case variation. The system needed to handle these at the parsing layer before signatures are applied.",
    ],
    approach: [
      "Two threads run in parallel connected by a thread-safe queue.Queue with a capacity of 5,000 packets. Thread 1 (sniffer.py) runs the infinite capture loop — reading raw frames, parsing Ethernet → IP → TCP headers with struct.unpack, URL-decoding the payload via urllib.parse.unquote, and pushing Packet dataclass objects onto the queue. Thread 2 (detector.py) consumes the queue and runs every packet through three checks: signature matching, port scan detection, and brute-force detection.",
      "The signature database (signatures.py) contains 23 regex rules across four attack categories — SQL Injection (8 rules including UNION SELECT, OR 1=1, DROP TABLE, batch queries), XSS (6 rules including script tags, event handlers, javascript: URI, document.cookie), RCE (5 rules covering command chaining, /etc/passwd, shell binaries, curl/wget pipes), and Path Traversal (3 rules for dot-dot, encoded, and Windows-style paths). Each rule carries a severity level of LOW, MEDIUM, HIGH, or CRITICAL.",
      "Behavioral detections use sliding time-window state trackers: port scan fires when a single source IP hits 15+ unique ports within 10 seconds (SYN flag only); brute force fires when the same IP/port pair sees 10+ connection attempts within 30 seconds, covering SSH, FTP, RDP, and Telnet. Both trackers auto-reset after firing to prevent duplicate alert floods.",
    ],
    results: [
      "Detection rates validated against real attack tools in an isolated lab VM: SQLi via sqlmap — 95%, SYN port scan via nmap -sS — 100%, SSH brute force via Hydra — 100%, XSS payloads via XSStrike — 88%, manual path traversal — 90%.",
      "URL encoding evasion (%27, %2e%2e%2f, etc.) and case variation fully mitigated at the parsing stage. Known blind spots documented honestly: HTTPS/TLS traffic (ciphertext only), HTTP/2, fragmented packets, and Base64-encoded payloads.",
      "Key lesson: building at the binary/socket level gives precise control over every parsing decision — but also exposes exactly where commercial tools add value (packet reassembly, TLS inspection, kernel-bypass performance).",
    ],
  },
  {
    slug: "malware-triage-tool",
    title: "Automated Malware Triage & Static Analysis Tool",
    tagline: "First-pass triage for suspicious files in seconds, not minutes",
    description:
      "A Python command-line tool that automates the first-pass triage of suspicious files (PE, Office, PDF, ELF) using static analysis, 35 custom YARA rules, and threat intelligence integration to deliver a risk score and verdict in ~14 seconds.",
    tags: [
      "Malware Analysis",
      "Python",
      "YARA",
      "Static Analysis",
      "SOC Automation",
      "Threat Intelligence",
    ],
    accent: "#00e5ff",
    role: "Sole Developer / Security Researcher",
    status: "completed",
    year: "2024",
    github:
      "https://github.com/houssamaitsouki45-sys/Automated-Malware-Triage-Static-Analysis-Tool.git",
    stack: [
      "Python 3",
      "pefile",
      "pyelftools",
      "oletools",
      "yara-python",
      "ppdeep (ssdeep)",
      "VirusTotal API",
      "MalwareBazaar API",
      "rich (CLI)",
      "Jinja2",
    ],
    overview: [
      "An end-to-end static analysis pipeline that automates the repetitive checklist every SOC analyst runs when a suspicious file lands in the quarantine queue: hash it, check VirusTotal, pull strings, inspect imports, check entropy.",
      "The tool ingests a PE executable, Office document, PDF, or ELF binary and outputs a weighted risk score (0–100) with a clear verdict — Clean, Suspicious, or Malicious — alongside a structured report ready to paste into a Jira ticket.",
    ],
    problem: [
      "Manual triage is a bottleneck in SOC operations. Running the same checklist on every sample — hashing, entropy analysis, import inspection, VirusTotal lookups, YARA scanning — is slow, repetitive, and error-prone.",
      "The hard part isn't automating each step individually; it's combining their signals into a single trustworthy verdict that distinguishes packed legitimate software from real malicious stagers without drowning analysts in false positives.",
    ],
    approach: [
      "The pipeline identifies file types via magic bytes (not extensions), then extracts multiple hash types (MD5, SHA256, ssdeep, imphash) and classifies extracted strings into URLs, IPs, registry keys, and API calls.",
      "Each imported API is mapped to a behavior category — injection, persistence, anti-debug, network, crypto, privilege escalation — so the tool reports what the binary intends to do, not just what it imports. A combination like CreateRemoteThread + VirtualAllocEx + InternetOpenA tells an immediate story.",
      "A weighted scoring engine combines entropy thresholds (>7.2 for packed sections), YARA matches (35 custom rules including modified UPX variants), behavior profile breadth, and VirusTotal detection ratio. Weights were tuned iteratively against a 1,200-sample labeled corpus until clean separation was achieved between the three verdict tiers.",
    ],
    results: [
      "94.6% true positive rate against a test corpus of 1,200 labeled samples",
      "3.25% false positive rate, achieved through iterative weight tuning",
      "~14 second average analysis time per file",
      "91% detection rate on packed samples using entropy thresholds alone",
      "Imphash-based clustering grouped 78% of PE malware variants into correct families even when SHA256 hashes differed",
    ],
    keyLearnings: [
      "Imphash is underrated for malware family clustering — it catches variants that SHA256 misses entirely.",
      "Entropy is the single most reliable static packer detector; simple math, minimal false alarms.",
      "Static analysis has honest limits. Fileless stagers score low no matter how good the rules are, so the tool explicitly flags these cases and recommends sandbox analysis rather than pretending it caught everything.",
      "Scoring weights cannot be guessed. The first hand-tuned weights performed poorly — real separation only came from iterating against the labeled corpus.",
    ],
    codeSnippets: [
      {
        title: "Entropy & Section Analysis",
        language: "python",
        code: `def entropy(data):
    if not data: return 0.0
    counts = Counter(data)
    length = len(data)
    return -sum((c/length) * math.log2(c/length) for c in counts.values())

def check_sections(path):
    pe = pefile.PE(path)
    findings = []
    for s in pe.sections:
        name = s.Name.rstrip(b"\\x00").decode(errors="replace")
        ent = round(entropy(s.get_data()), 2)
        packed = ent > 7.2
        wxe = bool(s.Characteristics & 0x80000000
                   and s.Characteristics & 0x20000000)
        findings.append({"name": name, "entropy": ent,
                         "packed": packed, "write_exec": wxe})
    return findings`,
      },
      {
        title: "API Behavior Profiling",
        language: "python",
        code: `BEHAVIOR = {
    "CreateRemoteThread": "injection", "VirtualAllocEx": "injection",
    "WriteProcessMemory": "injection", "IsDebuggerPresent": "anti_debug",
    "InternetOpenA": "network", "URLDownloadToFileA": "network",
    "RegSetValueExA": "persistence", "CryptEncrypt": "crypto",
    "AdjustTokenPrivileges": "priv_esc", "ShellExecuteA": "execution",
    # 412 mappings in full version
}

def profile_imports(path):
    pe = pefile.PE(path)
    profile = {}
    for entry in getattr(pe, "DIRECTORY_ENTRY_IMPORT", []):
        for imp in entry.imports:
            if imp.name:
                cat = BEHAVIOR.get(imp.name.decode(errors="replace"))
                if cat:
                    profile.setdefault(cat, []).append(imp.name.decode())
    return profile`,
      },
      {
        title: "YARA Rule — UPX Packer Detection",
        language: "yara",
        code: `rule UPX_Packed {
    meta:
        description = "UPX packed PE (including modified variants)"
        severity = 6
    strings:
        $upx0 = "UPX0" ascii
        $upx1 = "UPX1" ascii
        $stub = { 60 BE ?? ?? ?? ?? 8D BE ?? ?? ?? ?? 57 83 CD FF }
    condition:
        uint16(0) == 0x5A4D and (($upx0 and $upx1) or $stub)
}`,
      },
      {
        title: "Weighted Scoring Engine",
        language: "python",
        code: `def score(findings):
    s = 0
    s += 8 * len([x for x in findings["sections"] if x["packed"]])
    s += 3 * len(findings.get("behavior_profile", {}))
    s += sum(m["severity"] for m in findings.get("yara_matches", []))
    if findings.get("vt_ratio", 0) > 0.3:
        s += 12
    if findings.get("signed"):
        s -= 8
    s = max(0, min(100, s))
    verdict = ("CLEAN" if s <= 29
               else "SUSPICIOUS" if s <= 64
               else "MALICIOUS")
    return {"score": s, "verdict": verdict}`,
      },
    ],
  },
  {
    slug: "web-sanitization-middleware",
    title: "Advanced Web Vulnerability Sanitization Middleware",
    tagline:
      "Drop-in Express middleware that neutralizes OWASP Top 10 attacks before they reach your handlers",
    description:
      "A Node.js/Express middleware that sits between HTTP requests and route handlers, detecting and neutralizing XSS, SQL injection, command injection, path traversal, SSRF, and prototype pollution attacks with ~0.3ms per-request overhead at 12,400 req/s.",
    tags: [
      "AppSec",
      "Node.js",
      "Express",
      "Middleware",
      "OWASP",
      "Web Security",
    ],
    accent: "#00e5ff",
    role: "Sole Developer / Security Engineer",
    status: "completed",
    year: "2024",
    github:
      "https://github.com/houssamaitsouki45-sys/Advanced-Web-Vulnerability-Sanitization-Middleware.git",
    stack: [
      "Node.js",
      "Express",
      "Jest (testing)",
      "autocannon (benchmarks)",
      "OWASP payload corpus",
      "PayloadsAllTheThings",
    ],
    overview: [
      "A centralized security layer for Express applications that inspects every input source — body, query params, URL path, headers, and cookies — and either sanitizes, blocks, or logs malicious payloads before they reach route handlers. One line of code (app.use(sanitize())) protects the entire attack surface.",
      "The middleware covers six major attack categories with a configurable per-category mode (sanitize / block / monitor), processes around 12,400 requests/sec on a single core, and emits structured threat events that plug directly into existing SIEM or alerting pipelines.",
    ],
    problem: [
      "The same vulnerability patterns appear over and over in pentest reports across different projects. Developers fix each one locally, then the same bug reappears somewhere else in the codebase. Relying on individual developers to remember every encoding trick and every edge case is not a security strategy.",
      "The hard part isn't writing a regex for <script> tags — it's handling the encoding layers attackers use to bypass naive filters: double URL encoding, HTML entities, Unicode escapes, null bytes, and overlong UTF-8. A middleware that can't see through these is worse than no middleware because it creates false confidence.",
    ],
    approach: [
      "Every input value is recursively walked and passed through a decodeNested() function that peels off encoding layers (URL, HTML entities, Unicode, null bytes) until the string stops changing — typically 2 to 4 iterations. Only then is the decoded payload matched against detection patterns, making stacked-encoding bypasses visible.",
      "Each attack category is an independent module (xss, sqli, cmdi, path-traversal, ssrf, proto-pollution) with its own detection patterns, severity classification, and sanitization strategy. Modes are configured per-category: SQLi and command injection default to block, XSS and path traversal default to sanitize, and everything can be set to monitor-only for gradual rollout.",
      "SSRF protection goes beyond hostname blocklists — the middleware performs DNS resolution on every user-supplied URL and blocks requests whose hostnames resolve to private or metadata IPs. This catches DNS-rebinding attacks where an attacker-controlled domain points to 127.0.0.1 or 169.254.169.254.",
      "All regexes are compiled once at startup, primitive types short-circuit early, and recursion depth on nested objects is capped to prevent ReDoS — which I caught in my own middleware during load testing and had to fix before it shipped.",
    ],
    results: [
      "XSS: 98.6% detection across 147 real-world payloads, 0.8% false positive rate",
      "SQL Injection: 96.2% detection across 89 payloads, 1.1% false positive rate",
      "Command Injection: 97.8% detection across 54 payloads, 0.5% false positive rate",
      "Path Traversal, SSRF, and Prototype Pollution: 100% detection, 0% false positives",
      "Performance: 12,400 req/s on a single core with ~0.3ms average added latency and only +4 MB memory overhead",
      "Total corpus: 381 payloads sourced from OWASP testing guides, PayloadsAllTheThings, and real bug bounty reports",
    ],
    keyLearnings: [
      "Encoding is the real battlefield. The actual payload is usually trivial; the layers of encoding around it are what defeat naive filters. The decodeNested() function ended up being the most important piece in the entire middleware.",
      "Block mode needs to be selective. My first version blocked everything and broke legitimate users typing names like O'Brien or expressions like 3 > 2. I learned to classify threats by confidence and auto-block only high-confidence matches.",
      "SSRF protection requires DNS-level checking. Hostname blocklists are trivially bypassed by DNS rebinding — resolving the hostname and checking the actual IP is the only reliable defense.",
      'Prototype pollution is underrated. A single {"__proto__": {"isAdmin": true}} in a JSON body can escalate privileges application-wide in Express apps that use object spread or Object.assign. A one-line fix — if you know to do it.',
      "Security tooling can contain its own vulnerabilities. I almost shipped a ReDoS in my own security middleware because one of my patterns had nested quantifiers. Load testing with long adversarial inputs caught it before release.",
    ],
    codeSnippets: [
      {
        title: "Multi-layer Decoder — the core of bypass resistance",
        language: "javascript",
        code: `function decodeNested(input) {
    // Attackers stack encodings: %253C = double URL-encoded '<'
    // Decode repeatedly until the string stops changing
    let prev = '';
    let current = input;
    let iterations = 0;

    while (current !== prev && iterations < 5) {
        prev = current;

        // URL decode
        try { current = decodeURIComponent(current); } catch (e) {}

        // HTML entities (&#x3C; &#60; &lt;)
        current = current
            .replace(/&#x([0-9a-f]+);?/gi,
                (_, hex) => String.fromCharCode(parseInt(hex, 16)))
            .replace(/&#(\\d+);?/g,
                (_, dec) => String.fromCharCode(parseInt(dec)))
            .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
            .replace(/&amp;/gi, '&').replace(/&quot;/gi, '"');

        // Unicode escapes
        current = current.replace(/\\\\u([0-9a-f]{4})/gi,
            (_, code) => String.fromCharCode(parseInt(code, 16)));

        // Null-byte removal (used to bypass WAFs)
        current = current.replace(/\\0/g, '');

        iterations++;
    }
    return current;
}`,
      },
      {
        title: "SQL Injection Detection with Attack Classification",
        language: "javascript",
        code: `const SQLI_PATTERNS = [
    /('\\s*(OR|AND)\\s+')/gi,
    /('\\s*;\\s*(DROP|ALTER|DELETE|UPDATE|INSERT|EXEC)\\s)/gi,
    /(UNION\\s+(ALL\\s+)?SELECT)/gi,
    /(SLEEP\\s*\\(\\s*\\d+\\s*\\))/gi,
    /(BENCHMARK\\s*\\()/gi,
    /(WAITFOR\\s+DELAY)/gi,
    /('\\s*OR\\s+\\d+\\s*=\\s*\\d+)/gi,
    // ... more patterns
];

function detectSQLi(value) {
    if (typeof value !== 'string') return { detected: false };
    const decoded = decodeNested(value);
    const threats = [];

    for (const pattern of SQLI_PATTERNS) {
        const match = decoded.match(pattern);
        if (match) {
            threats.push({
                pattern: pattern.source,
                matched: match[0],
                category: classifySQLi(match[0]),
            });
        }
    }
    return { detected: threats.length > 0, threats };
}

function classifySQLi(match) {
    if (/UNION/i.test(match)) return 'union_based';
    if (/SLEEP|BENCHMARK|WAITFOR/i.test(match)) return 'time_based_blind';
    if (/OR\\s+\\d+=\\d+/i.test(match)) return 'boolean_based';
    if (/DROP|ALTER|DELETE/i.test(match)) return 'destructive';
    return 'generic';
}`,
      },
      {
        title: "SSRF Prevention with DNS-Rebinding Defense",
        language: "javascript",
        code: `const BLOCKED_HOSTS = [
    /^localhost$/i, /^127\\./, /^10\\./,
    /^172\\.(1[6-9]|2\\d|3[01])\\./, /^192\\.168\\./,
    /^169\\.254\\.169\\.254$/,          // AWS metadata
    /^metadata\\.google\\.internal$/i,  // GCP metadata
];
const BLOCKED_SCHEMES = ['file', 'gopher', 'ftp', 'dict', 'ldap'];

async function validateURL(input) {
    let parsed;
    try { parsed = new URL(input); }
    catch { return { safe: false, reason: 'invalid_url' }; }

    if (BLOCKED_SCHEMES.includes(parsed.protocol.replace(':', ''))) {
        return { safe: false, reason: 'blocked_scheme' };
    }
    for (const p of BLOCKED_HOSTS) {
        if (p.test(parsed.hostname)) {
            return { safe: false, reason: 'internal_host' };
        }
    }

    // Critical: attacker could register evil.com -> 127.0.0.1
    // Hostname passes, but the resolved IP is internal.
    try {
        const addresses = await dns.resolve4(parsed.hostname);
        for (const addr of addresses) {
            if (isPrivateIP(addr)) {
                return { safe: false, reason: 'dns_rebind', resolved: addr };
            }
        }
    } catch { return { safe: false, reason: 'dns_failed' }; }

    return { safe: true };
}`,
      },
      {
        title: "Prototype Pollution Sanitization",
        language: "javascript",
        code: `const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function sanitizeProtoPollution(obj, depth = 0) {
    if (depth > 10) return obj;  // prevent stack overflow on deep nesting
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeProtoPollution(item, depth + 1));
    }

    const clean = {};
    for (const [key, value] of Object.entries(obj)) {
        if (DANGEROUS_KEYS.has(key)) {
            logThreat({ type: 'prototype_pollution', key, severity: 'high' });
            continue;
        }
        clean[key] = sanitizeProtoPollution(value, depth + 1);
    }
    return clean;
}`,
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
