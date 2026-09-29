'use client'

import Link from 'next/link'
import { ArrowRight, Mountain, Droplets, Clock, Package } from 'lucide-react'
import Bubbles from './Bubbles'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const FEATURES = [
  {
    icon: Mountain,
    title: 'Pristine Origin',
    description:
      'Water sourced from springs in environmentally protected wilderness areas, far from industrial zones.',
  },
  {
    icon: Droplets,
    title: 'Mineral Balance',
    description:
      'Perfectly balanced mineral composition that supports health and natural body functions.',
  },
  {
    icon: Clock,
    title: 'Trusted Heritage',
    description:
      'Decades of tradition and trust among communities who value true water quality.',
  },
  {
    icon: Package,
    title: 'Smart Design',
    description:
      'Modern packaging designed for convenience while maintaining freshness and purity.',
  },
]

/**
 * The last section before the footer, so it is set light: it picks up the white
 * the collection ends on and deepens down toward the navy footer, which then
 * pours in from beneath it. Surface to depth, rather than two dark blocks
 * running into each other.
 *
 * It ends on #CFE6F5, and HomeFooter's top wave is filled with the same colour
 * so the two meet without a seam — change one, change both.
 */

export default function WhyChooseUs() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation()

  return (
    // overflow-clip, not overflow-hidden: hidden makes the section the sticky
    // heading's scroll container, so it never pins to the viewport and just sits
    // permanently offset by its top value.
    <section
      aria-labelledby="why-heading"
      className="relative overflow-clip bg-gradient-to-b from-white via-[#EEF6FC] to-[#CFE6F5] px-6 pb-32 pt-14 md:px-8 md:pb-40 md:pt-16"
    >
      <Bubbles />

      {/* Light falling through the surface */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-white/80 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[34rem] w-[34rem] rounded-full bg-[#90CAF9]/30 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* Heading holds its place while the list scrolls past it */}
        <div
          ref={headerRef}
          className={`self-start lg:sticky lg:top-32 scroll-animate ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#1565C0]">
            Why Eau Clair
          </p>
          <h2
            id="why-heading"
            className="text-4xl font-light leading-[1.08] tracking-tight text-[#04182f] sm:text-5xl md:text-6xl"
          >
            Excellence in
            <br />
            <span className="text-[#1565C0]">every drop.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-slate-600">
            Four things we refuse to compromise on, from the source to the seal on your cap.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex min-h-12 items-center gap-5 border-b border-[#1565C0]/30 pb-2 font-medium text-[#1565C0] transition-colors hover:border-[#1565C0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]"
          >
            Read our story
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <div ref={listRef}>
        <ol className="border-b border-[#04182f]/10">
          {FEATURES.map((feature, index) => (
            <li
              key={feature.title}
              className={`group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-[#04182f]/10 py-9 md:gap-x-10 md:py-11 scroll-animate ${
                listVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="row-span-2 pt-1 text-4xl font-light tabular-nums text-[#1565C0]/25 transition-colors duration-500 group-hover:text-[#1565C0] md:text-5xl"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-4">
                {/* Droplet-shaped icon well, echoing the mark on the bottle */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tl-[999px] rounded-tr-[999px] rounded-br-[999px] bg-white text-[#1565C0] shadow-[0_6px_20px_-8px_rgba(21,101,192,0.45)] transition-colors duration-500 group-hover:bg-[#1565C0] group-hover:text-white">
                  <feature.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-2xl font-light text-[#04182f] md:text-3xl">{feature.title}</h3>
              </div>

              <p className="max-w-lg font-light leading-relaxed text-slate-600">{feature.description}</p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
