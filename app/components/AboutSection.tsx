import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import WaterSurface from './WaterSurface'

const stats = [
  { value: '50+', label: 'Years of care' },
  { value: '100%', label: 'Natural source' },
  { value: '24/7', label: 'Quality testing' },
]

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="introduction-heading" className="scroll-mt-24 bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="max-w-xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[#1565C0]">
              <span aria-hidden="true" className=" bg-[#1565C0]" />
              A naturally clearer perspective
            </p>
            <h2 id="introduction-heading" className="text-5xl font-light leading-[1.08] tracking-tight text-[#04182f] md:text-6xl lg:text-7xl">
              Good water.
              <br />
              <span className="text-[#1565C0]">Simple as that.</span>
            </h2>
            <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-slate-600 md:text-xl">
              A quiet moment. A fresh start. A little care for yourself.
              We believe the everyday deserves water that&apos;s just as considered.
            </p>
            <p className="mt-5 max-w-md font-light leading-relaxed text-slate-600">
              From our source to your first sip, Eau Clair brings together nature,
              thoughtful craft, and a lasting commitment to quality.
            </p>
            <Link href="/about" className="group mt-8 inline-flex min-h-12 items-center gap-6 border-b border-[#1565C0]/30 pb-2 font-medium text-[#1565C0] transition-colors hover:border-[#1565C0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]">
              A little more about us
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>
          <WaterSurface />
        </div>

        <dl className="mt-16 grid grid-cols-3 border-t border-[#D9E6EF] pt-9 md:mt-20 md:pt-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`flex flex-col gap-2 px-3 text-center sm:flex-row sm:items-baseline sm:justify-center sm:gap-4 ${index > 0 ? 'border-l border-[#D9E6EF]' : ''}`}>
              <dt className="order-2 text-xs tracking-wide text-slate-500 sm:text-sm">{stat.label}</dt>
              <dd className="text-3xl font-light tracking-tight text-[#04182f] md:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
