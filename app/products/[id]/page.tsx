import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, Check } from 'lucide-react'

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await params first
  const { id } = await params
  
  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  // Sample mineral composition - you can add this to your database later
  const minerals = [
    { name: "Calcium", value: "90", color: "bg-blue-100" },
    { name: "Magnesium", value: "26", color: "bg-[#E8F5E9]" },
    { name: "Potassium", value: "1", color: "bg-blue-50" },
    { name: "Sulfates", value: "90", color: "bg-[#E8F5E9]" },
  ]

  const benefits = [
    "Perfect hydration for active lifestyles",
    "Natural mineral balance for optimal health",
    "Sourced from protected spring areas",
    "BPA-free packaging for safety",
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        {/* Back Button */}
        <section className="py-8 px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1565C0] transition-colors font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Product Image */}
              <div className="relative h-150 bg-gray-50">
                <Image
                  src={product.image_url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain p-12"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                {/* Category Badge */}
                <div className="inline-block border border-[#1565C0] text-[#1565C0] px-4 py-2 text-xs font-medium tracking-widest uppercase">
                  {product.category}
                </div>

                {/* Title & Description */}
                <div className="space-y-4">
                  <h1 className="text-5xl font-light text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-xl text-gray-600 font-light leading-relaxed">
                    {product.description || "Perfect after a meal or when you're playing sports. When out-door or in your office or church, Eau Clair will keep you hydrated throughout the day."}
                  </p>
                  <p className="text-lg text-[#2E7D32] font-light italic">
                    Open me up and share the love!
                  </p>
                </div>

                {/* Price & Size */}
                <div className="flex items-baseline gap-8 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500 font-light tracking-wide mb-1">Price</p>
                    <p className="text-4xl font-light text-gray-900">${Number(product.price).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-light tracking-wide mb-1">Size</p>
                    <p className="text-2xl font-light text-gray-900">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-light tracking-wide mb-1">Stock</p>
                    <p className="text-2xl font-light text-gray-900">{product.stock} available</p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-[#1565C0] text-white py-4 hover:bg-[#42A5F5] transition-all text-sm font-medium tracking-wide uppercase">
                  Add to Cart
                </button>

                {/* Benefits */}
                <div className="pt-8 space-y-4">
                  <h3 className="text-sm tracking-[0.3em] text-gray-900 uppercase font-medium">Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 font-light">
                        <Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mineral Composition */}
        <section className="py-24 px-8 bg-linear-to-b from-white to-[#E3F2FD]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-light text-gray-900">Mineral Composition</h2>
              <p className="text-gray-600 font-light">Essential minerals in every drop</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {minerals.map((mineral, index) => (
                <div 
                  key={index}
                  className={`${mineral.color} p-8 text-center space-y-4`}
                >
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                    {mineral.name}
                  </h3>
                  <p className="text-6xl font-light text-gray-900">
                    {mineral.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-12">You Might Also Like</h2>
            {/* You can add related products here later */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}