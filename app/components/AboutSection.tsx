'use client'

import { Award, Leaf, Droplet } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()

  const features = [
    {
      icon: Droplet,
      title: "Pure Source",
      description: "Water from protected mountain springs, naturally filtered through ancient mineral deposits.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized globally for exceptional quality and sustainable practices.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious",
      description: "Committed to environmental protection and sustainable sourcing methods.",
    }
  ]

  const stats = [
    { value: "50+", label: "Years of Excellence" },
    { value: "100%", label: "Natural Source" },
    { value: "24/7", label: "Quality Testing" },
  ]

  return (
    <section id="about" className="py-32 px-8 bg-gradient-to-b from-white to-[#E3F2FD]/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-24 space-y-6 scroll-animate ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <p className="text-sm tracking-[0.3em] text-[#2E7D32] uppercase font-medium">About Us</p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900">
            Nature&apos;s <span className="font-medium text-[#1565C0]">Finest</span> Water
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            For generations, we&apos;ve been sourcing pristine water from protected wilderness springs, 
            delivering unmatched purity and taste to families who value quality.
          </p>
        </div>
        
        {/* Feature Boxes */}
        <div 
          ref={contentRef}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-12 border border-gray-200 hover:border-[#2E7D32] hover:shadow-lg transition-all duration-300 group scroll-animate ${
                contentVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ''
              }`}
            >
              <div className="w-16 h-16 border border-[#2E7D32] text-[#2E7D32] flex items-center justify-center mb-6 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-3 gap-8 py-16 border-t border-b border-gray-200 scroll-animate ${
            statsVisible ? 'animate-fade-in-up' : ''
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-light text-[#1565C0] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-light tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}