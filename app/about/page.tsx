'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Droplet, Heart, Leaf, Award } from 'lucide-react'

export default function AboutPage() {
  const founders = [
    {
      name: "Fuseini Limann",
      role: "Founder & CEO",
      image: "/founder2.jpg", // Update with your actual filename
      bio: "With over 15 years in sustainable water sourcing, Sarah leads our mission to bring pure, natural water to every table."
    },
    {
      name: "Limann Shakur",
      role: "Technical Officer",
      image: "/founder1.JPG", // Update with your actual filename
      bio: "David's expertise in environmental science ensures our water maintains the highest purity standards while protecting natural ecosystems."
    }
  ]

  const values = [
    {
      icon: Droplet,
      title: "Purity First",
      description: "Every drop is carefully sourced from pristine springs and rigorously tested for quality."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We protect the environments we source from, ensuring nature thrives for generations."
    },
    {
      icon: Heart,
      title: "Community Care",
      description: "Supporting local communities and giving back to the regions that provide our water."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards in every aspect of our production and service."
    }
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-32 px-8 bg-gradient-to-b from-white via-[#E3F2FD]/10 to-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
              Our Story
            </p>
            <h1 className="text-6xl md:text-7xl font-light text-gray-900 leading-tight">
              Bringing Nature&apos;s <span className="font-medium text-[#2E7D32]">Purity</span> to You
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              For over 50 years, Eau Clair has been dedicated to sourcing the finest natural spring water 
              from ecologically pristine regions, delivering unmatched quality and taste.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative h-[500px] bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                  alt="Natural Spring"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-sm tracking-[0.3em] text-[#2E7D32] uppercase font-medium">
                  Since 1974
                </p>
                <h2 className="text-4xl font-light text-gray-900">
                  A Legacy of <span className="font-medium text-[#1565C0]">Quality</span>
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Eau Clair was born from a simple belief: that the best water comes directly from nature, 
                    untouched and pure. Our founders discovered pristine mountain springs in remote wilderness 
                    areas, where water flows naturally through ancient mineral deposits.
                  </p>
                  <p>
                    Today, we continue that tradition, protecting our water sources and the ecosystems around 
                    them. Every bottle of Eau Clair represents our commitment to bringing you water exactly as 
                    nature intended—pure, balanced, and refreshing.
                  </p>
                  <p>
                    We don&apos;t just bottle water; we preserve a natural treasure and share it with families who 
                    value quality, health, and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-8 bg-gradient-to-b from-white to-[#E8F5E9]/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <p className="text-sm tracking-[0.3em] text-[#2E7D32] uppercase font-medium">
                Our Values
              </p>
              <h2 className="text-5xl font-light text-gray-900">
                What Drives Us
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center space-y-4 p-6 border border-gray-200 hover:border-[#2E7D32] transition-all group">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-[#2E7D32] text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders Section */}
          <section className="py-24 px-8 bg-white">
            <div className="max-w-2çxl mx-auto">
              <div className="text-center mb-20 space-y-4">
                <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
                  Leadership
                </p>
                <h2 className="text-5xl font-light text-gray-900">
                  Meet Our <span className="font-medium text-[#2E7D32]">Founders</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-1 max-w-4xl mx-auto">
                {founders.map((founder, index) => (
                  <div key={index}>
                    {/* Image - Better fitting */}
                    <div className="max-w-[250px] mx-auto">  {/* Wrap BOTH image and text */}
                      {/* Image */}
                      <div className="relative w-full aspect-[3/4] bg-gray-50 mb-6 overflow-hidden">
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>

                      {/* Info */}
                      <div className="space-y-3">
                        <div className="border-l-2 border-[#2E7D32] pl-4">
                          <h3 className="text-2xl font-light text-gray-900">{founder.name}</h3>
                          <p className="text-sm text-[#1565C0] uppercase tracking-wide font-medium mt-1">
                            {founder.role}
                          </p>
                        </div>
                        <p className="text-gray-600 font-light leading-relaxed pl-4">
                          {founder.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        {/* Stats Section */}
        <section className="py-24 px-8 bg-gradient-to-b from-white to-[#E3F2FD]/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-[#2E7D32]">50+</div>
                <div className="text-sm tracking-widest text-gray-600 uppercase font-light">Years</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-[#1565C0]">100%</div>
                <div className="text-sm tracking-widest text-gray-600 uppercase font-light">Natural</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-[#2E7D32]">24/7</div>
                <div className="text-sm tracking-widest text-gray-600 uppercase font-light">Quality Control</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-light text-[#1565C0]">5M+</div>
                <div className="text-sm tracking-widest text-gray-600 uppercase font-light">Happy Customers</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8 bg-gradient-to-b from-[#E8F5E9]/20 to-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-light text-gray-900">
              Experience the <span className="font-medium text-[#2E7D32]">Difference</span>
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Discover why families have trusted Eau Clair for generations
            </p>
            <Link 
              href="/products"
              className="inline-block bg-[#2E7D32] text-white px-12 py-4 hover:bg-[#66BB6A] transition-all font-medium tracking-wide"
            >
              Explore Our Products
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}