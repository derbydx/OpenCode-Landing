import { Hono } from 'hono'
import { z } from 'zod'

type Lang = 'en' | 'es'
type Bindings = { SITE_CONTENT: KVNamespace; ADMIN_PASSWORD: string; ADMIN_SECRET: string }

interface Content {
  name: string
  profileImage: string
  en: LangContent
  es: LangContent
}
interface LangContent {
  hero: { tagline: string; subtitle: string }
  about: string
  skills: string[]
  services: { title: string; desc: string; icon: string; image: string }[]
  projects: { title: string; type: string; desc: string; tags: string[]; image: string }[]
  education: { degree: string; institution: string; year: string }[]
  connect: { email: string }
}

const serviceItemSchema = z.object({
  title: z.string().max(500),
  desc: z.string().max(2000),
  icon: z.enum(['server', 'zap', 'database', 'shield', 'book', 'wrench']),
  image: z.string().max(5000),
})

const projectItemSchema = z.object({
  title: z.string().max(500),
  type: z.string().max(200),
  desc: z.string().max(5000),
  tags: z.array(z.string().max(100)).max(50),
  image: z.string().max(5000),
})

const eduItemSchema = z.object({
  degree: z.string().max(500),
  institution: z.string().max(500),
  year: z.string().max(100),
})

const langContentSchema = z.object({
  hero: z.object({ tagline: z.string().max(500), subtitle: z.string().max(500) }),
  about: z.string().max(10000),
  skills: z.array(z.string().max(200)).max(100),
  services: z.array(serviceItemSchema).max(50),
  projects: z.array(projectItemSchema).max(50),
  education: z.array(eduItemSchema).max(50),
  connect: z.object({ email: z.string().max(200) }),
})

const contentSchema = z.object({
  name: z.string().max(200).default('Derby'),
  profileImage: z.string().max(5000).default(''),
  en: langContentSchema,
  es: langContentSchema,
})

const DEFAULT_CONTENT: Content = {
  name: 'Derby',
  profileImage: '',
  en: {
    hero: { tagline: 'Custom IT Architect & Empowering Technical Educator', subtitle: 'Architecting Reliable Systems & Tech Leadership.' },
    about: 'IT professional with a decade of experience in system administration, cybersecurity, and support environments. I work extensively with Docker, PowerShell, C#, and Python, and I am currently expanding my skill set into web development with HTML and CSS. Beyond technical implementations, I serve as a professional educator and facilitator, passionate about knowledge sharing and bridging the gap between complex technologies and practical learning.',
    skills: ['Docker', 'Python', 'C#', 'PowerShell', 'Linux'],
    services: [
      { title: 'IT Systems Administration', desc: 'Deployment, configuration, and maintenance of servers and infrastructure using Docker and Linux.', icon: 'server', image: '' },
      { title: 'Automation Solutions', desc: 'Intelligent workflow automation with n8n, Python scripting, and Airtable integrations.', icon: 'zap', image: '' },
      { title: 'Server & Database Deployment', desc: 'Robust backend systems with C#, .NET, and structured database management.', icon: 'database', image: '' },
      { title: 'Network Cybersecurity', desc: 'Monitoring, threat detection, and security best practices for resilient IT environments.', icon: 'shield', image: '' },
      { title: 'Technical Educator', desc: 'Workshops, training, and knowledge transfer to bridge the gap between tech and teams.', icon: 'book', image: '' },
      { title: 'Technical Support & Solutions Architect', desc: 'End-to-end IT solutions from requirements analysis to implementation and support.', icon: 'wrench', image: '' },
    ],
    projects: [
      { title: 'Automated Expense Tracker', type: 'Automation', desc: 'Automated system for processing and categorizing financial receipts using intelligent workflows, structured storage, and real-time data analysis.', tags: ['n8n', 'AI', 'Airtable', 'Automation'], image: '' },
      { title: 'Personal Media Server Infrastructure', type: 'Infrastructure', desc: 'Deployment and optimization of a centralized media server and self-hosted photo storage management, prioritizing privacy and local performance.', tags: ['Docker', 'Linux', 'Self-Hosting', 'Databases'], image: '' },
    ],
    education: [
      { degree: 'Bachelor in Information Technology', institution: 'Universidad Autonoma de Santo Domingo', year: '2015 - 2020' },
      { degree: 'Cybersecurity Professional Certification', institution: 'Cisco Networking Academy', year: '2021' },
    ],
    connect: { email: 'Email Me' },
  },
  es: {
    hero: { tagline: 'Arquitecto IT y Educador Técnico', subtitle: 'Arquitectura de sistemas confiables y liderazgo técnico.' },
    about: 'Profesional IT con una década de experiencia en administración de sistemas, ciberseguridad y entornos de soporte. Trabajo extensamente con Docker, PowerShell, C# y Python, y actualmente estoy expandiendo mi conjunto de habilidades hacia el desarrollo web con HTML y CSS. Más allá de las implementaciones técnicas, me desempeño como educador y facilitador profesional, apasionado por compartir conocimiento y cerrar la brecha entre tecnologías complejas y el aprendizaje práctico.',
    skills: ['Docker', 'Python', 'C#', 'PowerShell', 'Linux'],
    services: [
      { title: 'Administración de Sistemas IT', desc: 'Despliegue, configuración y mantenimiento de servidores e infraestructura usando Docker y Linux.', icon: 'server', image: '' },
      { title: 'Soluciones de Automatización', desc: 'Automatización inteligente de flujos de trabajo con n8n, scripting en Python e integraciones con Airtable.', icon: 'zap', image: '' },
      { title: 'Despliegue de Servidores y Bases de Datos', desc: 'Sistemas backend robustos con C#, .NET y administración estructurada de bases de datos.', icon: 'database', image: '' },
      { title: 'Ciberseguridad de Redes', desc: 'Monitoreo, detección de amenazas y mejores prácticas de seguridad para entornos IT resilientes.', icon: 'shield', image: '' },
      { title: 'Educador Técnico', desc: 'Talleres, capacitaciones y transferencia de conocimiento para cerrar la brecha entre tecnología y equipos.', icon: 'book', image: '' },
      { title: 'Soporte Técnico y Arquitecto de Soluciones', desc: 'Soluciones IT integrales desde el análisis de requerimientos hasta la implementación y soporte.', icon: 'wrench', image: '' },
    ],
    projects: [
      { title: 'Automated Expense Tracker', type: 'Automatización', desc: 'Sistema automatizado para procesar y categorizar recibos financieros usando flujos de trabajo inteligentes, almacenamiento estructurado y análisis de datos en tiempo real.', tags: ['n8n', 'AI', 'Airtable', 'Automation'], image: '' },
      { title: 'Personal Media Server Infrastructure', type: 'Infraestructura', desc: 'Despliegue y optimización de un servidor de medios centralizado y gestión de almacenamiento fotográfico auto-alojado, priorizando la privacidad y el rendimiento local.', tags: ['Docker', 'Linux', 'Self-Hosting', 'Databases'], image: '' },
    ],
    education: [
      { degree: 'Licenciatura en Tecnología de la Información', institution: 'Universidad Autónoma de Santo Domingo', year: '2015 - 2020' },
      { degree: 'Certificación Profesional en Ciberseguridad', institution: 'Cisco Networking Academy', year: '2021' },
    ],
    connect: { email: 'Envíame un Correo' },
  },
}

async function loadContent(env: Bindings): Promise<Content> {
  const raw = await env.SITE_CONTENT.get('content', 'json')
  if (raw) return raw as Content
  await env.SITE_CONTENT.put('content', JSON.stringify(DEFAULT_CONTENT))
  return DEFAULT_CONTENT
}

const ICON_NAMES = ['server', 'zap', 'database', 'shield', 'book', 'wrench']

function esc(s: string | undefined | null): string { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }

function htmlPage(content: Content, lang: Lang): string {
  const lc = lang === 'en' ? content.en : content.es
  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${lang === 'en' ? 'Derby | Custom IT Architect & Empowering Technical Educator' : 'Derby | Arquitecto IT y Educador Técnico'}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','sans-serif']},colors:{teal:{400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a'},purple:{400:'#c084fc',500:'#a855f7',600:'#9333ea',700:'#7e22ce'}}}}}}</script>
</head>
<body class="bg-gray-950 text-gray-100 min-h-screen flex flex-col relative font-sans">
<div class="fixed inset-0 pointer-events-none" style="background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:40px 40px"></div>
<div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style="background:radial-gradient(ellipse, rgba(13,148,136,0.1), rgba(147,51,234,0.05), transparent);border-radius:50%;filter:blur(100px)"></div>
<div class="fixed top-4 right-4 z-50 flex gap-1 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
  <a href="/?lang=en" class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${lang==='en'?'bg-gradient-to-r from-teal-600 to-purple-600 text-white':'text-gray-400 hover:text-gray-200'}">EN</a>
  <a href="/?lang=es" class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${lang==='es'?'bg-gradient-to-r from-teal-600 to-purple-600 text-white':'text-gray-400 hover:text-gray-200'}">ES</a>
</div>
<main class="flex-1 max-w-5xl mx-auto px-6 py-12 w-full relative">

<section class="flex flex-col md:flex-row items-center gap-10 mb-24">
<div class="flex-1 text-center md:text-left">
<h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">${esc(content.name || 'Derby')}</h1>
<p class="text-xl md:text-2xl font-semibold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent leading-tight">${esc(lc.hero.tagline)}</p>
<p class="text-base md:text-lg text-gray-400 mt-2 leading-relaxed max-w-xl">${esc(lc.hero.subtitle)}</p>
<div class="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
<a href="#projects" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20">View My Projects</a>
<a href="#services" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg transition-all duration-300 border border-gray-700">Explore IT Solutions</a>
</div>
<div class="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
${lc.skills.map(s => `<span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/60 text-gray-300 rounded-lg text-xs font-medium border border-gray-700/50 transition-all duration-200 hover:scale-105 hover:border-teal-600/50"><svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/></svg>${esc(s)}</span>`).join('\n')}
</div>
</div>
<div class="shrink-0">
<div class="relative w-32 h-32 md:w-40 md:h-40">
<div class="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full blur-sm"></div>
${content.profileImage
  ? `<img src="${esc(content.profileImage)}" class="relative w-full h-full rounded-full object-cover border-2 border-gray-800" />`
  : `<div class="relative w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-2 border-gray-800"><span class="text-4xl md:text-5xl font-bold bg-gradient-to-br from-teal-400 to-purple-400 bg-clip-text text-transparent">D</span></div>`}
</div>
</div>
</section>

<div class="border-t border-gray-800/50 mb-10"></div>
<section id="about" class="mb-24">
<h2 class="text-2xl font-semibold text-white mb-2">${lang==='en'?'About':'Sobre Mí'}</h2>
<span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-4"></span>
<p class="text-gray-300 leading-relaxed max-w-3xl">${esc(lc.about)}</p>
</section>

<div class="border-t border-gray-800/50 mb-10"></div>
<section id="services" class="mb-24">
<h2 class="text-2xl font-semibold text-white mb-2">${lang==='en'?'Services':'Servicios'}</h2>
<span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-8"></span>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
${lc.services.map(s => `<div class="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-800/40"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-900/40 to-purple-900/40 flex items-center justify-center mb-4">${svgIcon(s.icon)}</div><h3 class="text-lg font-semibold text-teal-300 mb-2">${esc(s.title)}</h3><p class="text-gray-400 text-sm leading-relaxed">${esc(s.desc)}</p></div>`).join('\n')}
</div>
</section>

<div class="border-t border-gray-800/50 mb-10"></div>
<section id="projects" class="mb-24">
<h2 class="text-2xl font-semibold text-white mb-2">${lang==='en'?'Projects':'Proyectos'}</h2>
<span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-8"></span>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
${lc.projects.map(p => {
  const imgHtml = p.image
    ? `<img src="${esc(p.image)}" class="w-full h-40 object-cover border-b border-gray-800/60" />`
    : `<div class="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-b border-gray-800/60"><div class="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-900/30 to-purple-900/30 flex items-center justify-center border border-gray-700/50"><svg class="w-8 h-8 text-teal-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg></div></div>`
  return `<div class="rounded-xl border border-gray-800/60 bg-gray-900/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-800/40">${imgHtml}<div class="p-5"><div class="flex items-center gap-2 mb-1"><span class="text-xs font-medium text-purple-400 uppercase tracking-wider">${esc(p.type)}</span></div><h3 class="text-lg font-semibold text-teal-300 mb-2">${esc(p.title)}</h3><p class="text-gray-400 text-sm leading-relaxed mb-4">${esc(p.desc)}</p><div class="flex flex-wrap gap-2">${(p.tags||[]).map(t => `<span class="px-3 py-1 bg-teal-900/40 text-teal-300 rounded-full text-xs font-medium border border-teal-800/50 transition-all duration-300 hover:scale-105 hover:bg-teal-800/60 hover:border-teal-600/60">${esc(t)}</span>`).join('\n')}</div></div></div>`
}).join('\n')}
</div>
</section>

<div class="border-t border-gray-800/50 mb-10"></div>
<section id="education" class="mb-24">
<h2 class="text-2xl font-semibold text-white mb-2">${lang==='en'?'Education':'Educación'}</h2>
<span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-8"></span>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
${lc.education.map(e => `<div class="p-5 rounded-xl bg-gray-900/40 border border-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 hover:border-teal-800/40"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-900/40 to-purple-900/40 flex items-center justify-center mb-3"><svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg></div><h3 class="text-base font-semibold text-teal-300 mb-1">${esc(e.degree)}</h3><p class="text-gray-400 text-sm">${esc(e.institution)}</p><p class="text-gray-600 text-xs mt-1">${esc(e.year)}</p></div>`).join('\n')}
</div>
</section>

<div class="border-t border-gray-800/50 mb-10"></div>
<section id="connect" class="mb-16">
<h2 class="text-2xl font-semibold text-white mb-2">${lang==='en'?'Connect':'Contacto'}</h2>
<span class="block w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-6"></span>
<div class="flex flex-wrap gap-4">
<a href="https://github.com/derbydx" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</a>
<a href="https://linkedin.com/in/derbymartinez" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a>
<a href="mailto:derbydx@hotmail.com" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>${esc(lc.connect.email)}</a>
</div>
</section>
</main>
<footer class="text-center py-6 text-gray-600 text-sm border-t border-gray-800">&copy; ${new Date().getFullYear()} Derby. ${lang==='en'?'Built with Hono & Cloudflare Workers.':'Construido con Hono y Cloudflare Workers.'}</footer>
</body>
</html>`
}

function svgIcon(name: string): string {
  const icons: Record<string, string> = {
    server: '<path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>',
    zap: '<path d="M13 10V3L4 14h7v7l9-11h-7z"/>',
    database: '<path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>',
    shield: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
    book: '<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>',
    wrench: '<path d="M11.42 15.17l-7.14 7.14a2 2 0 01-2.83 0l-.7-.7a2 2 0 010-2.83l7.14-7.14m4.28-4.28a5.5 5.5 0 017.78 6.36 2 2 0 01-2.36 2.36 5.5 5.5 0 01-6.36-7.78l-2.3 2.3a1 1 0 01-1.42 0l-.7-.7a1 1 0 010-1.42l2.3-2.3z"/>',
  }
  const d = icons[name] || icons.server
  return `<svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`
}

function AdminDashboardHTML(content: Content, saved?: boolean, error?: string): string {
  const renderField = (name: string, value: string, opts?: { rows?: number }) =>
    opts?.rows
      ? `<textarea name="${name}" rows="${opts.rows}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500">${esc(value)}</textarea>`
      : `<input type="text" name="${name}" value="${esc(value)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" />`

  const tab = (lang: Lang, label: string) => {
    const lc = lang === 'en' ? content.en : content.es
    return `<div class="tab-content" id="tab-${lang}">
<div class="space-y-8">

<section><h2 class="text-lg font-semibold text-teal-300 mb-3">Hero</h2>
<div class="space-y-3">
<div><label class="block text-sm text-gray-400 mb-1">Tagline</label>${renderField('hero-tagline-' + lang, lc.hero.tagline)}</div>
<div><label class="block text-sm text-gray-400 mb-1">Subtitle</label>${renderField('hero-subtitle-' + lang, lc.hero.subtitle)}</div>
</div></section>
<div class="border-t border-gray-800"></div>

<section><h2 class="text-lg font-semibold text-teal-300 mb-3">About</h2>${renderField('about-' + lang, lc.about, { rows: 5 })}</section>
<div class="border-t border-gray-800"></div>

<section><div class="flex items-center justify-between mb-3"><h2 class="text-lg font-semibold text-teal-300">Skills</h2><button type="button" onclick="addSkill('${lang}')" class="text-xs px-3 py-1 bg-teal-700 hover:bg-teal-600 rounded text-white">+ Add</button></div>
<div id="skills-${lang}" class="space-y-2">${lc.skills.map((sk, i) => `<div class="flex gap-2 items-center"><input name="skill-${lang}-${i}" value="${esc(sk)}" class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /><button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-300 text-sm px-2">x</button></div>`).join('')}</div></section>
<div class="border-t border-gray-800"></div>

<section><div class="flex items-center justify-between mb-3"><h2 class="text-lg font-semibold text-teal-300">Services</h2><button type="button" onclick="addService('${lang}')" class="text-xs px-3 py-1 bg-teal-700 hover:bg-teal-600 rounded text-white">+ Add</button></div>
<div id="services-${lang}" class="space-y-4">${lc.services.map((sv, i) => serviceCardHTML(lang, i, sv)).join('')}</div></section>
<div class="border-t border-gray-800"></div>

<section><div class="flex items-center justify-between mb-3"><h2 class="text-lg font-semibold text-teal-300">Projects</h2><button type="button" onclick="addProject('${lang}')" class="text-xs px-3 py-1 bg-teal-700 hover:bg-teal-600 rounded text-white">+ Add</button></div>
<div id="projects-${lang}" class="space-y-4">${lc.projects.map((p, i) => projectCardHTML(lang, i, p)).join('')}</div></section>
<div class="border-t border-gray-800"></div>

<section><div class="flex items-center justify-between mb-3"><h2 class="text-lg font-semibold text-teal-300">Education</h2><button type="button" onclick="addEdu('${lang}')" class="text-xs px-3 py-1 bg-teal-700 hover:bg-teal-600 rounded text-white">+ Add</button></div>
<div id="edu-${lang}" class="space-y-4">${lc.education.map((e, i) => eduCardHTML(lang, i, e)).join('')}</div></section>
<div class="border-t border-gray-800"></div>

<section><h2 class="text-lg font-semibold text-teal-300 mb-3">Connect</h2>
<div><label class="block text-sm text-gray-400 mb-1">Email button label</label>${renderField('connect-' + lang, lc.connect.email)}</div></section>
</div></div>`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Admin Dashboard</title><link rel="preconnect" href="https://fonts.googleapis.com"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/><script src="https://cdn.tailwindcss.com"></script>
<style>body{font-family:'Inter',sans-serif}.tab-content{display:none}.tab-content.active{display:block}.item-card{transition:all .2s}.item-card:hover{border-color:#0d9488!important}</style></head>
<body class="bg-gray-950 text-gray-100 min-h-screen">
<div class="max-w-5xl mx-auto px-6 py-8">
<div class="flex items-center justify-between mb-8">
<h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
<div class="flex items-center gap-4">
${error ? `<span class="text-red-400 text-sm">${esc(error)}</span>` : ''}
${saved ? `<span class="text-teal-400 text-sm">Saved</span>` : ''}
<form method="post" action="/admin/logout"><button class="text-sm text-gray-400 hover:text-gray-200">Logout</button></form>
</div></div>

<div class="flex flex-wrap gap-4 mb-6 items-end">
<div><label class="block text-xs text-gray-500 mb-1">Name</label><input type="text" name="name" value="${esc(content.name)}" class="w-60 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div><label class="block text-xs text-gray-500 mb-1">Profile Image URL</label><input type="text" name="profileImage" value="${esc(content.profileImage)}" class="w-80 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" oninput="document.getElementById('profile-preview').src=this.value||''"/></div>
${content.profileImage ? `<img id="profile-preview" src="${esc(content.profileImage)}" class="w-12 h-12 rounded-full object-cover border border-gray-700" />` : '<img id="profile-preview" class="w-12 h-12 rounded-full object-cover border border-gray-700" style="display:none"/>'}
</div>
<div class="border-t border-gray-800 mb-6"></div>

<div class="flex gap-1 mb-6 bg-gray-900 rounded-lg p-1 w-fit">
<button type="button" onclick="switchTab('en')" id="tab-btn-en" class="px-4 py-2 text-sm font-medium rounded-md bg-teal-600 text-white">English</button>
<button type="button" onclick="switchTab('es')" id="tab-btn-es" class="px-4 py-2 text-sm font-medium rounded-md text-gray-400 hover:text-gray-200">Español</button>
</div>

<form id="content-form">
${tab('en', 'English')}
${tab('es', 'Español')}
</form>

<div class="mt-8 pt-6 border-t border-gray-800 flex justify-end">
<button onclick="saveContent()" class="px-8 py-3 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-teal-900/20">Save All</button>
</div></div>

<script>
function switchTab(lang){document.querySelectorAll('.tab-content').forEach(function(el){el.classList.toggle('active',el.id==='tab-'+lang)});document.querySelectorAll('[id^=tab-btn-]').forEach(function(el){el.className=el.id==='tab-btn-'+lang?'px-4 py-2 text-sm font-medium rounded-md bg-teal-600 text-white':'px-4 py-2 text-sm font-medium rounded-md text-gray-400 hover:text-gray-200'})}
function nextIdx(prefix){var max=-1;document.querySelectorAll('[name^="'+prefix+'"]').forEach(function(el){var m=el.name.match(new RegExp(prefix+'-\\\\d+'));if(m){var n=parseInt(m[0].split('-').pop());if(n>max)max=n}});return max+1}
function addSkill(lang){var c=document.getElementById('skills-'+lang);var i=nextIdx('skill-'+lang);var d=document.createElement('div');d.className='flex gap-2 items-center';d.innerHTML='<input name="skill-'+lang+'-'+i+'" class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /><button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-300 text-sm px-2">x</button>';c.appendChild(d)}
function svcHTML(lang,i){var t='<div class="item-card p-4 rounded-xl bg-gray-900/40 border border-gray-800/60"><div class="grid grid-cols-2 gap-3 mb-3"><div><label class="block text-xs text-gray-500 mb-1">Icon</label><select name="svc-icon-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm">';['server','zap','database','shield','book','wrench'].forEach(function(n){t+='<option value="'+n+'">'+n+'</option>'});t+='</select></div><div><label class="block text-xs text-gray-500 mb-1">Image URL</label><input name="svc-image-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div></div><div class="grid grid-cols-2 gap-3 mb-3"><div><label class="block text-xs text-gray-500 mb-1">Title ('+lang+')</label><input name="svc-title-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><div><label class="block text-xs text-gray-500 mb-1">Description ('+lang+')</label><input name="svc-desc-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div></div><button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-400 hover:text-red-300">Remove</button></div>';return t}
function addService(lang){var c=document.getElementById('services-'+lang);var i=nextIdx('svc-icon');c.insertAdjacentHTML('beforeend',svcHTML(lang,i))}
function projHTML(lang,i){var t='<div class="item-card p-4 rounded-xl bg-gray-900/40 border border-gray-800/60"><div class="mb-3"><label class="block text-xs text-gray-500 mb-1">Image URL</label><input name="proj-image-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><div class="grid grid-cols-2 gap-3 mb-3"><div><label class="block text-xs text-gray-500 mb-1">Type ('+lang+')</label><input name="proj-type-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><div><label class="block text-xs text-gray-500 mb-1">Title ('+lang+')</label><input name="proj-title-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div></div><div class="mb-3"><label class="block text-xs text-gray-500 mb-1">Description ('+lang+')</label><input name="proj-desc-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><div class="mb-3"><label class="block text-xs text-gray-500 mb-1">Tags (comma separated)</label><input name="proj-tags-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-400 hover:text-red-300">Remove</button></div>';return t}
function addProject(lang){var c=document.getElementById('projects-'+lang);var i=nextIdx('proj-image');c.insertAdjacentHTML('beforeend',projHTML(lang,i))}
function eduHTML(lang,i){return '<div class="item-card p-4 rounded-xl bg-gray-900/40 border border-gray-800/60"><div class="grid grid-cols-3 gap-3 mb-3"><div><label class="block text-xs text-gray-500 mb-1">Degree ('+lang+')</label><input name="edu-degree-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><div><label class="block text-xs text-gray-500 mb-1">Institution ('+lang+')</label><input name="edu-institution-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div><div><label class="block text-xs text-gray-500 mb-1">Year ('+lang+')</label><input name="edu-year-'+lang+'-'+i+'" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div></div><button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-400 hover:text-red-300">Remove</button></div>'}
function addEdu(lang){var c=document.getElementById('edu-'+lang);var i=nextIdx('edu-degree-'+lang);c.insertAdjacentHTML('beforeend',eduHTML(lang,i))}
function saveContent(){var langs=['en','es'];var data={name:document.querySelector('[name="name"]').value||'Derby',profileImage:document.querySelector('[name="profileImage"]').value||'',en:{hero:{tagline:'',subtitle:''},about:'',skills:[],services:[],projects:[],education:[],connect:{email:''}},es:{hero:{tagline:'',subtitle:''},about:'',skills:[],services:[],projects:[],education:[],connect:{email:''}}}
langs.forEach(function(lang){var lc=data[lang]
lc.hero.tagline=document.querySelector('[name="hero-tagline-'+lang+'"]')?.value||''
lc.hero.subtitle=document.querySelector('[name="hero-subtitle-'+lang+'"]')?.value||''
lc.about=document.querySelector('[name="about-'+lang+'"]')?.value||''
lc.connect.email=document.querySelector('[name="connect-'+lang+'"]')?.value||''
var skills=[];document.querySelectorAll('[name^="skill-'+lang+'-"]').forEach(function(el){if(el.value.trim())skills.push(el.value.trim())});lc.skills=skills
var svcIcons={};document.querySelectorAll('[name^="svc-icon-"]').forEach(function(el){var m=el.name.match(/svc-icon-(\\d+)/);if(m)svcIcons[m[1]]={icon:el.value}})
document.querySelectorAll('[name^="svc-image-"]').forEach(function(el){var m=el.name.match(/svc-image-(\\d+)/);if(m&&svcIcons[m[1]])svcIcons[m[1]].image=el.value})
document.querySelectorAll('[name^="svc-title-'+lang+'-"]').forEach(function(el){var m=el.name.match(/svc-title-\\w+-(\\d+)/);if(m&&svcIcons[m[1]])svcIcons[m[1]].title=el.value})
document.querySelectorAll('[name^="svc-desc-'+lang+'-"]').forEach(function(el){var m=el.name.match(/svc-desc-\\w+-(\\d+)/);if(m&&svcIcons[m[1]])svcIcons[m[1]].desc=el.value})
lc.services=Object.values(svcIcons).filter(function(s){return s.title&&s.title.trim()})
var projs={};document.querySelectorAll('[name^="proj-image-"]').forEach(function(el){var m=el.name.match(/proj-image-(\\d+)/);if(m)projs[m[1]]={image:el.value}})
document.querySelectorAll('[name^="proj-type-'+lang+'-"]').forEach(function(el){var m=el.name.match(/proj-type-\\w+-(\\d+)/);if(m&&projs[m[1]])projs[m[1]].type=el.value})
document.querySelectorAll('[name^="proj-title-'+lang+'-"]').forEach(function(el){var m=el.name.match(/proj-title-\\w+-(\\d+)/);if(m&&projs[m[1]])projs[m[1]].title=el.value})
document.querySelectorAll('[name^="proj-desc-'+lang+'-"]').forEach(function(el){var m=el.name.match(/proj-desc-\\w+-(\\d+)/);if(m&&projs[m[1]])projs[m[1]].desc=el.value})
document.querySelectorAll('[name^="proj-tags-'+lang+'-"]').forEach(function(el){var m=el.name.match(/proj-tags-\\w+-(\\d+)/);if(m&&projs[m[1]])projs[m[1]].tags=el.value.split(',').map(function(t){return t.trim()}).filter(function(t){return t})})
lc.projects=Object.values(projs).filter(function(p){return p.title&&p.title.trim()})
var edus={};document.querySelectorAll('[name^="edu-degree-'+lang+'-"]').forEach(function(el){var m=el.name.match(/edu-degree-\\w+-(\\d+)/);if(m)edus[m[1]]={degree:el.value}})
document.querySelectorAll('[name^="edu-institution-'+lang+'-"]').forEach(function(el){var m=el.name.match(/edu-institution-\\w+-(\\d+)/);if(m&&edus[m[1]])edus[m[1]].institution=el.value})
document.querySelectorAll('[name^="edu-year-'+lang+'-"]').forEach(function(el){var m=el.name.match(/edu-year-\\w+-(\\d+)/);if(m&&edus[m[1]])edus[m[1]].year=el.value})
lc.education=Object.values(edus).filter(function(e){return e.degree&&e.degree.trim()})})
fetch('/api/content',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){if(r.ok)location.reload();else r.text().then(function(t){alert('Error: '+t)})}).catch(function(e){alert('Error: '+e.message)})}
</script>
</body></html>`
}

function serviceCardHTML(lang: Lang, i: number, sv: { title: string; desc: string; icon: string; image: string }): string {
  const opts = ICON_NAMES.map(n => `<option value="${n}"${n === sv.icon ? ' selected' : ''}>${n}</option>`).join('')
  return `<div class="item-card p-4 rounded-xl bg-gray-900/40 border border-gray-800/60">
<div class="grid grid-cols-2 gap-3 mb-3">
<div><label class="block text-xs text-gray-500 mb-1">Icon</label><select name="svc-icon-${i}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm">${opts}</select></div>
<div><label class="block text-xs text-gray-500 mb-1">Image URL</label><input name="svc-image-${i}" value="${esc(sv.image)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
</div>
<div class="grid grid-cols-2 gap-3 mb-3">
<div><label class="block text-xs text-gray-500 mb-1">Title (${lang})</label><input name="svc-title-${lang}-${i}" value="${esc(sv.title)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div><label class="block text-xs text-gray-500 mb-1">Description (${lang})</label><input name="svc-desc-${lang}-${i}" value="${esc(sv.desc)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
</div>
<button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-400 hover:text-red-300">Remove</button>
</div>`
}

function projectCardHTML(lang: Lang, i: number, p: { title: string; type: string; desc: string; tags: string[]; image: string }): string {
  return `<div class="item-card p-4 rounded-xl bg-gray-900/40 border border-gray-800/60">
<div class="mb-3"><label class="block text-xs text-gray-500 mb-1">Image URL</label><input name="proj-image-${i}" value="${esc(p.image)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div class="grid grid-cols-2 gap-3 mb-3">
<div><label class="block text-xs text-gray-500 mb-1">Type (${lang})</label><input name="proj-type-${lang}-${i}" value="${esc(p.type)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div><label class="block text-xs text-gray-500 mb-1">Title (${lang})</label><input name="proj-title-${lang}-${i}" value="${esc(p.title)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
</div>
<div class="mb-3"><label class="block text-xs text-gray-500 mb-1">Description (${lang})</label><input name="proj-desc-${lang}-${i}" value="${esc(p.desc)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div class="mb-3"><label class="block text-xs text-gray-500 mb-1">Tags (comma separated)</label><input name="proj-tags-${lang}-${i}" value="${esc(p.tags.join(', '))}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-400 hover:text-red-300">Remove</button>
</div>`
}

function eduCardHTML(lang: Lang, i: number, e: { degree: string; institution: string; year: string }): string {
  return `<div class="item-card p-4 rounded-xl bg-gray-900/40 border border-gray-800/60">
<div class="grid grid-cols-3 gap-3 mb-3">
<div><label class="block text-xs text-gray-500 mb-1">Degree (${lang})</label><input name="edu-degree-${lang}-${i}" value="${esc(e.degree)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div><label class="block text-xs text-gray-500 mb-1">Institution (${lang})</label><input name="edu-institution-${lang}-${i}" value="${esc(e.institution)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
<div><label class="block text-xs text-gray-500 mb-1">Year (${lang})</label><input name="edu-year-${lang}-${i}" value="${esc(e.year)}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500" /></div>
</div>
<button type="button" onclick="this.parentElement.remove()" class="text-xs text-red-400 hover:text-red-300">Remove</button>
</div>`
}

function LoginPageHTML(error?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Admin Login</title><link rel="preconnect" href="https://fonts.googleapis.com"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/><script src="https://cdn.tailwindcss.com"></script>
<style>body{font-family:'Inter',sans-serif}</style></head>
<body class="bg-gray-950 text-gray-100 min-h-screen flex items-center justify-center">
<div class="w-full max-w-sm mx-6"><h1 class="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
${error ? `<p class="text-red-400 text-sm text-center mb-4">${esc(error)}</p>` : ''}
<form method="post" action="/admin" class="space-y-4">
<div><input type="password" name="password" placeholder="Password" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-teal-500" /></div>
<button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300">Login</button>
</form>
<div class="text-center mt-4"><a href="/" class="text-sm text-gray-500 hover:text-gray-300">&larr; Back to site</a></div>
</div></body></html>`
}

const app = new Hono<{ Bindings: Bindings }>()

function base64url(data: string): string {
  return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function signJWT(secret: string): Promise<string> {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = base64url(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 86400, iat: Math.floor(Date.now() / 1000) }))
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sigBytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(header + '.' + payload)))
  const sig = base64url(String.fromCharCode(...sigBytes))
  return header + '.' + payload + '.' + sig
}

async function verifyJWT(token: string, secret: string): Promise<boolean> {
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [header, payload, sig] = parts
  try {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
    const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(header + '.' + payload))
    if (!valid) return false
    const data = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return (data.exp || 0) > Math.floor(Date.now() / 1000)
  } catch { return false }
}

function isAuthed(c: any, secret: string): Promise<boolean> {
  const cookie = c.req.header('cookie') || ''
  const match = cookie.match(/admin_token=([^;]+)/)
  if (!match) return Promise.resolve(false)
  return verifyJWT(match[1], secret)
}

app.get('/admin', async (c) => {
  if (await isAuthed(c, c.env.ADMIN_SECRET)) {
    const content = await loadContent(c.env)
    return c.html(AdminDashboardHTML(content))
  }
  return c.html(LoginPageHTML())
})

app.post('/admin', async (c) => {
  const fd = await c.req.formData()
  const pw = fd.get('password') as string
  if (pw === c.env.ADMIN_PASSWORD) {
    const token = await signJWT(c.env.ADMIN_SECRET)
    c.header('Set-Cookie', `admin_token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Lax`)
    return c.redirect('/admin/dashboard')
  }
  return c.html(LoginPageHTML('Invalid password'))
})

app.get('/admin/dashboard', async (c) => {
  if (!await isAuthed(c, c.env.ADMIN_SECRET)) return c.redirect('/admin')
  const content = await loadContent(c.env)
  const saved = c.req.query('saved') === '1'
  return c.html(AdminDashboardHTML(content, saved))
})

app.post('/admin/logout', async (c) => {
  c.header('Set-Cookie', 'admin_token=; HttpOnly; Secure; Path=/; Max-Age=0')
  return c.redirect('/admin')
})

app.get('/api/content', async (c) => {
  if (!await isAuthed(c, c.env.ADMIN_SECRET)) return c.json({ error: 'unauthorized' }, 401)
  return c.json(await loadContent(c.env))
})

app.post('/api/content', async (c) => {
  if (!await isAuthed(c, c.env.ADMIN_SECRET)) return c.json({ error: 'unauthorized' }, 401)
  const body = await c.req.json()
  const parsed = contentSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ error: 'validation failed', details: parsed.error.flatten() }, 400)
  }
  await c.env.SITE_CONTENT.put('content', JSON.stringify(parsed.data))
  return c.json({ ok: true })
})

app.post('/api/sync-defaults', async (c) => {
  if (!await isAuthed(c, c.env.ADMIN_SECRET)) return c.json({ error: 'unauthorized' }, 401)
  await c.env.SITE_CONTENT.put('content', JSON.stringify(DEFAULT_CONTENT))
  return c.json({ ok: true, message: 'Defaults restored' })
})

app.get('/', async (c) => {
  const raw = c.req.query('lang')
  const lang = (raw === 'es' ? 'es' : 'en') as Lang
  const content = await loadContent(c.env)
  return c.html(htmlPage(content, lang))
})

export default app
