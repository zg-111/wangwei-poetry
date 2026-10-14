'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { poems, imageryList, randomLines } from '@/lib/data';

/* ============================================================
   SVG Decorations
   ============================================================ */
function InkMountainsHero() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
      viewBox="0 0 1440 500"
      preserveAspectRatio="none"
      fill="none"
      style={{ height: '45%' }}
    >
      {/* Farthest mountains - hint */}
      <path
        d="M0 500 L0 260 Q160 140 340 200 Q520 100 700 180 Q880 90 1060 170 Q1240 120 1440 190 L1440 500 Z"
        fill="#7B8B9A"
        opacity="0.045"
      />
      {/* Far mountains - lightest */}
      <path
        d="M0 500 L0 300 Q100 200 200 260 Q300 160 420 220 Q520 120 650 200 Q750 80 880 180 Q980 60 1100 160 Q1200 100 1320 180 Q1400 140 1440 200 L1440 500 Z"
        fill="#7B8B9A"
        opacity="0.07"
      />
      {/* Mid mountains */}
      <path
        d="M0 500 L0 350 Q160 260 320 310 Q480 220 640 290 Q800 200 960 270 Q1120 220 1280 280 Q1380 250 1440 290 L1440 500 Z"
        fill="#5A5A5A"
        opacity="0.05"
      />
      {/* Near mountains - darkest */}
      <path
        d="M0 500 L0 400 Q200 340 400 380 Q600 320 800 370 Q1000 330 1200 360 Q1350 340 1440 370 L1440 500 Z"
        fill="#2C2C2C"
        opacity="0.04"
      />
      {/* Mist layers */}
      <ellipse cx="300" cy="380" rx="250" ry="20" fill="#F5F0E6" opacity="0.6" />
      <ellipse cx="900" cy="350" rx="300" ry="15" fill="#F5F0E6" opacity="0.5" />
      <ellipse cx="1200" cy="400" rx="200" ry="12" fill="#F5F0E6" opacity="0.4" />
    </svg>
  );
}

function BambooSVG({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      width="60"
      height="280"
      viewBox="0 0 60 280"
      fill="none"
      opacity="0.06"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M30 0 L30 280" stroke="#2C2C2C" strokeWidth="1.5" />
      <path d="M30 30 Q42 40 38 55" stroke="#2C2C2C" strokeWidth="1" fill="none" />
      <path d="M30 70 Q18 80 22 95" stroke="#2C2C2C" strokeWidth="1" fill="none" />
      <path d="M30 120 Q42 130 38 145" stroke="#2C2C2C" strokeWidth="1" fill="none" />
      <path d="M30 170 Q18 180 22 195" stroke="#2C2C2C" strokeWidth="1" fill="none" />
      <path d="M30 220 Q42 230 38 245" stroke="#2C2C2C" strokeWidth="1" fill="none" />
      {/* Leaves */}
      <path d="M38 45 Q48 38 52 48 Q45 52 38 45Z" fill="#2C2C2C" opacity="0.5" />
      <path d="M22 85 Q12 78 8 88 Q15 92 22 85Z" fill="#2C2C2C" opacity="0.5" />
      <path d="M38 135 Q48 128 52 138 Q45 142 38 135Z" fill="#2C2C2C" opacity="0.5" />
      <path d="M22 185 Q12 178 8 188 Q15 192 22 185Z" fill="#2C2C2C" opacity="0.5" />
      <path d="M38 235 Q48 228 52 238 Q45 242 38 235Z" fill="#2C2C2C" opacity="0.5" />
    </svg>
  );
}

function WaterFlowSVG({ className }: { className?: string }) {
  return (
    <svg className={className} width="200" height="40" viewBox="0 0 200 40" fill="none" opacity="0.04">
      <path d="M0 20 Q25 10 50 20 Q75 30 100 20 Q125 10 150 20 Q175 30 200 20" stroke="#2C2C2C" strokeWidth="1" fill="none" />
      <path d="M0 28 Q25 18 50 28 Q75 38 100 28 Q125 18 150 28 Q175 38 200 28" stroke="#2C2C2C" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

/* Imagery icons */
function ImageryIcon({ id }: { id: string }) {
  const iconClass = "w-10 h-10 md:w-12 md:h-12";
  switch (id) {
    case 'kong-shan':
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none">
          <path d="M4 40 L16 16 L24 28 L32 12 L44 40" stroke="#7B8B9A" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M8 40 L18 22 L26 32 L36 18 L44 40" stroke="#7B8B9A" strokeWidth="0.6" fill="none" opacity="0.3" />
        </svg>
      );
    case 'ming-yue':
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="14" stroke="#7B8B9A" strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="24" cy="24" r="10" stroke="#7B8B9A" strokeWidth="0.5" fill="none" opacity="0.2" />
          <circle cx="24" cy="24" r="18" stroke="#7B8B9A" strokeWidth="0.3" fill="none" opacity="0.15" />
        </svg>
      );
    case 'zhu-lin':
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none">
          <path d="M16 4 L16 44" stroke="#7B8B9A" strokeWidth="1" opacity="0.5" />
          <path d="M24 8 L24 44" stroke="#7B8B9A" strokeWidth="1" opacity="0.6" />
          <path d="M32 6 L32 44" stroke="#7B8B9A" strokeWidth="1" opacity="0.4" />
          <path d="M16 16 Q22 12 24 18" stroke="#7B8B9A" strokeWidth="0.6" fill="none" opacity="0.4" />
          <path d="M24 24 Q30 20 32 26" stroke="#7B8B9A" strokeWidth="0.6" fill="none" opacity="0.4" />
          <path d="M16 30 Q10 26 8 32" stroke="#7B8B9A" strokeWidth="0.6" fill="none" opacity="0.3" />
        </svg>
      );
    case 'qing-quan':
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none">
          <path d="M4 24 Q12 18 20 24 Q28 30 36 24 Q40 21 44 24" stroke="#7B8B9A" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M4 30 Q12 24 20 30 Q28 36 36 30 Q40 27 44 30" stroke="#7B8B9A" strokeWidth="0.6" fill="none" opacity="0.3" />
          <circle cx="14" cy="20" r="2" fill="#7B8B9A" opacity="0.15" />
          <circle cx="34" cy="20" r="1.5" fill="#7B8B9A" opacity="0.1" />
        </svg>
      );
    case 'niao-ming':
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none">
          <path d="M12 28 Q16 20 20 24 Q24 18 28 22" stroke="#7B8B9A" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M28 22 L32 20 L30 24" stroke="#7B8B9A" strokeWidth="0.8" fill="none" opacity="0.4" />
          <path d="M34 16 Q36 14 38 16 Q40 14 42 16" stroke="#7B8B9A" strokeWidth="0.6" fill="none" opacity="0.3" />
          <path d="M8 34 Q12 30 16 34" stroke="#7B8B9A" strokeWidth="0.5" fill="none" opacity="0.2" />
        </svg>
      );
    case 'qiu-se':
      return (
        <svg className={iconClass} viewBox="0 0 48 48" fill="none">
          <path d="M24 8 Q20 16 24 24 Q28 16 24 8Z" stroke="#7B8B9A" strokeWidth="0.8" fill="#7B8B9A" fillOpacity="0.08" />
          <path d="M24 24 L24 40" stroke="#7B8B9A" strokeWidth="0.8" opacity="0.4" />
          <path d="M18 18 Q22 14 24 18" stroke="#7B8B9A" strokeWidth="0.5" fill="none" opacity="0.3" />
          <path d="M30 18 Q26 14 24 18" stroke="#7B8B9A" strokeWidth="0.5" fill="none" opacity="0.3" />
          <path d="M14 36 Q18 32 22 36" stroke="#7B8B9A" strokeWidth="0.4" fill="none" opacity="0.2" />
          <path d="M26 38 Q30 34 34 38" stroke="#7B8B9A" strokeWidth="0.4" fill="none" opacity="0.2" />
        </svg>
      );
    default:
      return null;
  }
}

/* ============================================================
   Intersection Observer Hook
   ============================================================ */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return ref;
}

function FadeInSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}

/* ============================================================
   Navigation Bar
   ============================================================ */
const navItems = [
  { label: '首页', href: '#hero' },
  { label: '诗人小传', href: '#poet' },
  { label: '代表诗作', href: '#poems' },
  { label: '诗中意象', href: '#imagery' },
  { label: '随机诗句', href: '#random' },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Detect active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="ink-title text-sm md:text-base cursor-pointer bg-transparent border-none"
        >
          诗中有画
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`nav-link bg-transparent border-none cursor-pointer ${
                activeSection === item.href.slice(1) ? 'active' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden bg-transparent border-none cursor-pointer w-11 h-11 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen ? (
              <>
                <path d="M4 4 L16 16" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 4 L4 16" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M3 6 L17 6" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 10 L17 10" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 14 L17 14" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${mobileOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}
      >
        <div className="px-4 sm:px-6 py-3 bg-[#F5F0E6]/95 backdrop-blur-sm border-t border-[#C8C0B0]/30 shadow-[0_12px_30px_rgba(44,44,44,0.06)]">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`block w-full text-left py-3 nav-link bg-transparent border-none cursor-pointer ${
                activeSection === item.href.slice(1) ? 'active' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   Section: Hero
   ============================================================ */
function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-mobile-safe relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 pb-24"
    >
      {/* Moon */}
      <div className="absolute top-20 right-8 md:top-28 md:right-32">
        <div className="relative">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#F5F0E6] via-[#EDE8DA] to-[#F5F0E6] opacity-60" />
          <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 rounded-full" style={{
            boxShadow: '0 0 80px 30px rgba(237, 232, 218, 0.4), 0 0 120px 60px rgba(237, 232, 218, 0.15)',
          }} />
        </div>
      </div>

      {/* Bamboo */}
      <BambooSVG className="absolute left-2 top-1/4 hidden md:block" />
      <BambooSVG className="absolute right-2 top-1/3 hidden md:block" flip />

      {/* Water flow at bottom */}
      <WaterFlowSVG className="absolute bottom-32 left-1/4 hidden md:block" />

      {/* Main content — editorial split layout */}
      <div className="hero-editorial relative z-10 w-full max-w-6xl mx-auto">
        <div className="hero-copy">
          <p className="hero-kicker">唐 · 山水田园</p>
          <h1 className="ink-title text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-tight hero-title">
            诗中有画
          </h1>
          <p className="ink-subtitle text-xs sm:text-sm md:text-base hero-subtitle">
            王维的山水诗世界
          </p>
          <p className="hero-intro">
            沿着空山、明月与清泉，进入王维笔下安静而辽阔的山水世界。
          </p>
        </div>

        <aside className="hero-verse-panel verse-animate" aria-label="王维代表诗句">
          <span className="hero-panel-label">山居秋暝</span>
          <p className="ink-poem text-xl md:text-2xl tracking-wider">
            明月松间照，<br />清泉石上流。
          </p>
          <div className="hero-panel-rule" />
          <p className="hero-panel-note">光与声，一静一动；十字之间，自成一幅山水。</p>
          <div className="ink-seal">摩诘</div>
        </aside>
      </div>

      {/* Mountains */}
      <InkMountainsHero />

      {/* Scroll cue - 题签式设计 */}
      <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2">
        <div className="scroll-cue">
          <span>向下探索</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="cue-arrow">
            <path
              d="M2 4 L6 8 L10 4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Section: Poet Introduction
   ============================================================ */
function PoetSection() {
  return (
    <section id="poet" className="section-flow py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <FadeInSection>
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="editorial-heading editorial-left mb-12 md:mb-14">
            <h2 className="ink-title text-2xl md:text-3xl mb-4 section-title">
              <span className="title-line" />
              诗人小传
              <span className="title-line right" />
            </h2>
            <p className="ink-quote-sub text-sm mt-4">
              静观万物，自成诗境
            </p>
            <div className="ink-divider mt-6" />
          </div>

          {/* Content layout: left silhouette + right text */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center mb-10 md:mb-14">
            {/* Silhouette area */}
            <div className="flex-shrink-0 flex flex-col items-center gap-5 poet-figure">
              {/* Poet silhouette - 水墨文人半身剪影 */}
              <div className="poet-figure-frame">
                <svg width="150" height="190" viewBox="0 0 150 190" fill="none" className="poet-silhouette">
                  {/* 淡远山 */}
                  <path
                    d="M12 168 L36 118 L58 152 L78 122 L52 168Z"
                    stroke="#7B8B9A"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.28"
                  />
                  <path
                    d="M78 168 L100 132 L124 162 L140 140 L118 168Z"
                    stroke="#7B8B9A"
                    strokeWidth="0.7"
                    fill="none"
                    opacity="0.22"
                  />
                  {/* 文人半身剪影 */}
                  <path
                    d="M75 40 C 75 30, 88 30, 88 40 L 88 46 C 96 49, 101 56, 101 64 L 101 74 L 94 88 L 92 102 C 92 110, 84 114, 84 122 L 84 130 L 92 136 L 92 140 L 60 140 L 60 136 L 68 130 L 68 122 C 68 114, 60 110, 60 102 L 58 88 L 51 74 L 51 64 C 51 56, 56 49, 64 46 L 64 40 C 64 30, 75 30, 75 40 Z"
                    fill="#2C2C2C"
                  />
                  {/* 高冠 */}
                  <path
                    d="M68 40 L 70 24 C 71 16, 81 16, 82 24 L 84 40 Z"
                    fill="#2C2C2C"
                  />
                  <path d="M66 26 L 86 26" stroke="#2C2C2C" strokeWidth="1.4" />
                  {/* 袍身衣纹 */}
                  <path d="M60 108 C 68 116, 84 116, 92 108" stroke="#F5F0E6" strokeWidth="0.9" opacity="0.5" fill="none" />
                  <path d="M62 118 C 70 124, 82 124, 90 118" stroke="#F5F0E6" strokeWidth="0.7" opacity="0.4" fill="none" />
                  {/* 竹枝 */}
                  <path d="M128 40 L 128 138" stroke="#7B8B9A" strokeWidth="1" opacity="0.35" />
                  <path d="M128 60 Q 134 66 131 72" stroke="#7B8B9A" strokeWidth="0.7" opacity="0.3" fill="none" />
                  <path d="M128 90 Q 121 96 124 102" stroke="#7B8B9A" strokeWidth="0.7" opacity="0.3" fill="none" />
                  {/* 松石 */}
                  <ellipse cx="22" cy="150" rx="10" ry="6" stroke="#7B8B9A" strokeWidth="0.7" opacity="0.25" fill="none" />
                  <path d="M22 150 L 22 132 Q 24 128 27 132 L 26 150" stroke="#7B8B9A" strokeWidth="0.7" opacity="0.28" fill="none" />
                </svg>
              </div>
              {/* Seal - 人物落款 */}
              <div className="ink-seal-lg">王维</div>
            </div>

            {/* Text content */}
            <div className="flex-1 text-center md:text-left">
              <div className="space-y-4 md:space-y-5 text-[#5A5A5A] leading-loose text-sm sm:text-base">
                <p>
                  王维（701—761），字摩诘。唐代诗人、画家，被尊为&ldquo;诗佛&rdquo;，与孟浩然并称&ldquo;王孟&rdquo;。
                </p>
                <p>
                  他精研佛理，诗多写山水田园——以自然之景写内心之境，在空寂中见灵动，于平淡处见深远。
                </p>
                <p>
                  笔下的远山、明月、清泉、竹影，皆成画境。一诗一画，诗画交融。
                </p>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-3 mt-7 justify-center md:justify-start">
                {['诗佛', '山水田园', '诗中有画'].map((tag) => (
                  <span key={tag} className="ink-seal-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quote block - Su Shi's evaluation */}
          <FadeInSection>
            <figure className="ink-quote max-w-2xl mx-auto">
              <p className="ink-poem text-base md:text-lg text-center leading-relaxed">
                味摩诘之诗，诗中有画；
                <br />
                观摩诘之画，画中有诗。
              </p>
              <figcaption className="text-[#7B8B9A] text-sm text-center mt-4 tracking-[0.25em] flex items-center justify-center gap-2">
                <span className="w-4 h-px bg-[#C8C0B0]" />
                <span>苏轼</span>
                <span className="w-4 h-px bg-[#C8C0B0]" />
              </figcaption>
            </figure>
          </FadeInSection>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Section: Poem Cards
   ============================================================ */
function PoemsSection() {
  // 每首诗的淡墨图形（置于卡片角落）
  const poemArt: Record<string, React.ReactNode> = {
    'shan-ju-qiu-ming': (
      // 山与泉
      <svg className="poem-art top-0 right-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M20 110 L48 40 L66 74 L84 36 L108 110Z" stroke="#2C2C2C" strokeWidth="1" fill="none" />
        <path d="M30 88 Q48 78 66 84 Q84 72 100 80" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
        <path d="M30 96 Q48 86 66 92 Q84 80 100 88" stroke="#2C2C2C" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    'lu-zhai': (
      // 空山与回声纹
      <svg className="poem-art top-0 right-0" width="110" height="110" viewBox="0 0 110 110" fill="none">
        <path d="M20 100 L52 46 L78 78 L96 54 L104 100Z" stroke="#2C2C2C" strokeWidth="1" fill="none" />
        <path d="M48 96 Q60 88 68 78" stroke="#2C2C2C" strokeWidth="0.6" fill="none" />
        <path d="M50 102 Q62 94 72 84" stroke="#2C2C2C" strokeWidth="0.4" fill="none" />
      </svg>
    ),
    'zhu-li-guan': (
      // 竹叶
      <svg className="poem-art top-0 right-0" width="110" height="130" viewBox="0 0 110 130" fill="none">
        <path d="M30 6 L30 124" stroke="#2C2C2C" strokeWidth="1.2" />
        <path d="M64 14 L64 124" stroke="#2C2C2C" strokeWidth="1" opacity="0.8" />
        <path d="M30 40 Q 44 44 42 56" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
        <path d="M30 82 Q 18 88 20 100" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
        <path d="M64 66 Q 78 70 76 82" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
        <path d="M42 50 Q 50 46 52 54 Q 46 56 40 52 Z" fill="#2C2C2C" />
        <path d="M20 94 Q 12 90 10 98 Q 16 100 22 97 Z" fill="#2C2C2C" />
      </svg>
    ),
    'niao-ming-jian': (
      // 飞鸟与桂花
      <svg className="poem-art top-0 right-0" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M28 60 Q 40 42 56 52 Q 68 38 84 50" stroke="#2C2C2C" strokeWidth="1" fill="none" />
        <path d="M84 50 L 96 46 L 90 56" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
        <circle cx="76" cy="84" r="3" stroke="#2C2C2C" strokeWidth="0.6" />
        <circle cx="90" cy="96" r="2" stroke="#2C2C2C" strokeWidth="0.5" />
        <path d="M92 30 Q 96 38 92 46" stroke="#2C2C2C" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    'zhong-nan-bie-ye': (
      // 云山
      <svg className="poem-art top-0 right-0" width="130" height="110" viewBox="0 0 130 110" fill="none">
        <path d="M14 100 L34 58 L50 80 L66 40 L84 66 L96 50 L112 100Z" stroke="#2C2C2C" strokeWidth="1" fill="none" />
        <path d="M40 62 Q52 56 62 60" stroke="#2C2C2C" strokeWidth="0.7" fill="none" />
        <path d="M72 52 Q82 46 94 50" stroke="#2C2C2C" strokeWidth="0.7" fill="none" />
        <path d="M24 100 Q40 92 60 96 Q80 90 104 96" stroke="#2C2C2C" strokeWidth="0.5" fill="none" />
      </svg>
    ),
  };

  return (
    <section id="poems" className="section-flow py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 0 L100 100 L0 100Z" fill="url(#grid)" />
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0 L0 0 L0 10" fill="none" stroke="#2C2C2C" strokeWidth="0.1" />
            </pattern>
          </defs>
        </svg>
      </div>

      <FadeInSection>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="editorial-heading editorial-left mb-14">
            <h2 className="ink-title text-2xl md:text-3xl mb-4 section-title">
              <span className="title-line" />
              代表诗作
              <span className="title-line right" />
            </h2>
            <p className="ink-quote-sub text-sm mt-4">
              五首山水名篇，尽显诗画之美
            </p>
            <div className="ink-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-7 editorial-poem-grid">
            {poems.map((poem, idx) => (
              <Link
                key={poem.id}
                href={`/poem/${poem.id}`}
                aria-label={`阅读《${poem.title}》全文与赏析`}
                className={`poem-scroll p-6 md:p-8 block group ${idx < 2 ? 'lg:col-span-3 poem-featured' : 'lg:col-span-2'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* 水墨图形装饰 */}
                {poemArt[poem.id]}

                <div className="poem-card-meta">
                  <span className="poem-number">0{idx + 1}</span>
                  <span className="poem-kind">山水诗笺</span>
                </div>

                {/* 诗笺题头 */}
                <div className="poem-epigraph" />

                {/* Poem title */}
                <h3 className="ink-title text-lg md:text-xl mb-5 text-center">
                  {poem.title}
                </h3>

                {/* Excerpt */}
                <p className="ink-poem text-sm mb-6 leading-loose text-center">
                  {poem.excerpt}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mb-6 justify-center">
                  {poem.tags.map((tag) => (
                    <span key={tag} className="ink-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View button */}
                <div className="flex items-center justify-center gap-2 text-[#B8423A] text-sm group-hover:gap-3 transition-all duration-300">
                  <span className="tracking-widest">查看全文</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path
                      d="M5 3 L9 7 L5 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Section: Imagery
   ============================================================ */
function ImagerySection() {
  const [activeImagery, setActiveImagery] = useState<string>(imageryList[0]?.id ?? '');
  const item = imageryList.find((i) => i.id === activeImagery) ?? imageryList[0];

  return (
    <section id="imagery" className="section-flow py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <FadeInSection>
        <div className="max-w-5xl mx-auto imagery-layout-v2">
          <div className="editorial-heading editorial-right imagery-heading-v2">
            <p className="hero-kicker">意象索引 · 六景</p>
            <h2 className="ink-title text-2xl md:text-3xl mb-4 section-title">
              <span className="title-line" />
              诗中意象
              <span className="title-line right" />
            </h2>
            <p className="ink-quote-sub text-sm mt-4">万物皆有情，意象见禅心</p>
          </div>

          <div className="imagery-browser" aria-label="王维诗歌意象浏览器">
            <div className="imagery-index" role="tablist" aria-label="意象目录">
              {imageryList.map((entry, idx) => (
                <button
                  key={entry.id}
                  role="tab"
                  aria-selected={activeImagery === entry.id}
                  onClick={() => setActiveImagery(entry.id)}
                  className={`imagery-index-item ${activeImagery === entry.id ? 'is-active' : ''}`}
                >
                  <span className="imagery-index-no">0{idx + 1}</span>
                  <span className="imagery-index-icon"><ImageryIcon id={entry.id} /></span>
                  <span className="imagery-index-copy">
                    <strong>{entry.name}</strong>
                    <small>{entry.hoverLine}</small>
                  </span>
                  <span className="imagery-index-arrow">↗</span>
                </button>
              ))}
            </div>

            {item && (
              <article className="imagery-detail-panel" role="tabpanel" key={item.id}>
                <div className="imagery-detail-topline">
                  <span>意象释义</span>
                  <span>{item.name}</span>
                </div>
                <div className="imagery-detail-icon"><ImageryIcon id={item.id} /></div>
                <h3 className="ink-title text-2xl md:text-4xl">{item.name}</h3>
                <p className="imagery-detail-desc">{item.description}</p>
                <div className="imagery-lines">
                  <p className="imagery-lines-label">相关诗句</p>
                  {item.poems.map((poemItem, idx) => (
                    <div key={idx} className="imagery-line-row">
                      <span>{poemItem.poemTitle}</span>
                      <p className="ink-poem">{poemItem.line}</p>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Section: Poetry in Painting
   ============================================================ */
function PoetryInPaintingSection() {
  return (
    <section className="section-flow py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none">
          <circle cx="650" cy="120" r="80" fill="#2C2C2C" />
          <path d="M0 500 Q200 420 400 460 Q600 380 800 420 L800 600 L0 600 Z" fill="#2C2C2C" />
        </svg>
      </div>

      <FadeInSection>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="editorial-heading editorial-left mb-14">
            <h2 className="ink-title text-2xl md:text-3xl mb-4 section-title">
              <span className="title-line" />
              &ldquo;诗中有画&rdquo;
              <span className="title-line right" />
            </h2>
            <p className="ink-quote-sub text-sm mt-4">
              何谓以画入诗
            </p>
            <div className="ink-divider mt-6" />
          </div>

          <div className="poetics-grid">
            {[
              {
                title: '以画入诗',
                text: '王维不仅是诗人，更是画家。他将绘画的构图、色彩、光影融入诗歌创作，使每一首诗都如同一幅精心构制的山水画。\u201C明月松间照，清泉石上流\u201D——上句写光，下句写声；上句静，下句动。短短十字，便构成了一幅立体的山水小品。',
              },
              {
                title: '以禅入诗',
                text: '王维深谙佛理，其诗中充满了禅意的观照。\u201C空山不见人，但闻人语响\u201D——空不是虚无，而是超越了世俗执着后的清净自在。他的诗不刻意说理，却在山水描写中自然流露出对生命本质的洞察，这正是\u201C诗佛\u201D之名的由来。',
              },
              {
                title: '画面感的秘密',
                text: '王维诗歌的画面感来自三个要素：一曰色彩——明暗对比的视觉张力；二曰声响——以动衬静，泉声鸟鸣更显空幽；三曰留白——不写满，不写尽，给读者以想象的空间。三者合一，便成就了\u201C诗中有画\u201D的永恒魅力。',
              },
            ].map((item, idx) => (
              <article key={item.title} className="poetics-note p-6 md:p-8">
                <div className="poetics-index">0{idx + 1}</div>
                <h3 className="ink-title text-lg mb-4 flex items-center gap-3 section-head">
                  <span className="title-seal">{item.title.slice(0, 1)}</span>
                  {item.title}
                </h3>
                <p className="text-[#5A5A5A] leading-relaxed text-sm md:text-base">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Section: Interactive - Random Poem
   ============================================================ */
function InteractiveSection() {
  const [currentLine, setCurrentLine] = useState<(typeof randomLines)[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const getRandomLine = useCallback(() => {
    setIsAnimating(true);
    setHasInteracted(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * randomLines.length);
      setCurrentLine(randomLines[idx]);
      setIsAnimating(false);
    }, 400);
  }, []);

  return (
    <section id="random" className="section-flow py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative">
      <FadeInSection>
        <div className="max-w-5xl mx-auto random-editorial random-layout">
          <div className="random-intro">
            <p className="hero-kicker">互动 · 一次偶遇</p>
            <h2 className="ink-title text-2xl md:text-3xl mb-4">随机遇见一句王维</h2>
            <p className="text-[#7B8B9A] text-sm leading-relaxed">
              每次点击，都从王维的山水与禅意中抽取一瞬。不是翻页，而像在长卷中偶然停步。
            </p>
          </div>

          <div className="random-stage">
          {/* Display area */}
          <div className="min-h-[190px] md:min-h-[220px] flex flex-col items-start justify-center mb-8 md:mb-10">
            {currentLine ? (
              <div
                className={`transition-all duration-500 ${
                  isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                {/* "This encounter" label */}
                <p className="text-[#C8C0B0] text-xs tracking-[0.3em] mb-6">
                  本次相逢
                </p>

                {/* Poem line */}
                <p className="ink-poem text-xl md:text-2xl mb-5">
                  {currentLine.line}
                </p>

                {/* Source */}
                <p className="text-[#B8423A] text-sm mb-6 tracking-wider">
                  —— {currentLine.source}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-[#C8C0B0] mx-auto mb-6" />

                {/* Explanation */}
                <p className="text-[#5A5A5A] text-sm leading-relaxed max-w-md mx-auto">
                  {currentLine.explanation}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[#7B8B9A] text-sm mb-2">
                  {hasInteracted ? '再来一次' : '点击按钮，邂逅一句王维的诗句'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={getRandomLine}
            className="ink-btn-filled min-h-11"
          >
            {hasInteracted ? '再遇一句' : '随机遇见'}
          </button>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="site-footer px-4 sm:px-6">
      <div className="max-w-5xl mx-auto footer-editorial">
        <div>
          <p className="footer-kicker">WANG WEI · LANDSCAPE POETRY</p>
          <p className="ink-poem text-lg md:text-xl">诗中有画，画中有诗。</p>
        </div>
        <div className="footer-note">
          <p>本网页以王维山水诗为主题，通过水墨视觉与交互设计呈现“诗中有画”的审美意境。</p>
          <p className="footer-tool-note">课程网页 · AI 编程工具辅助设计与开发</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Main Page
   ============================================================ */
export default function Home() {
  return (
    <main className="site-canvas min-h-screen bg-[#F5F0E6]">
      <Navigation />
      <HeroSection />
      <PoetSection />
      <PoemsSection />
      <ImagerySection />
      <PoetryInPaintingSection />
      <InteractiveSection />
      <Footer />
    </main>
  );
}
