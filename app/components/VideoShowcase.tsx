'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import WaveDivider from './WaveDivider'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const MEDIA = 'https://mdetoprztpxewognttgd.supabase.co/storage/v1/object/public/media'

/** Swap to `${MEDIA}/vid1.mp4` for the wider, spotlit cut. */
const BACKDROP = `${MEDIA}/vid2.mp4`

const STEPS = [
  {
    n: '01',
    title: 'Vapour distilled',
    copy: 'Heated until it becomes vapour, then condensed back to liquid. Everything that is not water is left behind.',
  },
  {
    n: '02',
    title: 'Electrolytes for taste',
    copy: 'A measured blend of minerals goes back in — enough to give it a clean, round finish that is never flat.',
  },
]

export default function VideoShowcase() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="relative flex items-center overflow-hidden min-h-[42rem] md:min-h-[46rem]">
      {/* The film is the background — no colour wash over it. The slight scale
          crops the watermark out of the corner. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover scale-110"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={BACKDROP} type="video/mp4" />
        </video>

        {/* Neutral shading only where the copy sits, so the type stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        {/* On narrow screens the copy spans the full width, so back all of it */}
        <div className="absolute inset-0 bg-black/45 md:bg-transparent" />
      </div>

      {/* The light section above pours down into the deep */}
      <WaveDivider position="top" fill="#ffffff" height="h-14 md:h-24" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 py-28 md:py-36">
        <div
          ref={ref}
          className={`max-w-2xl space-y-6 scroll-animate ${isVisible ? 'animate-fade-in-left' : ''}`}
        >
          <p className="text-sm tracking-[0.3em] text-[#04b6ea] uppercase font-medium">
            The Craft
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            Still. Clear.
            <br />
            <span className="font-medium text-[#90CAF9]">Considered.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
            We took perfectly ordinary water and sent it on an extraordinary journey — so that
            what reaches the bottle is nothing but water, and exactly the minerals we chose to
            put back.
          </p>
        </div>

        {/* The two-step story, set as type over the film */}
        <div
          className={`grid sm:grid-cols-2 gap-8 md:gap-12 max-w-3xl mt-14 md:mt-16 scroll-animate ${
            isVisible ? 'animate-fade-in-up animation-delay-400' : ''
          }`}
        >
          {STEPS.map((step) => (
            <div key={step.n} className="border-t border-white/25 pt-5 space-y-2">
              <span className="block text-xs tracking-[0.3em] text-[#04b6ea] font-medium">
                {step.n}
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white">{step.title}</h3>
              <p className="text-white/65 font-light leading-relaxed text-sm md:text-base">
                {step.copy}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-12 md:mt-16 scroll-animate ${isVisible ? 'animate-fade-in-up animation-delay-600' : ''}`}>
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 border border-white/40 bg-white/5 backdrop-blur-sm text-white px-8 py-4 hover:bg-white hover:text-[#04182f] transition-all font-medium tracking-wide"
          >
            See the range
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <WaveDivider fill="#04182f" />
    </section>
  )
}
