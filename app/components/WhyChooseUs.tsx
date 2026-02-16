'use client'

import Image from 'next/image'
import { Mountain, Droplets, Clock, Package } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function WhyChooseUs() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  const features = [
    {
      icon: Mountain,
      title: "Pristine Origin",
      description: "Water sourced from springs in environmentally protected wilderness areas, far from industrial zones.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
      icon: Droplets,
      title: "Mineral Balance",
      description: "Perfectly balanced mineral composition that supports health and natural body functions.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
    {
      icon: Clock,
      title: "Trusted Heritage",
      description: "Decades of tradition and trust among communities who value true water quality.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    },
    {
      icon: Package,
      title: "Smart Design",
      description: "Modern packaging designed for convenience while maintaining freshness and purity.",
      image: "/bottleNB.png",
    }
  ]

  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-24 space-y-6 scroll-animate ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">Why Choose Us</p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900">
            Excellence in <span className="font-medium text-[#1565C0]">Every Drop</span>
          </h2>
        </div>
        
        {/* Features Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`scroll-animate ${
                gridVisible ? `animate-scale-in animation-delay-${index * 200}` : ''
              }`}
            >
              <div className="relative h-72 overflow-hidden mb-8 group">
                <Image 
                  src={feature.image} 
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[#1565C0] text-[#1565C0] flex items-center justify-center">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed font-light pl-16">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}