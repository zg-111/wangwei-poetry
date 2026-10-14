'use client';

import { use } from 'react';
import Link from 'next/link';
import { poems } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PoemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const poem = poems.find((p) => p.id === id);

  if (!poem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F5F0E6]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-scrolled">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path
                d="M10 3 L5 8 L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm tracking-wider">返回首页</span>
          </Link>
          <span className="text-[#7B8B9A] text-xs tracking-[0.2em]">
            王维山水诗
          </span>
        </div>
      </nav>

      {/* Content */}
      <article className="pt-24 pb-16 px-6 relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 right-0 w-full opacity-[0.02]"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 400 L0 300 Q200 200 400 260 Q600 160 800 220 Q1000 120 1200 200 Q1350 160 1440 200 L1440 400 Z"
              fill="#2C2C2C"
            />
          </svg>
          {/* faint bamboo at top-right */}
          <svg
            className="absolute top-28 right-0 w-48 opacity-[0.05]"
            viewBox="0 0 200 400"
            fill="none"
          >
            <path d="M120 400 C115 300 125 220 118 100 L120 0 L124 0 C130 220 128 300 130 400 Z" fill="#2C2C2C" />
            <path d="M118 200 C90 195 70 185 55 170 M118 200 C108 188 98 178 92 164 M118 300 C140 292 155 280 168 262 M118 300 C128 288 136 276 142 260" stroke="#2C2C2C" strokeWidth="3" />
          </svg>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Title area */}
          <header className="text-center mb-20 pt-8">
            <div className="ink-divider mb-10" />
            <h1 className="ink-title text-3xl md:text-4xl mb-6">
              {poem.title}
            </h1>
            <p className="text-[#7B8B9A] text-sm tracking-[0.3em]">
              唐 · 王维
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-6 h-px bg-[#C8C0B0]" />
            </div>
          </header>

          {/* Poem content - scroll paper style */}
          <section className="mb-20">
            <div className="poem-paper p-8 md:p-14">
              <div className="text-center">
                {poem.content.split('\n').map((line, idx) => (
                  <p
                    key={idx}
                    className="ink-poem text-lg md:text-xl mb-4 last:mb-0"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Content sections */}
          <div className="space-y-14">
            {/* Translation */}
            <section>
              <h2 className="ink-title text-base md:text-lg mb-6 flex items-center gap-3 section-head">
                <span className="title-seal">译</span>
                白话译文
              </h2>
              <p className="text-[#5A5A5A] leading-loose text-sm md:text-base pl-9">
                {poem.translation}
              </p>
            </section>

            {/* Imagery */}
            <section>
              <h2 className="ink-title text-base md:text-lg mb-6 flex items-center gap-3 section-head">
                <span className="title-seal">境</span>
                诗歌意境
              </h2>
              <p className="text-[#5A5A5A] leading-loose text-sm md:text-base pl-9">
                {poem.imagery}
              </p>
            </section>

            {/* Appreciation */}
            <section>
              <h2 className="ink-title text-base md:text-lg mb-6 flex items-center gap-3 section-head">
                <span className="title-seal">赏</span>
                赏析
              </h2>
              <p className="text-[#5A5A5A] leading-loose text-sm md:text-base pl-9">
                {poem.appreciation}
              </p>
            </section>
          </div>

          {/* Famous lines */}
          <section className="mt-20 mb-20">
            <h2 className="ink-title text-base md:text-lg mb-8 flex items-center gap-3 section-head">
              <span className="title-seal">句</span>
              名句赏析
            </h2>
            <div className="space-y-6">
              {poem.famousLines.map((item, idx) => (
                <div key={idx} className="ink-card p-6 md:p-8">
                  <p className="ink-poem text-base md:text-lg mb-5 text-center">
                    {item.line}
                  </p>
                  <div className="w-8 h-px bg-[#C8C0B0] mx-auto mb-5" />
                  <p className="text-[#5A5A5A] leading-relaxed text-sm">
                    {item.analysis}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Navigation to other poems */}
          <section className="border-t border-[#C8C0B0]/40 pt-10">
            <p className="text-[#7B8B9A] text-xs text-center mb-8 tracking-[0.2em]">
              继续阅读其他诗作
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {poems
                .filter((p) => p.id !== id)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/poem/${p.id}`}
                    className="ink-btn text-xs py-2 px-4"
                  >
                    {p.title}
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-10 px-6 text-center border-t border-[#C8C0B0]/30">
        <p className="text-[#7B8B9A] text-xs tracking-[0.2em]">
          诗中有画，画中有诗。
        </p>
      </footer>
    </main>
  );
}
