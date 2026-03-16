"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Linkedin, 
  Twitter, 
  Send, 
  MessageSquare, 
  ExternalLink, 
  Github,
  Zap,
  ChevronRight,
  Menu,
  X,
  Phone
} from 'lucide-react';

// --- STYLED COMPONENTS (Tailwind Class Constants) ---
const GLASS_CARD = "bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-xl hover:border-cyan-400/60 transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.1)]";
const NEON_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 font-bold";
const SCANLINE = "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/5 before:to-transparent before:animate-scanline pointer-events-none";

// --- DATA CONSTANTS (Strictly adhering to provided JSON schemas) ---
const SKILLS_DATA = {
  "skills": [
    {
      "name": "Cloud & DevOps Architecture",
      "languages": ["Bash", "Python"],
      "tools": ["Jenkins", "Docker", "GCP", "OCI"]
    },
    {
      "name": "Fullstack Development",
      "languages": ["TypeScript", "JavaScript", "Go"],
      "tools": ["Next.js", "React.js", "Express", "FastAPI"]
    },
    {
      "name": "Immersive Realities & Games",
      "languages": ["C++", "C#"],
      "tools": ["Unreal Engine", "Unity", "AR/VR Tools"]
    }
  ]
};

const PORTFOLIO_DATA = {
  "portfolio": [
    {
      "title": "The Supernatural Community Church",
      "source_code_links": [],
      "deployment_links": ["https://scc-newyork.org"],
      "languages": ["JavaScript", "TypeScript"],
      "tools": ["Reactjs", "Express", "MongoDB"]
    },
    {
      "title": "Coherentity AI Engine",
      "source_code_links": ["https://github.com/philip/coherentity"],
      "deployment_links": ["https://coherentity.com"],
      "languages": ["Python", "TypeScript"],
      "tools": ["Nextjs", "MongoDB", "FastAPI"]
    },
    {
      "title": "MIV Word House Portal",
      "source_code_links": [],
      "deployment_links": ["https://mivwordhouse.com"],
      "languages": ["JavaScript"],
      "tools": ["Reactjs", "Express", "MongoDB"]
    }
  ]
};

const WORK_EXPERIENCE = {
  "work_experience": [
    {
      "company_name": "MIV Word House, Ibadan",
      "time_period": "2024-Present",
      "roles": ["Lead Developer"],
      "description": ["Leading full-stack initiatives", "Architecting scalable backend systems", "Optimizing cloud deployment"]
    },
    {
      "company_name": "Supernatural Community Church, NY",
      "time_period": "2024-Present",
      "roles": ["Lead Developer"],
      "description": ["Global platform management", "Community engagement tools", "Secure database architecture"]
    },
    {
      "company_name": "Freelance Cloud Architect",
      "time_period": "2022-2023",
      "roles": ["Solution Architect", "DevOps Engineer"],
      "description": ["Infrastructure as code implementation", "Blockchain node optimization"]
    }
  ]
};

const BLOGS = [
  {
    "img_src": "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=800",
    "title": "Virology Meets Code",
    "summary": "How complex biological patterns mirror distributed computing architectures.",
    "timestamp": "2026-02-25T14:30:00Z"
  },
  {
    "img_src": "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    "title": "Scalability in OCI",
    "summary": "Deep dive into Oracle Cloud Infrastructure for enterprise Flutter apps.",
    "timestamp": "2026-02-25T14:30:00Z"
  }
];

// --- SUB-COMPONENTS ---

const AnimatedMetric = ({ target, label }: { target: string; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 50);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">{count}+</div>
      <div className="text-gray-400 uppercase tracking-widest text-xs">{label}</div>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Initialize system... Philip Ajayi portal online. How can I assist?' }]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: "Query received. Routing request to Philip's neural link..." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`w-80 md:w-96 h-[450px] ${GLASS_CARD} flex flex-col overflow-hidden mb-2`}
          >
            <div className="p-4 bg-cyan-500/20 border-b border-cyan-500/30 flex justify-between items-center">
              <span className="flex items-center gap-2 font-mono text-cyan-400">
                <Terminal size={18} /> PHILIP_AI_v1.0
              </span>
              <button onClick={() => setIsOpen(false)}><X size={18} className="text-gray-400 hover:text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded ${m.role === 'user' ? 'bg-purple-600/40 text-white' : 'bg-cyan-900/40 text-cyan-200 border border-cyan-800'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-cyan-500/30">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command..."
                className="w-full bg-black/50 border border-cyan-500/30 rounded p-2 text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-2">
         <a 
          href="https://wa.me/2340000000000" 
          target="_blank" 
          className="p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-400 transition-colors text-white"
        >
          <Phone size={24} />
        </a>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-cyan-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:bg-cyan-500 transition-colors text-white"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Dynamic Cursor Light */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`
        }}
      />

      {/* Cyber Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-purple-900/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-black tracking-tighter text-white flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center">
              <span className="rotate-[-45deg] text-black text-xs font-bold">PA</span>
            </div>
            PHILIP.SYS
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-widest text-gray-400">
            {['ABOUT', 'SKILLS', 'PORTFOLIO', 'WORK', 'BLOG', 'CONTACT'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                {item}
              </a>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center gap-8 text-2xl font-black"
          >
            {['ABOUT', 'SKILLS', 'PORTFOLIO', 'WORK', 'BLOG', 'CONTACT'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-cyan-400"
              >
                {item}
              </a>
            ))}
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 p-4 border border-cyan-500 rounded-full text-cyan-400">
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-24">
        
        {/* Hero Section */}
        <section id="about" className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 border border-cyan-500/50 rounded-full text-xs font-mono text-cyan-400 mb-6 bg-cyan-950/20">
                PROTOCOL: LEAD_DEVELOPER_INITIATED
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                <span className="text-white">PHILIP</span> <br />
                <span className={NEON_TEXT}>AJAYI</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
                MSc Virologist turned Multi-Stack Architect. Bridging the gap between biological complexity 
                and high-performance cloud ecosystems. Expert in NextJS, Unreal Engine, and Distributed Systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold transition-all rounded-sm flex items-center gap-2 group">
                  EXPLORE ARCHIVE <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-gray-700 hover:border-cyan-500 transition-all rounded-sm font-bold text-gray-300">
                  DOWNLOAD_BIO.PDF
                </button>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: yParallax }}
              className="relative hidden lg:block"
            >
              <div className="w-full aspect-square border-2 border-cyan-500/20 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 z-10 group-hover:opacity-0 transition-opacity" />
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cyber Architecture"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute bottom-6 left-6 z-20 font-mono text-xs text-cyan-400 bg-black/80 p-4 border border-cyan-500/30">
                  NAME: PHILIP AJAYI <br />
                  EXP: MULTI_STACK_LEAD <br />
                  LOC: REMOTE // GLOBAL
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics Bar */}
        <section className="bg-black/80 border-y border-gray-800 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
            <AnimatedMetric target="50" label="Global Projects" />
            <AnimatedMetric target="12" label="Core Stacks" />
            <AnimatedMetric target="100" label="Uptime %" />
            <AnimatedMetric target="5" label="Fortune Clients" />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-white mb-4">NEURAL_STX <span className="text-cyan-500">.</span></h2>
            <div className="h-1 w-24 bg-cyan-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILLS_DATA.skills.map((skill, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className={`${GLASS_CARD} p-8 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <Cpu className="text-cyan-500" size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
                  {skill.name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-cyan-400 font-mono block mb-2 uppercase tracking-widest">Languages</span>
                    <div className="flex flex-wrap gap-2">
                      {skill.languages.map(l => (
                        <span key={l} className="px-2 py-1 bg-gray-800 text-xs rounded border border-gray-700 text-gray-300">{l}</span>
                      ))}
                    </div>
                  </div>
                  {skill.tools.length > 0 && (
                    <div>
                      <span className="text-xs text-purple-400 font-mono block mb-2 uppercase tracking-widest">Tools & Frameworks</span>
                      <div className="flex flex-wrap gap-2">
                        {skill.tools.map(t => (
                          <span key={t} className="px-2 py-1 bg-purple-900/20 text-xs rounded border border-purple-500/20 text-purple-300">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-black text-white mb-4">DEPLOYED_PROJS <span className="text-purple-500">.</span></h2>
                <p className="text-gray-400">Production grade ecosystems built from scratch.</p>
              </div>
              <button className="hidden md:block text-cyan-500 font-mono text-sm hover:underline">VIEW_ALL_NODES</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PORTFOLIO_DATA.portfolio.map((project, idx) => (
                <div key={idx} className={`${GLASS_CARD} group flex flex-col h-full`}>
                  <div className="h-48 bg-gray-900 overflow-hidden relative">
                     <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                     <img 
                       src={`https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800&sig=${idx}`} 
                       className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500"
                       alt={project.title}
                     />
                     <div className="absolute top-4 left-4 flex gap-2">
                       {project.languages.slice(0, 2).map(lang => (
                         <span key={lang} className="text-[10px] bg-black/80 px-2 py-1 border border-cyan-500/40 text-cyan-400">{lang}</span>
                       ))}
                     </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tools.map(tool => (
                        <span key={tool} className="text-xs text-gray-500 font-mono">#{tool}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex gap-4">
                      {project.deployment_links.length > 0 && (
                        <a href={project.deployment_links[0]} className="flex items-center gap-2 text-sm text-cyan-500 hover:text-white transition-colors">
                          <ExternalLink size={16} /> LIVE_DEMO
                        </a>
                      )}
                      {project.source_code_links.length > 0 && (
                        <a href={project.source_code_links[0]} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                          <Github size={16} /> REPO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="work" className="py-24 px-6 max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Career_Log</h2>
            <div className="h-1 w-24 bg-purple-600 mx-auto" />
          </div>

          <div className="space-y-12">
            {WORK_EXPERIENCE.work_experience.map((work, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-0"
              >
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2" />
                <div className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 p-6 md:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{work.company_name}</h3>
                        <p className="text-cyan-500 font-mono text-sm">{work.roles.join(' | ')}</p>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 bg-gray-800 rounded-full">{work.time_period}</span>
                    </div>
                    <ul className="space-y-2">
                      {work.description.map((desc, i) => (
                        <li key={i} className="text-gray-400 text-sm flex gap-2">
                          <span className="text-cyan-600">»</span> {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 bg-black border-2 border-cyan-500 rounded-full z-20">
                     <div className="w-2 h-2 bg-cyan-500 animate-ping" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 px-6 bg-black/40">
           <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
              THOUGHT_STREAM <Zap className="text-yellow-500" fill="currentColor" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {BLOGS.map((blog, idx) => (
                <div key={idx} className={`${GLASS_CARD} flex flex-col md:flex-row overflow-hidden group h-full`}>
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={blog.img_src} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt={blog.title}
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3">{blog.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-1">{blog.summary}</p>
                    <button className="text-cyan-500 text-xs font-mono hover:text-white transition-colors flex items-center gap-2">
                      READ_TRANSMISSION <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button className="px-10 py-3 border-2 border-cyan-500 text-cyan-500 font-bold hover:bg-cyan-500 hover:text-black transition-all">
                BROWSE_FULL_ARCHIVE
              </button>
            </div>
          </div>
        </section>

        {/* Contact & Newsletter */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form */}
            <div className={`${GLASS_CARD} p-10 relative`}>
              <div className="absolute -top-4 -left-4 bg-cyan-600 p-2 text-black font-black uppercase text-xs">Direct_Link</div>
              <h2 className="text-3xl font-black text-white mb-8">CONTACT_INIT</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Identifier</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-black/60 border border-gray-800 rounded p-3 focus:border-cyan-500 outline-none text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Comms_Addr</label>
                    <input type="email" placeholder="email@domain.com" className="w-full bg-black/60 border border-gray-800 rounded p-3 focus:border-cyan-500 outline-none text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Payload</label>
                  <textarea rows={4} placeholder="Brief project overview..." className="w-full bg-black/60 border border-gray-800 rounded p-3 focus:border-cyan-500 outline-none text-white"></textarea>
                </div>
                <button className="w-full py-4 bg-cyan-600 text-black font-black hover:bg-cyan-500 transition-colors uppercase flex items-center justify-center gap-3">
                  TRANSMIT <Send size={20} />
                </button>
              </form>
            </div>

            {/* Newsletter & Socials */}
            <div className="flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-white mb-4">NEURAL_NEWS</h2>
                <p className="text-gray-400 mb-6">Stay updated with my latest technical deep-dives and laboratory experiments.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email Address" className="flex-1 bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-purple-500 outline-none" />
                  <button className="bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500 transition-colors">JOIN</button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono text-cyan-400 mb-6 uppercase tracking-[0.2em]">External_Connections</h3>
                <div className="flex gap-6">
                  <a href="#" className="p-4 bg-gray-900 border border-gray-800 rounded-full hover:border-cyan-500 transition-all text-gray-400 hover:text-cyan-400">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="p-4 bg-gray-900 border border-gray-800 rounded-full hover:border-cyan-500 transition-all text-gray-400 hover:text-cyan-400">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="p-4 bg-gray-900 border border-gray-800 rounded-full hover:border-cyan-500 transition-all text-gray-400 hover:text-cyan-400">
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-900 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-900/5 blur-3xl rounded-full" />
        <p className="text-gray-500 font-mono text-xs relative z-10">
          DESIGNED_FOR: PHILIP AJAYI // SYSTEM_STATUS: OPERATIONAL <br />
          © 2026 ENCRYPTED_PROTOCOLS. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* Floating UI */}
      <Chatbot />
      
      {/* Visual Glitch Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] border-cyan-500/5" />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #0891b2;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
