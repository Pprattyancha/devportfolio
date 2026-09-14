"use client";

import { useState } from "react";
import Link from "next/link";

import { contact } from "@/app/data/contact";
import { BackgroundImage } from "../common/BackgroundImage";
import { PortfolioChat } from "../ui/PortfolioChat";
import { SocialLinks } from "../ui/SocialLinks";

export function Contact() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-6 md:px-12 md:py-20"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <BackgroundImage
          src="/imglogo.png"
          alt=""
          priority
          objectPosition="center"
          fit="cover"
          className="opacity-55"
        />
      </div>

      {/* ================= DARK OVERLAY ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/50"
      />

      {/* ================= GRADIENT OVERLAY ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-black/80
          via-black/30
          to-black/90
        "
      />

      {/* ================= CENTER BLUE GLOW ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[3]
          h-96
          w-96
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/15
          blur-3xl
        "
      />

      {/* ================= RIGHT BLUE GLOW ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
          z-[3]
          h-72
          w-72
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Let's build something great.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Have a project, opportunity or idea you'd like to discuss? Feel free
            to reach out. I'm always open to interesting conversations and new
            opportunities.
          </p>
        </div>

        {/* Contact Content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* ================= CONTACT DETAILS ================= */}
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-black/45
              p-8
              backdrop-blur-sm
              transition
              duration-300
              hover:border-blue-400/30
              hover:bg-blue-950/20
            "
          >
            <h3 className="text-xl font-semibold text-white">Get in touch</h3>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Email
                </p>

                <a
                  href={`mailto:${contact.email}`}
                  className="
                    mt-2
                    inline-block
                    text-lg
                    text-gray-300
                    transition
                    hover:text-blue-400
                  "
                >
                  {contact.email}
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Phone
                </p>

                <a
                  href={`tel:${contact.phone}`}
                  className="
                    mt-2
                    inline-block
                    text-lg
                    text-gray-300
                    transition
                    hover:text-blue-400
                  "
                >
                  {contact.phone}
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Location
                </p>

                <p className="mt-2 text-lg text-gray-300">{contact.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="
                mt-10
                flex
                gap-5
                border-t
                border-white/10
                pt-6
              "
            >
              <SocialLinks showContact={false}/>
            </div>
          </div>

          {/* ================= CTA CARD ================= */}
          <div
            className="
              flex
              flex-col
              justify-between
              rounded-3xl
              border
              border-white/10
              bg-black/45
              p-8
              backdrop-blur-sm
              transition
              duration-300
              hover:border-blue-400/30
              hover:bg-blue-950/20
            "
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Available for
              </p>

              <h3 className="mt-4 text-3xl font-semibold text-white">
                Freelance & Full-Time Opportunities
              </h3>

              <p className="mt-5 leading-7 text-gray-400">
                I'm interested in working on challenging projects involving
                modern web technologies, scalable systems and great user
                experiences.
              </p>
            </div>

            {/* Start Conversation */}
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className="
    group
    relative
    inline-flex
    w-full
    items-center
    justify-center
    rounded-full
    bg-white
    px-7
    py-4
    font-semibold
    text-black
    transition-all
    duration-300

    animate-[bounce_2.5s_ease-in-out_infinite]

    hover:scale-[1.04]
    hover:bg-gray-200
    hover:animate-none
  "
              >
                {/* Glow */}
                <span
                  className="
      absolute
      inset-0
      -z-10
      rounded-full
      bg-blue-500/40
      blur-xl
      opacity-70
      transition
      duration-300
      group-hover:opacity-100
      group-hover:scale-110
    "
                />

                <span className="relative flex items-center gap-2">
                  Start a Conversation
                  <span
                    className="
        inline-block
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
                  >
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= AI CHAT ================= */}
      {chatOpen && <PortfolioChat onClose={() => setChatOpen(false)} />}
    </section>
  );
}
