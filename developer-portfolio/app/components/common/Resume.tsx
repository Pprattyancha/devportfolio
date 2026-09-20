"use client";

import React, { useState } from "react";
// Importing icons from 'react-icons' sub-libraries
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaFolder, 
  FaAward, 
  FaDownload, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaExternalLinkAlt, 
  FaChevronRight, 
  FaTerminal 
} from "react-icons/fa";

// Types
interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

interface Project {
  title: string;
  description: string;
  tech?: string[];
}

interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  skills: {
    languages: string[];
    frameworks: string[];
    lowCode: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  certifications: string[];
}

const resumeData: ResumeData = {
  name: "Prattyancha Patharkar",
  title: "Frontend Lead / Full-Stack Engineer",
  location: "Nagpur, Maharashtra, India",
  email: "prattyancha009@gmail.com",
  phone: "+91-9767309002",
  summary:
    "Frontend Lead with 5+ years of experience in MERN/MEAN stack, building scalable web applications, dashboards, and financial systems. Expert in React, Angular, and Node.js with strong skills in performance optimization, API integration, and engineering leadership.",
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    frameworks: ["React", "Angular", "Node.js", "Express.js", "MongoDB"],
    lowCode: ["Outsystems"],
  },
  experience: [
    {
      role: "Frontend Lead",
      company: "Greenpay Network Pvt. Ltd.",
      period: "Mar 2024 - Present",
      bullets: [
        "Led full-stack development (MERN) of real-time financial dashboards handling 10K+ transactions/day, improving data visibility by 30%.",
        "Architected scalable web applications using React, reducing initial load time by 25%.",
        "Mentored a team of 4+ developers on modern frontend best practices and performance optimization.",
      ],
    },
    {
      role: "Software Developer",
      company: "Thinkonic Software Pvt. Ltd.",
      period: "Aug 2023 - Mar 2024",
      bullets: [
        "Developed data-driven dashboards processing large datasets, achieving a 20% improvement in analytics performance.",
        "Enhanced system scalability by 20% through optimized architecture, robust REST API development, and strategic caching.",
      ],
    },
    {
      role: "Assistant Software Engineer",
      company: "Konverge AI",
      period: "Jun 2021 - Aug 2023",
      bullets: [
        "Built live data dashboards and high-performance UI modules, improving monitoring efficiency by 30%.",
        "Applied user-centered design principles to boost application responsiveness by 25%.",
        "Engineered internal developer tooling to streamline debugging and system health monitoring.",
      ],
    },
  ],
  projects: [
    {
      title: "FinPay App",
      description:
        "Secure B2B financial application featuring JWT authentication and end-to-end encrypted transaction workflows.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    },
    {
      title: "MLStream Visualizer",
      description:
        "Real-time monitoring dashboard for tracking machine learning metrics, featuring AI/LLM integration.",
      tech: ["React", "TypeScript", "Python", "REST API"],
    },
    {
      title: "UrbanData Map",
      description:
        "Traffic analytics platform delivering actionable insights through dynamic, interactive data visualizations.",
      tech: ["React", "Data Viz", "JavaScript", "CSS3"],
    },
  ],
  education: [
    {
      degree: "M.Sc. in Computer Application",
      institution: "Fergusson College",
      period: "Aug 2019 - June 2021",
    },
  ],
  certifications: [
    "MERN Stack Front to Back - Udemy",
    "Advance React Redux - Udemy",
    "JavaScript Basics for Beginners - Udemy",
    "Python 3 Programming - Udemy",
    "Problem Solving Basics - HackerRank",
  ],
};

export default function ResumeUI() {
  const [activeTab, setActiveTab] = useState<
    "experience" | "skills" | "projects" | "education"
  >("experience");

  return (
    <section className="min-h-screen bg-[#0a0d14] text-slate-200 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Profile Section */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 p-8 border border-slate-800 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
                <FaTerminal className="w-3.5 h-3.5" /> MERN / MEAN Specialist
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {resumeData.name}
              </h1>
              <p className="text-lg text-blue-400 font-medium">
                {resumeData.title}
              </p>
              
              {/* Contact Grid */}
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="w-3.5 h-3.5 text-slate-500" />
                  {resumeData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaEnvelope className="w-3.5 h-3.5 text-slate-500" />
                  <a href={`mailto:${resumeData.email}`} className="hover:text-blue-400 transition-colors">
                    {resumeData.email}
                  </a>
                </span>
                <span className="flex items-center gap-1.5">
                  <FaPhoneAlt className="w-3.5 h-3.5 text-slate-500" />
                  {resumeData.phone}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <FaDownload className="w-3.5 h-3.5" /> Download CV
            </a>
          </div>

          <hr className="my-6 border-slate-800" />

          {/* Professional Summary */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
            {resumeData.summary}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: "experience", label: "Work Experience", icon: FaBriefcase },
            { id: "skills", label: "Technical Skills", icon: FaCode },
            { id: "projects", label: "Featured Projects", icon: FaFolder },
            { id: "education", label: "Education & Certs", icon: FaGraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
          
          {/* 1. WORK EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 sm:pl-8 space-y-10">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 p-6 rounded-xl transition-all shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/50 w-fit">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-sm text-slate-300">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <FaChevronRight className="w-3 h-3 text-blue-500 shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. TECHNICAL SKILLS */}
          {activeTab === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FaCode className="w-4 h-4 text-blue-400" /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.languages.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800/80 text-blue-300 border border-slate-700/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FaTerminal className="w-4 h-4 text-blue-400" /> Frontend & Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.frameworks.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800/80 text-blue-300 border border-slate-700/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FaAward className="w-4 h-4 text-blue-400" /> Low-Code / Platform
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.lowCode.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800/80 text-blue-300 border border-slate-700/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. PROJECTS */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resumeData.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="group bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 p-6 rounded-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                        {proj.title}
                      </h3>
                      <FaExternalLinkAlt className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {proj.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                      {proj.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/50 text-blue-400 border border-blue-900/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 4. EDUCATION & CERTIFICATIONS */}
          {activeTab === "education" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Education */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FaGraduationCap className="w-4 h-4 text-blue-400" /> Education
                </h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-200">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-blue-400">{edu.institution}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FaAward className="w-4 h-4 text-blue-400" /> Certifications
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {resumeData.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}