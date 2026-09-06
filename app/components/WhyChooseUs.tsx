'use client'

import { Mountain, Droplets, Clock, Package } from 'lucide-react'
import WaveDivider from './WaveDivider'
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

export default function WhyChooseUs() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <section className="relative overflow-hidden bg-[#04182f] bg-gradient-to-br from-[#04182f] via-[#083a63] to-[#04182f] pt-28 md:pt-36 pb-32 md:pb-40 px-6 md:px-8">
      {/* Light pooling through deep water */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-32 right-1/4 w-[42rem] h-[42rem] rounded-full bg-[#1565C0]/35 blur-[130px]" />
        <div className="absolute top-1/3 -left-40 w-[38rem] h-[38rem] rounded-full bg-[#04b6ea]/20 blur-[130px]" />
        <div className="absolute -bottom-40 right-0 w-[34rem] h-[34rem] rounded-full bg-[#42A5F5]/15 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04182f]/80 via-transparent to-[#04182f]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`max-w-3xl space-y-6 mb-16 md:mb-20 scroll-animate ${
            headerVisible ? 'animate-fade-in-up' : ''
          }`}
        >
          <p className="text-sm tracking-[0.3em] text-[#04b6ea] uppercase font-medium">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
            Excellence in <span className="font-medium text-[#90CAF9]">Every Drop</span>
          </h2>
        </div>

        {/* Hairline grid — the gap-px over a light background draws the rules */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-px bg-white/12 border border-white/12"
        >
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className={`group relative bg-[#04182f] p-10 md:p-14 transition-colors duration-500 hover:bg-[#072b4d] scroll-animate ${
                gridVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ''
              }`}
            >
              <span className="block text-xs tracking-[0.3em] text-[#04b6ea] font-medium mb-8">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Droplet-shaped icon well, echoing the mark on the bottle */}
              <div className="w-14 h-14 mb-8 flex items-center justify-center bg-white/10 text-[#90CAF9] rounded-tl-[999px] rounded-tr-[999px] rounded-br-[999px] transition-all duration-500 group-hover:bg-[#90CAF9] group-hover:text-[#04182f]">
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">{feature.title}</h3>
              <p className="text-white/60 font-light leading-relaxed max-w-md">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <WaveDivider fill="#E3F2FD" height="h-14 md:h-24" />
    </section>
  )
}
