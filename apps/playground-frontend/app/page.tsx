import React from "react";
import Link from "next/link";

export default function Home(): React.ReactElement {
  const techList: string[] = [
    "Next.js",
    "TypeScript",
    "WebSockets",
    "Prisma",
    "PostgreSQL",
    "Turborepo",
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12 bg-gradient-to-b from-[#0f172a] to-[#071032] text-[#e6eef8] font-sans">
      <section className="w-full max-w-[980px] bg-gradient-to-b from-white/5 to-white/1 rounded-xl p-9 shadow-[0_10px_30px_rgba(2,6,23,0.6)] border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-6 items-start">
          <div>
            <div className="inline-block bg-white/5 px-3 py-1 rounded-full text-sm text-sky-100 mb-3">
              PlayGround
            </div>

            <h1 className="text-3xl md:text-4xl leading-tight text-white font-semibold mb-3">
              Real-time Collaborative Whiteboard & Chat
            </h1>

            <p className="text-sky-100/90 mb-5">
              A collaborative whiteboard and chat app where multiple users draw,
              message, and interact in real time. Built with Next.js,
              TypeScript, Prisma and WebSockets inside a Turborepo monorepo.
            </p>

            <div>
              <Link
                href="/getting-started"
                aria-label="Get started"
                className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-400 text-white py-3 px-5 rounded-lg font-semibold no-underline"
              >
                Get Started
              </Link>

              <Link
                href="/docs"
                aria-label="Documentation"
                className="inline-block bg-transparent text-sky-100 border border-white/6 py-2.5 px-4 ml-3 rounded-lg no-underline"
              >
                Documentation
              </Link>
            </div>

            <div className="mt-6">
              <strong className="text-[#e6eef8] block mb-2">Highlights</strong>
              <ul className="mt-3 text-sky-100 space-y-2 list-inside">
                <li>Real-time drawing and messaging with low-latency WebSockets</li>
                <li>Persistent, type-safe storage using Prisma + PostgreSQL</li>
                <li>Monorepo with Turborepo remote caching to speed up builds</li>
                <li>Shared UI and backend packages for consistent DX</li>
              </ul>
            </div>
          </div>

          <aside className="p-4 rounded-lg bg-white/5">
            <strong className="block mb-2">Tech Stack</strong>

            <div className="grid gap-3 mt-3">
              {techList.map((t) => (
                <div
                  key={t}
                  className="px-2 py-2 rounded-md bg-white/2 text-sm"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <strong className="block mb-2">Quick Start</strong>
              <pre className="bg-black/30 p-3 rounded-md text-sm whitespace-pre-wrap">
{`pnpm install
pnpm prisma migrate dev --cwd packages/db
pnpm dev`}
              </pre>
            </div>
          </aside>
        </div>

        <footer className="mt-7 text-[#98b9ef] text-sm">
          Built with Next.js, TypeScript, WebSockets and Prisma. Turborepo remote
          caching reduces build time by ~50%.
        </footer>
      </section>
    </main>
  );
}
