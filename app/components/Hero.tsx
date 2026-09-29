'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * The hero is a single lifestyle still.
 *
 * The subject sits on the right of the frame and the left is soft, bright
 * background — so the copy goes left, set in navy rather than white, over a
 * light scrim that lifts the type off the photo without killing its airiness.
 * On phones the frame is pushed right to keep the subject in shot and the
 * scrim runs bottom-up instead.
 *
 * next/image serves this as WebP/AVIF at the size actually needed; the source
 * is a 1.4MB PNG and should never reach a visitor in that form.
 */
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
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden md:items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Gemini 3.1.png"
          alt="A runner drinking Eau Clair water by a poolside at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] md:object-center"
        />

        {/* Light scrim: sideways on desktop where the copy sits left, bottom-up
            on phones where it stacks under the subject. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/10 md:bg-gradient-to-r md:from-white/90 md:via-white/55 md:to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 md:px-8 md:py-32">
        <div className="max-w-xl space-y-6 md:space-y-8 animate-fade-in-left">
          <p className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[#1565C0] md:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-[#1565C0]" />
            Premium Natural Water
          </p>

          <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-[#04182f] md:text-7xl lg:text-8xl">
            Purity
            <br />
            <span className="font-medium text-[#1565C0]">Perfected</span>
          </h1>

          <p className="max-w-md text-lg font-light leading-relaxed text-slate-700 md:text-xl">
            Vapour distilled water with electrolytes, for the moment you have earned it.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row md:gap-5">
            <Link
              href="/products"
              className="group flex min-h-12 items-center justify-center gap-3 bg-[#1565C0] px-8 py-4 font-medium tracking-wide text-white shadow-lg transition-all hover:bg-[#0D47A1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]"
            >
              Explore Products
              <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>

            <button
              type="button"
              onClick={scrollToAbout}
              className="min-h-12 border-2 border-[#04182f]/25 bg-white/60 px-8 py-4 font-medium tracking-wide text-[#04182f] backdrop-blur-sm transition-all hover:border-[#04182f]/60 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
