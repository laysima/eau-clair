'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Bottle3D from './Bottle3D'

/**
 * Hero loop, self-hosted from public/media/hero.
 *
 * Cut from the original 4K, 42s, 28MB clip down to a seamless 12s loop (the
 * shot is locked off, so a 1s crossfade hides the wrap), with the audio track
 * dropped and the index moved to the front so playback starts while the rest
 * is still downloading.
 *
 * Landscape screens get 1920x1080; portrait phones get a 720x1280 crop
 * centred on the cascade. AV1 is listed first, with H.264 for browsers that
 * can't decode AV1 (most iPhones). Filenames carry a content hash, so
 * next.config.ts can cache them for a year — a re-encode gets a new name.
 */
const HERO_MEDIA = '/media/hero'

/** Browsers that ignore `media` on video sources fall through to landscape. */
const LANDSCAPE = '(min-width: 768px), (orientation: landscape)'

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const navHeight = 60 // Navbar height
      const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover portrait:object-[36%_center]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={`${HERO_MEDIA}/waterfall-poster-09561bc8.webp`}
          aria-hidden="true"
        >
          <source
            media={LANDSCAPE}
            src={`${HERO_MEDIA}/waterfall-1080-53379cd2.av1.mp4`}
            type='video/mp4; codecs="av01.0.08M.08"'
          />
          <source
            media={LANDSCAPE}
            src={`${HERO_MEDIA}/waterfall-1080-ced07989.mp4`}
            type='video/mp4; codecs="avc1.640028"'
          />
          <source
            src={`${HERO_MEDIA}/waterfall-portrait-3ce48209.av1.mp4`}
            type='video/mp4; codecs="av01.0.05M.08"'
          />
          <source
            src={`${HERO_MEDIA}/waterfall-portrait-50fe98b0.mp4`}
            type='video/mp4; codecs="avc1.64001f"'
          />
        </video>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6 md:space-y-8 p-6 md:p-12 border-l-4 border-white/80 animate-fade-in-left">
            <div className="inline-block border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white px-4 md:px-6 py-2 text-xs md:text-sm font-medium tracking-widest uppercase shadow-lg">
              Premium Natural Water
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Purity<br />
              <span className="font-semibold text-[#90CAF9]">Perfected</span>
            </h1>
            
            <p className="text-base md:text-xl text-white/95 leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Vapor distilled water with electrolytes, sourced from nature&apos;s most pristine springs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
              <Link 
                href="/products"
                className="group bg-white text-[#1565C0] px-6 md:px-8 py-3 md:py-4 flex items-center justify-center gap-3 hover:bg-[#E3F2FD] transition-all shadow-xl hover:scale-105 text-center"
              >
                <span className="font-medium tracking-wide">Explore Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button 
                onClick={scrollToAbout}
                className="border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 hover:bg-white/20 transition-all font-medium tracking-wide shadow-xl hover:scale-105 text-center"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right - 3D Rotating Bottle GLB (Hidden on Mobile) */}
          <div className="hidden md:flex relative h-[700px] items-center justify-center animate-fade-in-right animation-delay-400">
            <div className="w-[450px] h-[700px]">
              <Bottle3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}