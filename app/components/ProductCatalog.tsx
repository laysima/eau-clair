'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Product } from '../types/database'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(4)
      
      if (data) setProducts(data)
    }
    
    fetchProducts()
  }, [])

  return (
    <section className="py-32 px-8 bg-gradient-to-b from-[#E3F2FD]/10 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-24 space-y-6 scroll-animate ${headerVisible ? 'animate-fade-in-up' : ''}`}
        >
          <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">Our Products</p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900">
            Premium <span className="font-medium text-[#2E7D32]">Selection</span>
          </h2>
        </div>

        {/* Product Grid - Centered when less than 4 items */}
        <div 
          ref={gridRef} 
          className={`mb-16 ${
            products.length === 4 
              ? 'grid md:grid-cols-4 gap-8' 
              : 'flex flex-wrap justify-center gap-8'
          }`}
        >
          {products.map((product, index) => (
            <Link 
              href={`/products/${product.id}`}
              key={product.id}
              className={`group scroll-animate ${
                products.length === 4 ? '' : 'w-full md:w-[calc(25%-1.5rem)]'
              } ${
                gridVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ''
              }`}
            >
              <div className="space-y-6">
                <div className="relative h-96 bg-gray-50 overflow-hidden">
                  <Image
                    src={product.image_url || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-light text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-light">{product.size}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-2xl font-light text-gray-900">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div 
          className={`text-center scroll-animate ${gridVisible ? 'animate-fade-in-up animation-delay-800' : ''}`}
        >
          <Link 
            href="/products"
            className="group inline-flex items-center gap-3 text-[#1565C0] hover:text-[#42A5F5] transition-colors font-light text-lg"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}