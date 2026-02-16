'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Bottle3DGLB from './Bottle3DGLB'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={false}
          playsInline
        >
          <source src="/videos/waterfall.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-32 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8 p-12 border-l-4 border-white/80 animate-fade-in-left">
            <div className="inline-block border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white px-6 py-2 text-sm font-medium tracking-widest uppercase shadow-lg">
              Premium Natural Water
            </div>
            
            <h1 className="text-6xl md:text-7xl font-light text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Purity<br />
              <span className="font-semibold text-[#90CAF9]">Perfected</span>
            </h1>
            
            <p className="text-xl text-white/95 leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Vapor distilled water with electrolytes, sourced from nature&apos;s most pristine springs.
            </p>
            
            <div className="flex gap-6 pt-4">
              <Link 
                href="/products"
                className="group bg-white text-[#1565C0] px-8 py-4 flex items-center gap-3 hover:bg-[#E3F2FD] transition-all shadow-xl hover:scale-105"
              >
                <span className="font-medium tracking-wide">Explore Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="border-2 border-white/90 bg-white/10 backdrop-blur-sm text-white px-8 py-4 hover:bg-white/20 transition-all font-medium tracking-wide shadow-xl hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Right - 3D Rotating Bottle GLB */}
          <div className="relative h-[700px] flex items-center justify-center animate-fade-in-right animation-delay-400">
            <div className="w-[450px] h-[700px]">
              <Bottle3DGLB />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}