"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Download,
  Mail,
  Code2,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { RevealOnScroll, RevealText } from "@/components/RevealAnimations";

// Dynamic import to avoid SSR issues with Three.js
const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
});

/* ───────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────── */
const TITLES = [
  "AI/ML Developer",
  "Full Stack Developer",
  "Problem Solver",
  "Builder",
  "Innovator",
  "SIH Finalist",
];

const PROJECTS = [
  {
    id: "insightai",
    index: "001",
    title: "IntelliAgent",
    subtitle: "AI Business Intelligence Agent",
    description:
      "A multi-agent orchestration system that serves as a business intelligence command center. Features live AI agents, real-time data pipelines, and interactive analytics dashboards.",
    tech: ["Python", "LangChain", "LLMs", "React", "FastAPI"],
    github:
      "https://github.com/Amu612/InsightAI_AI_Business_Intelligence_Agent",
    demo: "https://insight-ai-ai-business-intelligence.vercel.app",
    accent: "#00e5ff",
    gradFrom: "#001829",
    gradTo: "#000a14",
  },
  {
    id: "digitaltwin",
    index: "002",
    title: "CO₂ Digital Twin",
    subtitle: "Environmental Simulation Platform",
    description:
      "A 3D geospatial simulation of carbon emissions. Built with Cesium-inspired interactions, volumetric environmental metrics, and real-time satellite data overlays.",
    tech: ["Python", "Flask", "CesiumJS", "GIS", "ML"],
    github: "https://github.com/Amu612/Digital-twin-for-CO2-Emission-",
    accent: "#00ffa3",
    gradFrom: "#001a0e",
    gradTo: "#000a05",
  },
  {
    id: "villagecraft",
    index: "003",
    title: "VillageCraft",
    subtitle: "Interactive 3D Rural Simulation",
    description:
      "A scroll-driven 3D village that emerges building by building. Infrastructure animations, terrain generation, and game-like exploration mechanics.",
    tech: ["JavaScript", "Three.js", "GSAP", "WebGL"],
    github: "https://github.com/Amu612/VillageCraft",
    accent: "#ffb347",
    gradFrom: "#1a0f00",
    gradTo: "#0a0600",
  },
  {
    id: "learningpath",
    index: "004",
    title: "Learning Path RS",
    subtitle: "AI-Powered Learning Ecosystem",
    description:
      "A personalized learning recommendation engine featuring an interactive skill galaxy visualization. Knowledge networks and animated learning roadmaps.",
    tech: ["React.js", "Django", "Recharts", "ML"],
    github: "https://github.com/Amu612/Leraning_Path_RS",
    accent: "#c4b5fd",
    gradFrom: "#0d0014",
    gradTo: "#060008",
  },
  {
    id: "geoanushasan",
    index: "005",
    title: "GeoAnushasan",
    subtitle: "Smart City Command Center",
    description:
      "A real-time geospatial monitoring platform for urban intelligence. 3D logistics visualization, environmental tracking, and IoT sensor integration.",
    tech: ["IoT", "React", "Node.js", "Maps API", "PostgreSQL"],
    github: "https://github.com/Amu612/GeoAnushasan",
    accent: "#60a5fa",
    gradFrom: "#00081a",
    gradTo: "#00040d",
  },
  {
    id: "blemish",
    index: "006",
    title: "BLemish",
    subtitle: "Computer Vision Defect Detection",
    description:
      "An image scanning system that identifies defects using deep learning. Interactive scanning UI with confidence overlays and real-time inference.",
    tech: ["Python", "OpenCV", "PyTorch", "FastAPI"],
    github: "https://github.com/Amu612/BLemish",
    accent: "#f87171",
    gradFrom: "#1a0005",
    gradTo: "#0a0003",
  },
  {
    id: "greenwashing",
    index: "007",
    title: "Greenwashing Detector",
    subtitle: "AI Browser Extension",
    description:
      "A browser extension powered by NLP that flags misleading sustainability claims in real-time. Interactive simulation of the extension's analysis pipeline.",
    tech: ["JavaScript", "Browser API", "NLP", "Python"],
    github: "https://github.com/Amu612/Greenwashing_Detector_Web_Extension-",
    accent: "#34d399",
    gradFrom: "#001a0a",
    gradTo: "#000a05",
  },
];

const SKILLS = [
  { name: "Python", level: 95, category: "AI/ML" },
  { name: "TensorFlow / PyTorch", level: 88, category: "AI/ML" },
  { name: "LangChain / LLMs", level: 82, category: "AI/ML" },
  { name: "Computer Vision", level: 80, category: "AI/ML" },
  { name: "React.js / Next.js", level: 92, category: "Frontend" },
  { name: "Three.js / WebGL", level: 78, category: "Frontend" },
  { name: "Django / FastAPI", level: 88, category: "Backend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "PostgreSQL / MongoDB", level: 80, category: "Database" },
  { name: "Docker / CI/CD", level: 75, category: "DevOps" },
  { name: "C / C++", level: 78, category: "Core" },
  { name: "Java", level: 72, category: "Core" },
];

const ACHIEVEMENTS = [
  {
    title: "Smart India Hackathon Finalist",
    year: "2024 & 2025",
    desc: "Two consecutive years. Built impactful national-scale software solutions under extreme pressure and tight deadlines.",
    accent: "#00e5ff",
  },
  {
    title: "AU Ingenium 7.0 Top 10",
    year: "2026",
    desc: "Secured Top 10 position. Presented a Digital Twin-based solution for urban planning and infrastructure management.",
    accent: "#c4b5fd",
  },
  {
    title: "PIERC Cohort 9",
    year: "2026",
    desc: "Selected for Parul University Pre-Incubation Programme as a Web3 startup co-founder. SSIP grant approved.",
    accent: "#34d399",
  },
  {
    title: "Cyber Shadez Organizer",
    year: "2026",
    desc: "Organized a university-level Bug Bounty event with 100+ active participants, promoting cybersecurity culture.",
    accent: "#f87171",
  },
];

/* ───────────────────────────────────────────────────
   SUB-COMPONENTS
──────────────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <HeroCanvas />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 70%, #000 100%)",
        }}
      />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#050505] to-transparent z-[2] pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 select-none"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm text-white/60"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          GLS University · Ahmedabad · Open to Opportunities
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] font-black tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #9ca3af 50%, #374151 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AMULYA
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] font-black tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, #67E8F9 0%, #22d3ee 40%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ANAMDASU
          </motion.h1>
        </div>

        {/* Animated title ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="h-8 md:h-10 overflow-hidden mb-12"
        >
          <motion.div
            animate={{ y: TITLES.map((_, i) => `-${i * 100}%`) }}
            transition={{
              duration: TITLES.length * 2.5,
              ease: "linear",
              repeat: Infinity,
              times: TITLES.map((_, i) => i / TITLES.length),
            }}
            className="flex flex-col"
          >
            {[...TITLES, TITLES[0]].map((t, i) => (
              <span
                key={i}
                className="h-8 md:h-10 flex items-center text-base md:text-xl font-light tracking-[0.3em] text-cyan-200/70 uppercase"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#projects"
            className="hover-trigger group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-cyan-300 transition-colors"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="mailto:amulyaa0612@gmail.com"
            className="hover-trigger px-8 py-4 rounded-full border border-white/20 text-white text-sm font-semibold tracking-wide hover:border-cyan-400/60 hover:bg-cyan-950/20 transition-colors"
          >
            Get In Touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.35em] text-white/30 uppercase">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
        <ChevronDown className="w-4 h-4 text-white/20 animate-bounce" />
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-40 md:py-60 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.4em] text-cyan-400 uppercase mb-16">
            01 — The Engineer
          </p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <RevealText>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-10">
                I don't write code.
                <br />
                <span className="text-white/30">I engineer</span>
                <br />
                intelligence.
              </h2>
            </RevealText>

            <RevealOnScroll delay={0.15}>
              <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-lg">
                Based in Ahmedabad at GLS University, I&apos;m an AI/ML and Full
                Stack Developer obsessed with the intersection of artificial
                intelligence and elegant product design.
              </p>
              <p className="text-lg text-white/50 leading-relaxed max-w-lg">
                From training neural networks to building cinematic web
                experiences, I architect end-to-end solutions that feel as
                sophisticated as they perform.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.2} className="grid grid-cols-2 gap-6">
            {[
              { stat: "7+", label: "Projects Shipped" },
              { stat: "2×", label: "SIH Finalist" },
              { stat: "3+", label: "Years Building" },
              { stat: "∞", label: "Curiosity" },
            ].map((item) => (
              <div
                key={item.stat}
                className="p-8 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-cyan-500/30 transition-colors hover-trigger"
              >
                <p className="text-5xl font-black text-white mb-2">
                  {item.stat}
                </p>
                <p className="text-sm text-white/40 uppercase tracking-widest">
                  {item.label}
                </p>
              </div>
            ))}
          </RevealOnScroll>
        </div>

        {/* Divider */}
        <RevealOnScroll
          delay={0.3}
          className="mt-32 pt-16 border-t border-white/5 grid md:grid-cols-3 gap-12"
        >
          {[
            {
              title: "AI / ML",
              desc: "Neural networks, LLMs, computer vision, reinforcement learning, and intelligent agent systems.",
            },
            {
              title: "Full Stack",
              desc: "React, Next.js, Django, FastAPI, Node.js — from pixel-perfect UIs to scalable APIs.",
            },
            {
              title: "Systems",
              desc: "C/C++, Java, PostgreSQL, Docker — engineering robust and efficient foundations.",
            },
          ].map((col) => (
            <div key={col.title} className="group hover-trigger">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {col.title}
              </h3>
              <p className="text-white/40 leading-relaxed">{col.desc}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 py-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <RevealOnScroll className="mb-32">
          <p className="text-xs font-bold tracking-[0.4em] text-purple-400 uppercase mb-6">
            03 — The Work
          </p>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight max-w-3xl">
            Turning complex problems into elegant products.
          </h2>
        </RevealOnScroll>

        <div className="space-y-48">
          {PROJECTS.map((project, index) => (
            <RevealOnScroll key={project.id} delay={0.05}>
              <div
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
              >
                {/* Visual panel */}
                <div className="w-full lg:w-3/5 relative group">
                  <div
                    className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`,
                    }}
                  >
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Glow orb */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                      style={{ backgroundColor: project.accent }}
                    />

                    {/* Project number display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10">
                      <p
                        className="text-8xl md:text-[10rem] font-black opacity-[0.04] select-none leading-none"
                        style={{ color: project.accent }}
                      >
                        {project.index}
                      </p>
                      <p
                        className="text-2xl md:text-4xl font-bold tracking-tight opacity-60"
                        style={{ color: project.accent }}
                      >
                        {project.title}
                      </p>
                    </div>

                    {/* Corner accent */}
                    <div
                      className="absolute top-6 right-6 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: project.accent,
                        boxShadow: `0 0 12px ${project.accent}`,
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-2/5 space-y-6">
                  <div>
                    <p
                      className="font-mono text-xs tracking-[0.3em] mb-4"
                      style={{ color: project.accent }}
                    >
                      {project.index} /{" "}
                      {String(PROJECTS.length).padStart(3, "0")}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-xl text-white/50 font-light">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-white/40 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-xs rounded-full border font-mono tracking-wide"
                        style={{
                          borderColor: `${project.accent}33`,
                          color: project.accent,
                          backgroundColor: `${project.accent}0d`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="pt-6 flex items-center gap-6">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-trigger group/link flex items-center gap-3 font-semibold text-white hover:text-white/70 transition-colors"
                    >
                      <Code2 className="w-5 h-5" />
                      <span className="border-b border-white/20 hover:border-white/0 transition-colors pb-px">
                        Source Code
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                          borderColor: project.accent,
                          color: project.accent,
                          backgroundColor: `${project.accent}15`,
                        }}
                      >
                        Live Demo →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-10 py-40 px-6 bg-[#020202] overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll className="mb-24">
          <p className="text-xs font-bold tracking-[0.4em] text-emerald-400 uppercase mb-6">
            04 — Capability Matrix
          </p>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight max-w-3xl">
            A full-spectrum technology arsenal.
          </h2>
        </RevealOnScroll>

        <div className="space-y-3 mb-24">
          {SKILLS.map((skill, i) => (
            <RevealOnScroll key={skill.name} delay={i * 0.04}>
              <div className="group flex items-center gap-6 p-5 rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-500 hover-trigger">
                <div className="w-24 lg:w-40 text-sm font-mono text-white/30 shrink-0">
                  {skill.category}
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-white mb-2">
                    {skill.name}
                  </p>
                  <div className="h-px bg-white/10 overflow-hidden rounded-full">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #67E8F9, #6366f1)",
                        width: `${skill.level}%`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.04,
                      }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <p className="text-sm text-white/25 w-10 text-right shrink-0">
                  {skill.level}%
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Technology grid */}
        <RevealOnScroll>
          <h3 className="text-2xl font-medium text-white/50 mb-10">
            Also proficient in
          </h3>
        </RevealOnScroll>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[
            "Figma",
            "Flutter",
            "MySQL",
            "Redis",
            "AWS",
            "Git",
            "Linux",
            "Tailwind",
            "Socket.io",
            "REST APIs",
            "GraphQL",
            "Vercel",
          ].map((tech, i) => (
            <RevealOnScroll key={tech} delay={i * 0.03}>
              <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] text-center text-sm text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all hover-trigger">
                {tech}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section className="relative z-10 py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll className="mb-24">
          <p className="text-xs font-bold tracking-[0.4em] text-yellow-400 uppercase mb-6">
            05 — Impact &amp; Recognition
          </p>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight">
            Proof of execution.
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((ach, i) => (
            <RevealOnScroll key={ach.title} delay={i * 0.08}>
              <div className="group relative p-10 rounded-3xl border border-white/8 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden hover-trigger">
                {/* Glow accent */}
                <div
                  className="absolute top-0 right-0 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2"
                  style={{ backgroundColor: ach.accent }}
                />

                <div className="relative z-10">
                  <p
                    className="text-xs font-mono tracking-widest mb-6"
                    style={{ color: ach.accent }}
                  >
                    {ach.year}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {ach.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed">{ach.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-40 overflow-hidden bg-black"
    >
      {/* Holographic perspective grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(600px) rotateX(55deg) translateY(-60px)",
          transformOrigin: "center top",
        }}
      />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        <RevealOnScroll>
          <p className="text-xs font-bold tracking-[0.4em] text-cyan-400 uppercase mb-12">
            06 — Initiate Connection
          </p>
        </RevealOnScroll>

        <RevealText>
          <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
            Let&apos;s build
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #67E8F9, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              the future.
            </span>
          </h2>
        </RevealText>

        <RevealOnScroll delay={0.2}>
          <p className="text-xl text-white/40 mb-16 max-w-xl mx-auto leading-relaxed">
            Open to full-time roles, freelance projects, research
            collaborations, and startup ventures. My terminal is always open.
          </p>
        </RevealOnScroll>

        {/* CTA Buttons */}
        <RevealOnScroll
          delay={0.3}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
        >
          <Link
            href="mailto:amulyaa0612@gmail.com"
            className="hover-trigger group flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-base hover:bg-cyan-300 transition-colors"
          >
            <Mail className="w-5 h-5" />
            amulyaa0612@gmail.com
          </Link>
          <Link
            href="https://drive.google.com/file/d/1DS-3ZdG8hDEZ__1hrhaIynOCPl7KGk9p/view?usp=sharing"
            target="_blank"
            className="hover-trigger flex items-center gap-3 px-10 py-5 rounded-full border border-white/20 text-white font-bold text-base hover:border-cyan-400/60 hover:bg-cyan-950/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </Link>
        </RevealOnScroll>

        {/* Social Links */}
        <RevealOnScroll
          delay={0.4}
          className="flex items-center justify-center gap-10"
        >
          <Link
            href="https://github.com/Amu612"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-trigger group flex flex-col items-center gap-3 text-white/30 hover:text-white transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-xs tracking-[0.2em] uppercase">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/amulya-anamdasu-4a11a533b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-trigger group flex flex-col items-center gap-3 text-white/30 hover:text-white transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors">
              <ExternalLink className="w-6 h-6" />
            </div>
            <span className="text-xs tracking-[0.2em] uppercase">LinkedIn</span>
          </Link>
          <Link
            href="mailto:amulyaa0612@gmail.com"
            className="hover-trigger group flex flex-col items-center gap-3 text-white/30 hover:text-white transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs tracking-[0.2em] uppercase">Email</span>
          </Link>
        </RevealOnScroll>

        {/* Footer line */}
        <RevealOnScroll
          delay={0.5}
          className="mt-24 pt-10 border-t border-white/5"
        >
          <p className="text-xs text-white/20 tracking-[0.3em] uppercase">
            Designed &amp; Engineered by Amulya Anamdasu ·{" "}
            {new Date().getFullYear()}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="relative bg-[#050505] overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}
