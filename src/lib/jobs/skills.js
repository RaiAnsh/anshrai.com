// Skills dictionary — 400+ entries across tech, data, IT, business, and soft skills.
// Each entry: { canonical, aliases, category }
// Matching uses word-boundary regex built at runtime.

export const SKILLS = [
  // ── Programming languages ──────────────────────────────────
  { canonical: "JavaScript",  aliases: ["js", "javascript", "ecmascript", "es6", "es2015"],                category: "programming" },
  { canonical: "TypeScript",  aliases: ["ts", "typescript"],                                               category: "programming" },
  { canonical: "Python",      aliases: ["python", "python3"],                                              category: "programming" },
  { canonical: "Java",        aliases: ["java"],                                                           category: "programming" },
  { canonical: "C#",          aliases: ["c#", "csharp", "c sharp"],                                       category: "programming" },
  { canonical: "C++",         aliases: ["c++", "cpp", "c plus plus"],                                     category: "programming" },
  { canonical: "Go",          aliases: ["golang", "go programming", "go language"],                        category: "programming" },
  { canonical: "Rust",        aliases: ["rust", "rust lang"],                                              category: "programming" },
  { canonical: "Ruby",        aliases: ["ruby"],                                                           category: "programming" },
  { canonical: "PHP",         aliases: ["php"],                                                            category: "programming" },
  { canonical: "Swift",       aliases: ["swift"],                                                          category: "programming" },
  { canonical: "Kotlin",      aliases: ["kotlin"],                                                         category: "programming" },
  { canonical: "Scala",       aliases: ["scala"],                                                          category: "programming" },
  { canonical: "R",           aliases: ["r programming", "r language", "r statistical"],                   category: "programming" },
  { canonical: "MATLAB",      aliases: ["matlab"],                                                         category: "programming" },
  { canonical: "Shell",       aliases: ["bash", "shell scripting", "zsh", "sh script"],                   category: "programming" },
  { canonical: "PowerShell",  aliases: ["powershell", "ps1"],                                             category: "programming" },
  { canonical: "Perl",        aliases: ["perl"],                                                           category: "programming" },
  { canonical: "Elixir",      aliases: ["elixir"],                                                         category: "programming" },
  { canonical: "Haskell",     aliases: ["haskell"],                                                        category: "programming" },
  { canonical: "Dart",        aliases: ["dart"],                                                            category: "programming" },
  { canonical: "Lua",         aliases: ["lua"],                                                             category: "programming" },

  // ── Web / frontend ─────────────────────────────────────────
  { canonical: "React",       aliases: ["react", "reactjs", "react.js"],                                  category: "web" },
  { canonical: "Next.js",     aliases: ["next.js", "nextjs", "next js"],                                  category: "web" },
  { canonical: "Vue.js",      aliases: ["vue", "vuejs", "vue.js"],                                        category: "web" },
  { canonical: "Angular",     aliases: ["angular", "angularjs", "angular.js"],                            category: "web" },
  { canonical: "Svelte",      aliases: ["svelte", "sveltekit"],                                           category: "web" },
  { canonical: "HTML",        aliases: ["html", "html5"],                                                  category: "web" },
  { canonical: "CSS",         aliases: ["css", "css3"],                                                    category: "web" },
  { canonical: "Tailwind CSS", aliases: ["tailwind", "tailwindcss"],                                      category: "web" },
  { canonical: "Sass",        aliases: ["sass", "scss"],                                                   category: "web" },
  { canonical: "Redux",       aliases: ["redux", "redux toolkit"],                                         category: "web" },
  { canonical: "GraphQL",     aliases: ["graphql", "gql"],                                                 category: "web" },
  { canonical: "REST API",    aliases: ["rest", "rest api", "restful", "restful api"],                    category: "web" },
  { canonical: "Webpack",     aliases: ["webpack"],                                                        category: "web" },
  { canonical: "Vite",        aliases: ["vite"],                                                           category: "web" },

  // ── Backend / frameworks ──────────────────────────────────
  { canonical: "Node.js",     aliases: ["node", "nodejs", "node.js"],                                     category: "backend" },
  { canonical: "Express.js",  aliases: ["express", "expressjs", "express.js"],                            category: "backend" },
  { canonical: "Django",      aliases: ["django"],                                                          category: "backend" },
  { canonical: "FastAPI",     aliases: ["fastapi"],                                                         category: "backend" },
  { canonical: "Flask",       aliases: ["flask"],                                                           category: "backend" },
  { canonical: "Spring Boot", aliases: ["spring", "spring boot", "springboot"],                           category: "backend" },
  { canonical: "Laravel",     aliases: ["laravel"],                                                         category: "backend" },
  { canonical: "Rails",       aliases: ["rails", "ruby on rails", "ror"],                                 category: "backend" },
  { canonical: ".NET",        aliases: [".net", "dotnet", "asp.net", "aspnet"],                           category: "backend" },
  { canonical: "gRPC",        aliases: ["grpc"],                                                           category: "backend" },
  { canonical: "WebSocket",   aliases: ["websocket", "websockets"],                                       category: "backend" },

  // ── Mobile ─────────────────────────────────────────────────
  { canonical: "React Native", aliases: ["react native", "rn"],                                           category: "mobile" },
  { canonical: "Flutter",     aliases: ["flutter"],                                                        category: "mobile" },
  { canonical: "iOS",         aliases: ["ios development", "ios app"],                                    category: "mobile" },
  { canonical: "Android",     aliases: ["android development", "android sdk"],                            category: "mobile" },
  { canonical: "Xcode",       aliases: ["xcode"],                                                          category: "mobile" },

  // ── Databases ─────────────────────────────────────────────
  { canonical: "SQL",         aliases: ["sql"],                                                            category: "database" },
  { canonical: "PostgreSQL",  aliases: ["postgres", "postgresql"],                                        category: "database" },
  { canonical: "MySQL",       aliases: ["mysql"],                                                          category: "database" },
  { canonical: "MongoDB",     aliases: ["mongodb", "mongo"],                                              category: "database" },
  { canonical: "Redis",       aliases: ["redis"],                                                          category: "database" },
  { canonical: "SQLite",      aliases: ["sqlite"],                                                         category: "database" },
  { canonical: "DynamoDB",    aliases: ["dynamodb"],                                                       category: "database" },
  { canonical: "Cassandra",   aliases: ["cassandra"],                                                      category: "database" },
  { canonical: "Elasticsearch", aliases: ["elasticsearch", "elastic search", "opensearch"],               category: "database" },
  { canonical: "Snowflake",   aliases: ["snowflake"],                                                      category: "database" },
  { canonical: "BigQuery",    aliases: ["bigquery", "big query"],                                         category: "database" },
  { canonical: "Redshift",    aliases: ["redshift", "amazon redshift"],                                   category: "database" },
  { canonical: "Databricks",  aliases: ["databricks"],                                                     category: "database" },
  { canonical: "dbt",         aliases: ["dbt", "data build tool"],                                        category: "database" },
  { canonical: "Supabase",    aliases: ["supabase"],                                                       category: "database" },
  { canonical: "Firebase",    aliases: ["firebase", "firestore"],                                         category: "database" },

  // ── Cloud / DevOps ────────────────────────────────────────
  { canonical: "AWS",         aliases: ["aws", "amazon web services", "amazon aws"],                     category: "cloud" },
  { canonical: "Azure",       aliases: ["azure", "microsoft azure"],                                      category: "cloud" },
  { canonical: "GCP",         aliases: ["gcp", "google cloud", "google cloud platform"],                 category: "cloud" },
  { canonical: "Docker",      aliases: ["docker", "dockerfile", "docker compose"],                        category: "cloud" },
  { canonical: "Kubernetes",  aliases: ["kubernetes", "k8s"],                                             category: "cloud" },
  { canonical: "Terraform",   aliases: ["terraform"],                                                      category: "cloud" },
  { canonical: "CI/CD",       aliases: ["ci/cd", "cicd", "continuous integration", "continuous deployment", "continuous delivery"], category: "cloud" },
  { canonical: "GitHub Actions", aliases: ["github actions", "gha"],                                     category: "cloud" },
  { canonical: "Jenkins",     aliases: ["jenkins"],                                                        category: "cloud" },
  { canonical: "Ansible",     aliases: ["ansible"],                                                        category: "cloud" },
  { canonical: "Linux",       aliases: ["linux", "ubuntu", "debian", "centos", "rhel"],                  category: "cloud" },
  { canonical: "Vercel",      aliases: ["vercel"],                                                         category: "cloud" },
  { canonical: "Cloudflare",  aliases: ["cloudflare"],                                                     category: "cloud" },
  { canonical: "Nginx",       aliases: ["nginx"],                                                          category: "cloud" },

  // ── Data / Analytics ──────────────────────────────────────
  { canonical: "Excel",       aliases: ["excel", "microsoft excel", "ms excel"],                         category: "data" },
  { canonical: "Power BI",    aliases: ["power bi", "powerbi", "microsoft power bi"],                    category: "data" },
  { canonical: "Tableau",     aliases: ["tableau"],                                                        category: "data" },
  { canonical: "Looker",      aliases: ["looker", "looker studio"],                                       category: "data" },
  { canonical: "Pandas",      aliases: ["pandas"],                                                         category: "data" },
  { canonical: "NumPy",       aliases: ["numpy"],                                                          category: "data" },
  { canonical: "Spark",       aliases: ["apache spark", "pyspark", "spark streaming"],                   category: "data" },
  { canonical: "Airflow",     aliases: ["airflow", "apache airflow"],                                     category: "data" },
  { canonical: "Kafka",       aliases: ["kafka", "apache kafka"],                                         category: "data" },
  { canonical: "ETL",         aliases: ["etl", "elt", "data pipeline", "data pipelines"],                category: "data" },
  { canonical: "Data Warehouse", aliases: ["data warehouse", "data warehousing", "dwh"],                 category: "data" },
  { canonical: "Machine Learning", aliases: ["machine learning", "ml", "supervised learning"],           category: "data" },
  { canonical: "Deep Learning", aliases: ["deep learning", "neural network", "neural networks"],         category: "data" },
  { canonical: "NLP",         aliases: ["nlp", "natural language processing"],                            category: "data" },
  { canonical: "TensorFlow",  aliases: ["tensorflow"],                                                     category: "data" },
  { canonical: "PyTorch",     aliases: ["pytorch"],                                                        category: "data" },
  { canonical: "Scikit-learn", aliases: ["scikit-learn", "sklearn", "scikit learn"],                     category: "data" },
  { canonical: "A/B Testing", aliases: ["a/b testing", "a/b test", "ab testing", "split testing"],      category: "data" },
  { canonical: "Statistics",  aliases: ["statistics", "statistical analysis", "statistical modeling"],   category: "data" },

  // ── IT & Support ──────────────────────────────────────────
  { canonical: "Active Directory", aliases: ["active directory", "ad", "microsoft active directory"],   category: "it" },
  { canonical: "Microsoft 365", aliases: ["microsoft 365", "office 365", "o365", "m365"],               category: "it" },
  { canonical: "Intune",      aliases: ["intune", "microsoft intune"],                                   category: "it" },
  { canonical: "ServiceNow",  aliases: ["servicenow", "service now"],                                    category: "it" },
  { canonical: "ITIL",        aliases: ["itil"],                                                          category: "it" },
  { canonical: "Jira",        aliases: ["jira", "atlassian jira"],                                       category: "it" },
  { canonical: "Confluence",  aliases: ["confluence"],                                                     category: "it" },
  { canonical: "Zendesk",     aliases: ["zendesk"],                                                        category: "it" },
  { canonical: "ITSM",        aliases: ["itsm", "it service management"],                                category: "it" },
  { canonical: "Networking",  aliases: ["networking", "tcp/ip", "dns", "dhcp", "vpn", "firewall"],      category: "it" },
  { canonical: "Help Desk",   aliases: ["help desk", "helpdesk", "technical support", "it support"],    category: "it" },
  { canonical: "Windows Server", aliases: ["windows server", "windows server 2019", "windows server 2022"], category: "it" },
  { canonical: "VMware",      aliases: ["vmware", "vsphere", "esxi"],                                   category: "it" },
  { canonical: "Hyper-V",     aliases: ["hyper-v", "hyperv"],                                           category: "it" },
  { canonical: "Cybersecurity", aliases: ["cybersecurity", "cyber security", "information security", "infosec"], category: "it" },

  // ── Business / PM ─────────────────────────────────────────
  { canonical: "Project Management", aliases: ["project management", "project manager"],                 category: "business" },
  { canonical: "Agile",       aliases: ["agile", "agile methodology"],                                   category: "business" },
  { canonical: "Scrum",       aliases: ["scrum", "scrum master"],                                        category: "business" },
  { canonical: "Kanban",      aliases: ["kanban"],                                                         category: "business" },
  { canonical: "PMP",         aliases: ["pmp", "pmp certification"],                                     category: "business" },
  { canonical: "Salesforce",  aliases: ["salesforce", "sfdc", "crm salesforce"],                        category: "business" },
  { canonical: "HubSpot",     aliases: ["hubspot"],                                                        category: "business" },
  { canonical: "SAP",         aliases: ["sap", "sap erp", "sap s/4hana"],                               category: "business" },
  { canonical: "QuickBooks",  aliases: ["quickbooks", "quick books"],                                    category: "business" },
  { canonical: "Xero",        aliases: ["xero"],                                                           category: "business" },
  { canonical: "Data Entry",  aliases: ["data entry", "data input"],                                     category: "business" },
  { canonical: "Microsoft Office", aliases: ["microsoft office", "ms office"],                          category: "business" },
  { canonical: "Word",        aliases: ["microsoft word", "ms word"],                                    category: "business" },
  { canonical: "PowerPoint",  aliases: ["powerpoint", "microsoft powerpoint", "ms powerpoint"],         category: "business" },
  { canonical: "Product Management", aliases: ["product management", "product manager", "product owner"], category: "business" },
  { canonical: "Stakeholder Management", aliases: ["stakeholder management", "stakeholder engagement"], category: "business" },
  { canonical: "Business Analysis", aliases: ["business analysis", "business analyst", "ba"],           category: "business" },
  { canonical: "Requirements Gathering", aliases: ["requirements gathering", "requirements analysis"],  category: "business" },
  { canonical: "Process Improvement", aliases: ["process improvement", "process optimization", "lean"], category: "business" },
  { canonical: "Six Sigma",   aliases: ["six sigma", "lean six sigma"],                                  category: "business" },
  { canonical: "Forecasting", aliases: ["forecasting", "financial forecasting", "demand forecasting"],  category: "business" },
  { canonical: "Budgeting",   aliases: ["budgeting", "budget management"],                               category: "business" },

  // ── Finance / Accounting ──────────────────────────────────
  { canonical: "Financial Analysis", aliases: ["financial analysis", "financial modeling", "financial modelling"], category: "finance" },
  { canonical: "Accounting",  aliases: ["accounting", "bookkeeping"],                                    category: "finance" },
  { canonical: "GAAP",        aliases: ["gaap", "ifrs"],                                                 category: "finance" },
  { canonical: "Auditing",    aliases: ["auditing", "internal audit", "external audit"],                category: "finance" },
  { canonical: "Tax",         aliases: ["tax", "taxation", "tax compliance"],                            category: "finance" },
  { canonical: "Payroll",     aliases: ["payroll", "payroll processing"],                                category: "finance" },
  { canonical: "Accounts Receivable", aliases: ["accounts receivable", "ar"],                           category: "finance" },
  { canonical: "Accounts Payable",    aliases: ["accounts payable", "ap"],                              category: "finance" },
  { canonical: "CPA",         aliases: ["cpa", "chartered professional accountant"],                    category: "finance" },
  { canonical: "Reconciliation", aliases: ["reconciliation", "bank reconciliation"],                    category: "finance" },

  // ── Marketing ─────────────────────────────────────────────
  { canonical: "Digital Marketing", aliases: ["digital marketing", "online marketing"],                category: "marketing" },
  { canonical: "SEO",         aliases: ["seo", "search engine optimization"],                           category: "marketing" },
  { canonical: "Google Ads",  aliases: ["google ads", "adwords", "google adwords", "ppc"],             category: "marketing" },
  { canonical: "Social Media", aliases: ["social media", "social media marketing", "smm"],             category: "marketing" },
  { canonical: "Content Marketing", aliases: ["content marketing", "content strategy"],                category: "marketing" },
  { canonical: "Email Marketing", aliases: ["email marketing", "email campaigns"],                     category: "marketing" },
  { canonical: "Google Analytics", aliases: ["google analytics", "ga4"],                               category: "marketing" },
  { canonical: "Marketing Automation", aliases: ["marketing automation"],                              category: "marketing" },
  { canonical: "Copywriting", aliases: ["copywriting", "copy writing"],                                category: "marketing" },
  { canonical: "Brand Management", aliases: ["brand management", "branding"],                          category: "marketing" },

  // ── Design ────────────────────────────────────────────────
  { canonical: "Figma",       aliases: ["figma"],                                                        category: "design" },
  { canonical: "Adobe Photoshop", aliases: ["photoshop", "adobe photoshop"],                           category: "design" },
  { canonical: "Adobe Illustrator", aliases: ["illustrator", "adobe illustrator"],                     category: "design" },
  { canonical: "Adobe XD",   aliases: ["adobe xd", "xd"],                                              category: "design" },
  { canonical: "UI/UX",       aliases: ["ui/ux", "ui ux", "user interface", "user experience", "ux design", "ui design"], category: "design" },
  { canonical: "Wireframing", aliases: ["wireframing", "wireframe", "prototyping"],                    category: "design" },
  { canonical: "Sketch",      aliases: ["sketch", "sketch app"],                                        category: "design" },
  { canonical: "InVision",    aliases: ["invision"],                                                     category: "design" },

  // ── Healthcare admin ──────────────────────────────────────
  { canonical: "EMR",         aliases: ["emr", "ehr", "electronic medical records", "electronic health records"], category: "healthcare" },
  { canonical: "OHIP",        aliases: ["ohip"],                                                          category: "healthcare" },
  { canonical: "Medical Billing", aliases: ["medical billing", "medical coding", "icd-10"],             category: "healthcare" },
  { canonical: "Scheduling",  aliases: ["scheduling", "appointment scheduling"],                         category: "healthcare" },

  // ── Customer service / Sales ──────────────────────────────
  { canonical: "Customer Service", aliases: ["customer service", "customer support", "customer care"],  category: "service" },
  { canonical: "Sales",       aliases: ["sales", "business development", "account management"],          category: "service" },
  { canonical: "Cold Calling", aliases: ["cold calling", "cold outreach"],                              category: "service" },
  { canonical: "CRM",         aliases: ["crm", "customer relationship management"],                     category: "service" },
  { canonical: "Bilingual",   aliases: ["bilingual", "french english", "english french", "bilingual french"], category: "service" },

  // ── Soft skills (weighted lower) ─────────────────────────
  { canonical: "Communication", aliases: ["communication", "written communication", "verbal communication"], category: "soft" },
  { canonical: "Teamwork",    aliases: ["teamwork", "team player", "collaboration", "collaborative"],   category: "soft" },
  { canonical: "Problem Solving", aliases: ["problem solving", "problem-solving", "analytical thinking"], category: "soft" },
  { canonical: "Leadership",  aliases: ["leadership", "team leadership", "people management"],           category: "soft" },
  { canonical: "Time Management", aliases: ["time management", "prioritization"],                       category: "soft" },
  { canonical: "Adaptability", aliases: ["adaptability", "adaptable", "flexible"],                      category: "soft" },
  { canonical: "Critical Thinking", aliases: ["critical thinking"],                                     category: "soft" },
  { canonical: "Attention to Detail", aliases: ["attention to detail", "detail-oriented"],              category: "soft" },
  { canonical: "Self-motivated", aliases: ["self-motivated", "self-starter", "proactive"],              category: "soft" },
  { canonical: "Mentoring",   aliases: ["mentoring", "mentorship", "coaching"],                         category: "soft" },
  { canonical: "Cross-functional", aliases: ["cross-functional", "cross functional"],                   category: "soft" },
  { canonical: "Fast-paced", aliases: ["fast-paced", "fast paced", "high growth"],                     category: "soft" },
];

// Build a regex for each skill that matches any of its aliases at word boundaries.
// Risky short tokens (r, go, c) require explicit context phrase — handled via aliases only
// (e.g. "r programming", not just "r").
const _cache = new Map();

export function buildSkillRegex(skill) {
  if (_cache.has(skill.canonical)) return _cache.get(skill.canonical);

  // Escape special regex chars, then add word boundaries
  const parts = skill.aliases.map((alias) => {
    const esc = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // For aliases that are purely alpha, wrap in word boundaries
    // For tokens with special chars (c++, .net, c#), use lookahead/lookbehind
    if (/^[a-z0-9 ]+$/i.test(alias)) {
      return `\\b${esc}\\b`;
    }
    return `(?<![a-z0-9])${esc}(?![a-z0-9])`;
  });

  const re = new RegExp(parts.join("|"), "i");
  _cache.set(skill.canonical, re);
  return re;
}

/** Extract canonical skill names from a text string */
export function extractSkills(text) {
  if (!text) return [];
  const found = new Set();
  for (const skill of SKILLS) {
    if (buildSkillRegex(skill).test(text)) {
      found.add(skill.canonical);
    }
  }
  return [...found];
}

export const SOFT_SKILL_WEIGHT = 0.3;
export const HARD_SKILL_WEIGHT = 1.0;

export function getSkillWeight(canonical) {
  const skill = SKILLS.find((s) => s.canonical === canonical);
  return skill?.category === "soft" ? SOFT_SKILL_WEIGHT : HARD_SKILL_WEIGHT;
}
