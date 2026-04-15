const icon = (slug) => `https://cdn.simpleicons.org/${slug}/ffffff`;

export const skillCategories = [
  {
    slug: "security-operations",
    category: "Security Operations",
    tagline: "Blue team · detection · incident response",
    accent: "#00ff9c",
    summary:
      "SIEM engineering, threat hunting, detection writing and incident triage across Windows and Linux estates.",
    description: [
      "This is where I spend most of my time. I work the blue team side of cybersecurity — building detection logic, hunting for adversary behaviour in telemetry, and running the triage playbook when something looks wrong.",
      "My daily tooling is centered around SIEM platforms like Splunk, log collection through Sysmon, ETW and native Windows / Linux auditing, plus rule engines like Sigma and YARA for detection. I'm comfortable correlating events, pivoting between data sources, and documenting what I find so the next analyst (or my future self) can follow the trail.",
      "I think of a SOC as a feedback loop: ingest, detect, respond, learn. I enjoy every step of that loop, especially the part where a raw log line turns into a story about what an attacker tried to do.",
    ],
    highlights: [
      "Write and tune Sigma detection rules mapped to MITRE ATT&CK",
      "Triage alerts in Splunk and document findings for response",
      "Hunt with Sysmon + ETW telemetry across Windows hosts",
      "Analyse malware samples with static tooling and YARA",
      "Investigate network traffic with Wireshark and TCPdump",
    ],
    tools: [
      { name: "Splunk", icon: icon("splunk") },
      { name: "Wireshark", icon: icon("wireshark") },
      { name: "Suricata", icon: icon("suricata") },
      { name: "Elastic", icon: icon("elastic") },
      { name: "Kibana", icon: icon("kibana") },
      { name: "Sigma", icon: null },
      { name: "YARA", icon: null },
      { name: "Sysmon", icon: null },
      { name: "ETW", icon: null },
      { name: "MITRE ATT&CK", icon: null },
      { name: "Defender", icon: icon("microsoft") },
      { name: "Windows Firewall", icon: null },
      { name: "TCPdump", icon: null },
      { name: "Nmap", icon: null },
      { name: "VirusTotal", icon: icon("virustotal") },
      { name: "TheHive", icon: null },
    ],
  },
  {
    slug: "network-systems",
    category: "Network & Systems",
    tagline: "Infra · cloud · administration",
    accent: "#00e5ff",
    summary:
      "Hands-on with Linux, Windows, Active Directory, containers and cloud — the foundation every security pro needs.",
    description: [
      "Before you can defend a system, you need to understand how it runs. I've built hardened Linux and Windows environments from scratch, managed Active Directory labs with realistic group policies, and run services in Docker and Kubernetes.",
      "On the network side, I'm fluent in TCP/IP, DNS, routing basics, firewalling, and traffic analysis. I can read a pcap, tune an IDS, harden a server, and document everything along the way.",
      "Cloud is part of that story too. I'm actively sharpening my skills on Azure and AWS — deploying workloads, configuring identity, and applying security baselines to cloud assets.",
    ],
    highlights: [
      "Deploy and harden Linux servers (Ubuntu, Debian, Kali)",
      "Manage Active Directory, GPOs and user lifecycle",
      "Containerise services with Docker and orchestrate with Kubernetes",
      "Analyse and troubleshoot network traffic at the packet level",
      "Configure IDS/IPS with Suricata and tune rulesets",
      "Deploy workloads and secure identities in Azure and AWS",
    ],
    tools: [
      { name: "Linux", icon: icon("linux") },
      { name: "Ubuntu", icon: icon("ubuntu") },
      { name: "Kali Linux", icon: icon("kalilinux") },
      { name: "Debian", icon: icon("debian") },
      { name: "Windows 11", icon: icon("windows11") },
      { name: "Active Directory", icon: null },
      { name: "Docker", icon: icon("docker") },
      { name: "Kubernetes", icon: icon("kubernetes") },
      { name: "Azure", icon: icon("microsoftazure") },
      { name: "AWS", icon: icon("amazonwebservices") },
      { name: "Google Cloud", icon: icon("googlecloud") },
      { name: "Cloudflare", icon: icon("cloudflare") },
      { name: "VirtualBox", icon: icon("virtualbox") },
      { name: "VMware", icon: icon("vmware") },
      { name: "Nginx", icon: icon("nginx") },
      { name: "Bash", icon: icon("gnubash") },
      { name: "PowerShell", icon: icon("powershell") },
      { name: "OpenSSH", icon: icon("openssh") },
      { name: "Terraform", icon: icon("terraform") },
      { name: "Ansible", icon: icon("ansible") },
    ],
  },
  {
    slug: "development",
    category: "Development",
    tagline: "Full-stack · MERN · Python automation",
    accent: "#00ff9c",
    summary:
      "Full-stack developer with a focus on React and Python — I can build the tool as fast as I can break it.",
    description: [
      "Development isn't a side hobby for me — it's a core skill. I've shipped full-stack MERN apps, written Python automation for security tooling, and built clean, responsive React interfaces (this portfolio is one of them).",
      "On the backend I'm at home with Node.js + Express, MongoDB and SQL databases. On the frontend I lean on React with modern hooks, Vite, and CSS crafted by hand when I want pixel control.",
      "Python is my Swiss army knife — scripting, data wrangling, automation, scraping, building CLI tools and writing detection helpers. I keep everything in Git and I care about clean commits.",
    ],
    highlights: [
      "Build full-stack apps with the MERN stack",
      "Write Python automation for security and data tasks",
      "Design responsive React interfaces with modern tooling",
      "Work with REST APIs, authentication and databases",
      "Use Git, GitHub and CI for every project",
    ],
    tools: [
      { name: "Python", icon: icon("python") },
      { name: "JavaScript", icon: icon("javascript") },
      { name: "TypeScript", icon: icon("typescript") },
      { name: "React", icon: icon("react") },
      { name: "Node.js", icon: icon("nodedotjs") },
      { name: "Express", icon: icon("express") },
      { name: "MongoDB", icon: icon("mongodb") },
      { name: "MySQL", icon: icon("mysql") },
      { name: "PostgreSQL", icon: icon("postgresql") },
      { name: "HTML5", icon: icon("html5") },
      { name: "CSS3", icon: icon("css3") },
      { name: "Tailwind CSS", icon: icon("tailwindcss") },
      { name: "Vite", icon: icon("vitedotjs") },
      { name: "Git", icon: icon("git") },
      { name: "GitHub", icon: icon("github") },
      { name: "VS Code", icon: icon("visualstudiocode") },
      { name: "Postman", icon: icon("postman") },
      { name: "Figma", icon: icon("figma") },
      { name: "WordPress", icon: icon("wordpress") },
    ],
  },
  {
    slug: "economics-data",
    category: "Economics & Data Analysis",
    tagline: "Quantitative methods · statistics · modeling",
    accent: "#00e5ff",
    summary:
      "My Master's in Quantitative Economics taught me to think in data — statistics, modeling and decision making from numbers.",
    description: [
      "I hold a Master's degree in Quantitative Economics, and that background isn't just an academic line on my CV — it's how I think. I learned to build statistical models, interpret noisy data, test hypotheses and extract signal from the mess.",
      "This analytical foundation maps directly onto the security world. Threat detection is a data problem. Anomaly hunting is a statistics problem. Risk assessment is a modeling problem. I bring the same rigor I used for econometric forecasting to writing detections and investigating incidents.",
      "On the tooling side I'm at home with Python's data stack (pandas, NumPy, scikit-learn, matplotlib), Jupyter notebooks for exploration, and R for classical statistical analysis. I've done regression, time-series modeling, clustering and basic machine learning for classification tasks.",
    ],
    highlights: [
      "Build statistical and econometric models end-to-end",
      "Clean, transform and analyse large datasets in Python",
      "Apply regression, clustering and classification methods",
      "Perform time-series analysis and forecasting",
      "Visualise findings with matplotlib, seaborn and Plotly",
      "Communicate insights clearly to non-technical stakeholders",
    ],
    tools: [
      { name: "Python", icon: icon("python") },
      { name: "pandas", icon: icon("pandas") },
      { name: "NumPy", icon: icon("numpy") },
      { name: "SciPy", icon: icon("scipy") },
      { name: "scikit-learn", icon: icon("scikitlearn") },
      { name: "Jupyter", icon: icon("jupyter") },
      { name: "Anaconda", icon: icon("anaconda") },
      { name: "R", icon: icon("r") },
      { name: "Plotly", icon: icon("plotly") },
      { name: "TensorFlow", icon: icon("tensorflow") },
      { name: "SQL", icon: null },
      { name: "Econometrics", icon: null },
      { name: "Regression", icon: null },
      { name: "Time Series", icon: null },
      { name: "Forecasting", icon: null },
      { name: "Hypothesis Testing", icon: null },
    ],
  },
  {
    slug: "soft-skills",
    category: "Soft Skills",
    tagline: "Communication · documentation · teamwork",
    accent: "#00ff9c",
    summary:
      "The human side of the job — writing, collaborating and translating between technical and non-technical people.",
    description: [
      "Technical skill alone doesn't ship security work. I've learned that writing clear documentation, running a calm incident call, and explaining a finding in plain language matters as much as the detection itself.",
      "I work well across teams — handing off tickets, pairing on investigations, and translating technical findings into business language when I need to.",
      "I'm fluent in four languages (English, French, Arabic and basic German) which makes me comfortable in international and multicultural teams.",
    ],
    highlights: [
      "Write clear technical documentation and runbooks",
      "Communicate findings to technical and non-technical audiences",
      "Work comfortably in multilingual, multicultural teams",
      "Stay calm and structured under pressure during incidents",
      "Mentor, share knowledge and contribute to team culture",
    ],
    tools: [
      { name: "Documentation", icon: null },
      { name: "Incident Reporting", icon: null },
      { name: "Team Collaboration", icon: null },
      { name: "Public Speaking", icon: null },
      { name: "Mentoring", icon: null },
      { name: "Troubleshooting", icon: null },
    ],
  },
];

export const getCategory = (slug) =>
  skillCategories.find((c) => c.slug === slug);

// Flatten tools from every category, dedupe by name, keep ones that have an icon.
// Used by the swimming row in the Skills section.
const seen = new Set();
export const skillIcons = skillCategories
  .flatMap((c) => c.tools)
  .filter((t) => {
    if (!t.icon) return false;
    if (seen.has(t.name)) return false;
    seen.add(t.name);
    return true;
  })
  .map((t) => ({ name: t.name, src: t.icon }));
