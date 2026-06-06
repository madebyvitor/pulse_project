"use client";

import { Globe, Triangle } from "lucide-react";

const logos = [
  {
    name: "GitHub",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  { name: "Vercel", icon: <Triangle className="w-5 h-5" /> },
  { name: "Netlify", icon: <Globe className="w-5 h-5" /> },
  {
    name: "GitLab",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.28 9.77a5.83 5.83 0 0 0-.5-4.79 5.9 5.9 0 0 0-6.36-2.83A5.83 5.83 0 0 0 11 .54a5.9 5.9 0 0 0-5.63 4.1 5.83 5.83 0 0 0-3.9 2.83 5.9 5.9 0 0 0 .72 6.94 5.83 5.83 0 0 0 .5 4.79 5.9 5.9 0 0 0 6.36 2.83A5.83 5.83 0 0 0 13 23.46a5.91 5.91 0 0 0 5.63-4.1 5.83 5.83 0 0 0 3.9-2.83 5.9 5.9 0 0 0-.72-6.94l.47.18zm-9.28 9.84a4.37 4.37 0 0 1-2.81-1.02l.14-.08 4.66-2.69a.76.76 0 0 0 .39-.67v-6.57l1.97 1.14a.07.07 0 0 1 .04.05v5.44a4.4 4.4 0 0 1-4.39 4.4zM4.37 17.77a4.37 4.37 0 0 1-.52-2.95l.14.08 4.66 2.69a.77.77 0 0 0 .77 0l5.69-3.29v2.28a.08.08 0 0 1-.03.06L10.32 19a4.4 4.4 0 0 1-5.95-1.23zm-.87-9.64a4.36 4.36 0 0 1 2.28-1.92v5.52a.77.77 0 0 0 .39.67l5.69 3.28-1.97 1.14a.07.07 0 0 1-.07 0L5.14 14.1a4.4 4.4 0 0 1-1.64-6zm16.17 3.78-5.69-3.28 1.97-1.14a.07.07 0 0 1 .07 0l4.68 2.7a4.38 4.38 0 0 1-.68 7.91v-5.52a.77.77 0 0 0-.35-.67zm1.96-2.96-.14-.08-4.66-2.69a.77.77 0 0 0-.77 0L11.37 9.5V7.22a.07.07 0 0 1 .03-.06L16.18 5a4.39 4.39 0 0 1 5.45 5.95zM10.35 13l-1.97-1.14a.07.07 0 0 1-.04-.05V6.37a4.39 4.39 0 0 1 7.2-3.37l-.14.08-4.66 2.69a.77.77 0 0 0-.39.67zm1.07-2.3 2.53-1.46 2.53 1.46v2.92l-2.53 1.46-2.53-1.46z" />
      </svg>
    ),
  },
];

export function Integrations() {
  return (
    <section className="py-12 md:py-20 border-y border-zinc-900">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <p className="mb-12 text-sm font-medium text-center uppercase tracking-widest text-zinc-600">
          Integre com as ferramentas que você já usa
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 md:grid-cols-5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center gap-3 text-white cursor-default group"
            >
              {logo.icon}
              <span className="font-semibold tracking-tight text-sm hidden sm:block">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
