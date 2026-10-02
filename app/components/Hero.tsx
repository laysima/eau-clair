'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import WaveDivider from './WaveDivider'

import heroPhoto from '../../public/Gemini 3.1.png'

/**
 * The copy sits on the left of the frame, over a mid-tone grey-green slope that
 * nothing reads well against. Rather than a flat white wash (which turns green
 * grey) or glows around the letters (which look stuck on), the left side fades
 * into a pale haze tinted from the photo's own sky — the way distant slopes
 * already look in mountain light. The bottles on the right are left untouched.
 */
const HAZE = '#EAF3FB'

export default function Hero() {
  const scrollToAbout = () => {
    const about = document.getElementById('about')
    if (!about) return
    const navHeight = 60
    window.scrollTo({
      top: about.getBoundingClientRect().top + window.scrollY - navHeight,
      behavior: 'smooth',
    })
  }

  return (
    // The photo runs up underneath the transparent navbar at every size.
    <section id="home" className="relative bg-white">
      <div className="relative h-[23rem] w-full sm:h-[30rem] lg:h-auto lg:aspect-[1376/768]">
        <Image
          src={heroPhoto}
          alt="The Eau Clair range, from a small bottle up to a large jug, on a rock in front of snow-capped mountains"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[92%_center] lg:object-center"
        />

        {/* Desktop: atmospheric haze behind the copy, clear by mid-frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(90deg, ${HAZE}e6 0%, ${HAZE}b3 28%, ${HAZE}40 48%, transparent 62%)`,
          }}
        />
        {/* Phones: the rock under the bottles dissolves into the white the copy sits on */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-white via-white/60 to-transparent lg:hidden"
        />
      </div>

      <div className="relative z-10 mx-auto -mt-6 w-full max-w-7xl px-6 pb-28 md:px-8 md:pb-32 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:items-center lg:py-0 lg:pt-16">
        <div className="max-w-xl space-y-5 animate-fade-in-left md:space-y-6 xl:space-y-8">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1565C0] md:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-[#1565C0]" />
            Premium Natural Water
          </p>

          <h1 className="text-[2.9rem] leading-[1.05] text-[#04182f] md:text-6xl lg:text-7xl xl:text-8xl">
            Purity
            <br />
            <span className="font-medium text-[#1565C0]">Perfected</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-[#04182f]/85 sm:text-lg md:text-xl">
            Vapour distilled water with electrolytes, for the moment you have earned it.
          </p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-2 lg:gap-5">
            <Link
              href="/products"
              className="group flex min-h-12 items-center justify-center gap-3 bg-[#1565C0] px-7 py-4 lg:px-8 font-medium tracking-wide text-white focus-visible:outline-[#1565C0]"
            >
              Explore Products
              <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>

            <button
              type="button"
              onClick={scrollToAbout}
              className="min-h-12 border-b border-[#04182f]/30 font-medium tracking-wide text-[#04182f] transition-colors hover:border-[#04182f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <WaveDivider fill="#04182f" height="h-12 md:h-16 lg:h-20" />
    </section>
  )
}
