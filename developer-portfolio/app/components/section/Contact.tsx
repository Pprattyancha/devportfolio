import { contact } from "@/app/data/contact";
import Link from "next/link";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32"
    >
      {/* Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      {/* Additional subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
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
          {/* Contact Details */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xl font-semibold text-white">Get in touch</h3>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Email
                </p>

                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 inline-block text-lg text-gray-300 transition hover:text-blue-400"
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
                  className="mt-2 inline-block text-lg text-gray-300 transition hover:text-blue-400"
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
            <div className="mt-10 flex gap-5 border-t border-white/10 pt-6">
              <Link
                href={contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                GitHub ↗
              </Link>

              <Link
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                LinkedIn ↗
              </Link>
            </div>
          </div>

          {/* CTA Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8">
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

            <div className="mt-10">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-gray-200"
              >
                Start a Conversation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
