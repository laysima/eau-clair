'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Product } from '../types/database'

type CatalogState = {
  status: 'loading' | 'ready' | 'error'
  products: Product[]
}

export default function ProductCatalog() {
  const [catalog, setCatalog] = useState<CatalogState>({ status: 'loading', products: [] })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        const { data, error } = await createClient()
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(4)
          .abortSignal(controller.signal)

        if (controller.signal.aborted) return
        if (error) throw error
        setCatalog({ status: 'ready', products: data ?? [] })
      } catch {
        if (!controller.signal.aborted) setCatalog({ status: 'error', products: [] })
      }
    }

    void fetchProducts()
    return () => controller.abort()
  }, [attempt])

  return (
    <section id="collection" aria-labelledby="collection-heading" className="relative bg-gradient-to-b from-[#E3F2FD] via-[#F0F7FC] to-white px-6 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-12">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#1565C0]">The Eau Clair collection</p>
            <h2 id="collection-heading" className="text-4xl font-light leading-[1.1] tracking-tight text-[#04182f] sm:text-5xl md:text-6xl">
              Find your <span className="text-[#1565C0]">everyday.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-slate-600">For the slow mornings, the long days, and everything in between.</p>
          </div>
          <Link href="/products" className="group inline-flex min-h-12 shrink-0 items-center gap-5 self-start border-b border-[#1565C0]/30 pb-2 text-[#1565C0] transition-colors hover:border-[#1565C0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0] md:self-auto">
            Explore the collection
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        <div aria-busy={catalog.status === 'loading'} aria-live="polite">
          {catalog.status === 'loading' ? (
            <div role="status">
              <span className="sr-only">Loading the collection</span>
              <div aria-hidden="true" className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse motion-reduce:animate-none">
                    <div className="aspect-[4/5] rounded-t-[5rem] bg-[#D7E8F3]/70" />
                    <div className="mt-6 h-5 w-2/3 bg-[#D7E8F3]" />
                    <div className="mt-3 h-4 w-1/3 bg-[#D7E8F3]/70" />
                  </div>
                ))}
              </div>
            </div>
          ) : catalog.status === 'error' ? (
            <div className="flex flex-col items-start justify-between gap-6 border-y border-[#C9DFEE] py-10 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-2xl font-light text-[#04182f]">The collection is taking a moment.</h3>
                <p className="mt-2 font-light text-slate-600">Please try again to see our latest water selection.</p>
              </div>
              <button type="button" onClick={() => { setCatalog({ status: 'loading', products: [] }); setAttempt((value) => value + 1) }} className="inline-flex min-h-12 items-center gap-3 border border-[#1565C0]/40 px-6 text-[#1565C0] transition-colors hover:bg-[#E3F2FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]">
                Try again <RotateCcw aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          ) : catalog.products.length > 0 ? (
            <div className={`grid gap-x-6 gap-y-12 lg:gap-x-8 ${catalog.products.length === 1 ? 'mx-auto w-full max-w-md' : catalog.products.length === 2 ? 'mx-auto max-w-3xl sm:grid-cols-2' : catalog.products.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
              {catalog.products.map((product, index) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#1565C0]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-[6rem] bg-gradient-to-b from-white to-[#D7EAF5] ring-1 ring-white/80">
                    <span aria-hidden="true" className="absolute bottom-[8%] left-1/2 h-[9%] w-[52%] -translate-x-1/2 rounded-[50%] bg-[#5888A3]/15 blur-xl" />
                    <Image
                      src={product.image_url || '/bottleNB.png'}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1280px) 410px, (min-width: 1024px) 33vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <span aria-hidden="true" className="absolute bottom-5 left-5 text-xs tracking-[0.2em] text-[#50748C]">0{index + 1}</span>
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#1565C0]/20 bg-white/80 text-[#1565C0] transition-colors group-hover:bg-[#1565C0] group-hover:text-white">
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4 border-b border-[#D5E3ED] pb-5">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-light text-[#04182f] transition-colors group-hover:text-[#1565C0]">{product.name}</h3>
                      <p className="mt-2 text-sm font-light tracking-wide text-slate-500">{[product.size, product.category].filter(Boolean).join(' / ')}</p>
                    </div>
                    <p className="shrink-0 pt-1 text-lg font-light text-[#1565C0]">${Number(product.price).toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid items-center gap-8 border-y border-[#C9DFEE] py-8 sm:grid-cols-[1fr_2fr]">
              <div className="relative mx-auto h-64 w-full max-w-xs overflow-hidden bg-gradient-to-b from-white to-[#E3F2FD]">
                <Image src="/bottleNB.png" alt="Eau Clair water bottle" fill sizes="320px" className="object-cover" />
              </div>
              <div>
                <h3 className="text-3xl font-light text-[#04182f]">Your next everyday essential.</h3>
                <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-slate-600">We&apos;re refreshing our collection. Get in touch for product availability and help finding your water.</p>
                <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-4 text-[#1565C0] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]">Talk to our team <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
