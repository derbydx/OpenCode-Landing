import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

const app = new Hono()

app.get(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Derby | Custom IT Architect & Empowering Technical Educator</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          <script src="https://cdn.tailwindcss.com"></script>
          <script>{`
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: { sans: ['Inter', 'sans-serif'] },
                  colors: {
                    teal: { 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' },
                    purple: { 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce' },
                  },
                },
              },
            }
          `}</script>
        </head>
        <body class="bg-gray-950 text-gray-100 min-h-screen flex flex-col relative font-sans">
          <div class="fixed inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 40px 40px;"></div>
          <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none bg-gradient-radial from-teal-900/10 via-purple-900/5 to-transparent rounded-full blur-[100px]"></div>

          <main class="flex-1 max-w-5xl mx-auto px-6 py-12 w-full relative">

            {/* Hero Section */}
            <section class="flex flex-col md:flex-row items-center gap-10 mb-24">
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">Derby</h1>
                <p class="text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                  Custom IT Architect & Empowering Technical Educator
                </p>
                <p class="text-base md:text-lg text-gray-400 mt-2 leading-relaxed max-w-xl">
                  Architecting Reliable Systems & Tech Leadership.
                </p>
                <div class="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  <a href="#projects" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20">
                    View My Projects
                  </a>
                  <a href="#services" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg transition-all duration-300 border border-gray-700">
                    Explore IT Solutions
                  </a>
                </div>
                <div class="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                  {[
                    { label: 'Docker', icon: 'M 12 2 C 6.477 2 2 6.477 2 12 s 4.477 10 10 10 s 10 -4.477 10 -10 S 17.523 2 12 2 Z' },
                    { label: 'Python', icon: 'M 12 2 C 6.477 2 2 6.477 2 12 s 4.477 10 10 10 s 10 -4.477 10 -10 S 17.523 2 12 2 Z' },
                    { label: 'C#', icon: 'M 12 2 C 6.477 2 2 6.477 2 12 s 4.477 10 10 10 s 10 -4.477 10 -10 S 17.523 2 12 2 Z' },
                    { label: 'PowerShell', icon: 'M 12 2 C 6.477 2 2 6.477 2 12 s 4.477 10 10 10 s 10 -4.477 10 -10 S 17.523 2 12 2 Z' },
                    { label: 'Linux', icon: 'M 12 2 C 6.477 2 2 6.477 2 12 s 4.477 10 10 10 s 10 -4.477 10 -10 S 17.523 2 12 2 Z' },
                  ].map((s) => (
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/60 text-gray-300 rounded-lg text-xs font-medium border border-gray-700/50 transition-all duration-200 hover:scale-105 hover:border-teal-600/50">
                      <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d={s.icon.split(' ').slice(2).join(' ')} />
                      </svg>
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
              <div class="shrink-0">
                <div class="relative w-32 h-32 md:w-40 md:h-40">
                  <div class="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full blur-sm"></div>
                  <div class="relative w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-2 border-gray-800">
                    <span class="text-4xl md:text-5xl font-bold bg-gradient-to-br from-teal-400 to-purple-400 bg-clip-text text-transparent">D</span>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <div class="border-t border-gray-800/50 mb-10"></div>
            <section id="about" class="mb-24">
              <h2 class="text-2xl font-semibold text-white mb-2">About</h2>
              <span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-4"></span>
              <p class="text-gray-300 leading-relaxed max-w-3xl">
                IT professional with a decade of experience in system administration,
                cybersecurity, and support environments. I work extensively with Docker,
                PowerShell, C#, and Python, and I am currently expanding my skill set into
                web development with HTML and CSS. Beyond technical implementations, I serve
                as a professional educator and facilitator, passionate about knowledge sharing
                and bridging the gap between complex technologies and practical learning.
              </p>
            </section>

            {/* Services Section */}
            <div class="border-t border-gray-800/50 mb-10"></div>
            <section id="services" class="mb-24">
              <h2 class="text-2xl font-semibold text-white mb-2">Services</h2>
              <span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-8"></span>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'IT Systems Administration',
                    desc: 'Deployment, configuration, and maintenance of servers and infrastructure using Docker and Linux.',
                    icon: 'server',
                  },
                  {
                    title: 'Automation Solutions',
                    desc: 'Intelligent workflow automation with n8n, Python scripting, and Airtable integrations.',
                    icon: 'zap',
                  },
                  {
                    title: 'Server & Database Deployment',
                    desc: 'Robust backend systems with C#, .NET, and structured database management.',
                    icon: 'database',
                  },
                  {
                    title: 'Network Cybersecurity',
                    desc: 'Monitoring, threat detection, and security best practices for resilient IT environments.',
                    icon: 'shield',
                  },
                  {
                    title: 'Technical Educator',
                    desc: 'Workshops, training, and knowledge transfer to bridge the gap between tech and teams.',
                    icon: 'book',
                  },
                  {
                    title: 'Technical Support & Solutions Architect',
                    desc: 'End-to-end IT solutions from requirements analysis to implementation and support.',
                    icon: 'wrench',
                  },
                ].map((s) => (
                  <div class="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-800/40">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-900/40 to-purple-900/40 flex items-center justify-center mb-4">
                      <SvgIcon name={s.icon} />
                    </div>
                    <h3 class="text-lg font-semibold text-teal-300 mb-2">{s.title}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <div class="border-t border-gray-800/50 mb-10"></div>
            <section id="projects" class="mb-24">
              <h2 class="text-2xl font-semibold text-white mb-2">Projects</h2>
              <span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-8"></span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Automated Expense Tracker',
                    type: 'Automation',
                    desc: 'Automated system for processing and categorizing financial receipts using intelligent workflows, structured storage, and real-time data analysis.',
                    tags: ['n8n', 'AI', 'Airtable', 'Automation'],
                  },
                  {
                    title: 'Personal Media Server Infrastructure',
                    type: 'Infrastructure',
                    desc: 'Deployment and optimization of a centralized media server and self-hosted photo storage management, prioritizing privacy and local performance.',
                    tags: ['Docker', 'Linux', 'Self-Hosting', 'Databases'],
                  },
                  {
                    title: 'Network Security Monitoring Dashboard',
                    type: 'Security',
                    desc: 'Real-time network traffic analysis and threat detection dashboard with alerting and visualization.',
                    tags: ['Python', 'Security', 'Monitoring', 'Dashboards'],
                  },
                  {
                    title: 'Tech Workshop Management Platform',
                    type: 'Education',
                    desc: 'Platform for scheduling, managing, and delivering technical training workshops with progress tracking.',
                    tags: ['C#', '.NET', 'Databases', 'Web'],
                  },
                ].map((p) => (
                  <div class="rounded-xl border border-gray-800/60 bg-gray-900/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-800/40">
                    <div class="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-b border-gray-800/60">
                      <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-900/30 to-purple-900/30 flex items-center justify-center border border-gray-700/50">
                        <svg class="w-8 h-8 text-teal-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                          {p.type === 'Automation' ? <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /> :
                           p.type === 'Infrastructure' ? <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /> :
                           p.type === 'Security' ? <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> :
                           <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                        </svg>
                      </div>
                    </div>
                    <div class="p-5">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-medium text-purple-400 uppercase tracking-wider">{p.type}</span>
                      </div>
                      <h3 class="text-lg font-semibold text-teal-300 mb-2">{p.title}</h3>
                      <p class="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                      <div class="flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <span class="px-3 py-1 bg-teal-900/40 text-teal-300 rounded-full text-xs font-medium border border-teal-800/50 transition-all duration-300 hover:scale-105 hover:bg-teal-800/60 hover:border-teal-600/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <div class="border-t border-gray-800/50 mb-10"></div>
            <section id="education" class="mb-24">
              <h2 class="text-2xl font-semibold text-white mb-2">Education</h2>
              <span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-8"></span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { degree: 'Bachelor in Information Technology', institution: 'Universidad Autonoma de Santo Domingo', year: '2015 - 2020' },
                  { degree: 'Cybersecurity Professional Certification', institution: 'Cisco Networking Academy', year: '2021' },
                ].map((e) => (
                  <div class="p-5 rounded-xl bg-gray-900/40 border border-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-800/40">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-900/40 to-purple-900/40 flex items-center justify-center mb-3">
                      <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <h3 class="text-base font-semibold text-teal-300 mb-1">{e.degree}</h3>
                    <p class="text-gray-400 text-sm">{e.institution}</p>
                    <p class="text-gray-600 text-xs mt-1">{e.year}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Connect Section */}
            <div class="border-t border-gray-800/50 mb-10"></div>
            <section id="connect" class="mb-16">
              <h2 class="text-2xl font-semibold text-white mb-2">Connect</h2>
              <span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-6"></span>
              <div class="flex flex-wrap gap-4">
                <a
                  href="https://github.com/derbydx"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/derbymartinez"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="mailto:derbydx@hotmail.com"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
              </div>
            </section>
          </main>

          <footer class="text-center py-6 text-gray-600 text-sm border-t border-gray-800">
            &copy; {new Date().getFullYear()} Derby. Built with Hono &amp; Cloudflare Workers.
          </footer>
        </body>
      </html>
    )
  })
)

function SvgIcon({ name }: { name: string }) {
  const icons: Record<string, { viewBox: string; paths: string[] }> = {
    server: {
      viewBox: '0 0 24 24',
      paths: [
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      ],
    },
    zap: {
      viewBox: '0 0 24 24',
      paths: ['M13 10V3L4 14h7v7l9-11h-7z'],
    },
    database: {
      viewBox: '0 0 24 24',
      paths: [
        'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
      ],
    },
    shield: {
      viewBox: '0 0 24 24',
      paths: [
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      ],
    },
    book: {
      viewBox: '0 0 24 24',
      paths: [
        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      ],
    },
    wrench: {
      viewBox: '0 0 24 24',
      paths: [
        'M11.42 15.17l-7.14 7.14a2 2 0 01-2.83 0l-.7-.7a2 2 0 010-2.83l7.14-7.14m4.28-4.28a5.5 5.5 0 017.78 6.36 2 2 0 01-2.36 2.36 5.5 5.5 0 01-6.36-7.78l-2.3 2.3a1 1 0 01-1.42 0l-.7-.7a1 1 0 010-1.42l2.3-2.3z',
      ],
    },
  }
  const icon = icons[name] || icons.server
  return (
    <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox={icon.viewBox} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      {icon.paths.map((p) => (
        <path d={p} />
      ))}
    </svg>
  )
}

app.get('/', (c) => {
  return c.render()
})

export default app
