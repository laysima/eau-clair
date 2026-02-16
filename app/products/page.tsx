'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { createClient } from '@/utils/supabase/client'
import { Product } from '../types/database'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  
  const categories = ["All", "Still Water", "Sparkling", "Premium", "Bulk"]

  useEffect(() => {
    const loadProducts = async () => {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setProducts(data)
      }
      setLoading(false)
    }

    loadProducts()
  }, [])

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-linear-to-b from-white to-[#E3F2FD]/10 py-24 px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div className="space-y-6">
                <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
                  Our Collection
                </p>
                <h1 className="text-6xl md:text-7xl font-light text-gray-900">
                  Water for Every Need
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
                  From 500ml bottles to dispenser refills, sachets to family packs — discover our complete range
                </p>
              </div>
              
              <div className="hidden md:block text-right">
                <div className="text-5xl font-light text-[#1565C0]">{products.length}</div>
                <div className="text-sm text-gray-500 font-light tracking-wide mt-2">Products Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}

        {/* Products Grid */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Results Count */}
            <p className="text-gray-500 font-light mb-8">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>

            {loading ? (
              <div className="text-center py-32">
                <p className="text-2xl text-gray-400 font-light">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-2xl text-gray-400 font-light mb-4">No products found</p>
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="text-[#1565C0] hover:underline font-light"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product: Product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <div className="group space-y-6 cursor-pointer">
                      {/* Product Image */}
                      <div className="relative h-96 bg-gray-50 overflow-hidden">
                        <Image
                          src={product.image_url || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-white border border-[#1565C0] px-3 py-1">
                          <span className="text-xs font-medium text-[#1565C0] uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                        {/* Stock Badge */}
                        {product.stock > 0 && product.stock < 10 && (
                          <div className="absolute top-4 left-4 bg-[#1565C0] text-white px-3 py-1 text-xs font-medium tracking-wide">
                            Only {product.stock} left
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-light text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-light">{product.size}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-2xl font-light text-gray-900">
                            ${Number(product.price).toFixed(2)}
                          </span>
                          <span className="border border-[#1565C0] text-[#1565C0] px-6 py-2 group-hover:bg-[#1565C0] group-hover:text-white transition-all text-sm font-light tracking-wide">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 px-8 bg-linear-to-b from-white to-[#E3F2FD]/10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-light text-gray-900">
              Why Choose <span className="font-medium text-[#1565C0]">Eau Clair</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12 pt-8">
              <div className="space-y-3">
                <div className="text-3xl font-light text-[#1565C0]">100%</div>
                <p className="text-sm text-gray-600 font-light tracking-wide">Natural Source</p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-light text-[#2E7D32]">24/7</div>
                <p className="text-sm text-gray-600 font-light tracking-wide">Quality Control</p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-light text-[#1565C0]">50+</div>
                <p className="text-sm text-gray-600 font-light tracking-wide">Years Experience</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}