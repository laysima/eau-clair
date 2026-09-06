import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import WaveDivider from './WaveDivider'

export default function HomeFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#04182f] px-6 pb-8 pt-24 text-white md:px-8 md:pt-32">
      <WaveDivider position="top" fill="#ffffff" height="h-10 md:h-16" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-56 -top-32 h-[42rem] w-[42rem] rounded-full border border-[#90CAF9]/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-12 h-[32rem] w-[32rem] rounded-full border border-[#90CAF9]/10" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/15 pb-16 md:pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#90CAF9]">Bring a little clarity to your day</p>
            <h2 className="text-5xl font-light leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Refreshment,<br /><span className="text-[#90CAF9]">well considered.</span></h2>
          </div>
          <div>
            <p className="max-w-sm text-lg font-light leading-relaxed text-white/65">At home, on the move, or shared around a table. Find the Eau Clair that fits your everyday.</p>
            <Link href="/products" className="group mt-7 inline-flex min-h-14 items-center justify-center gap-8 bg-white px-7 py-4 font-medium text-[#04182f] transition-colors hover:bg-[#E3F2FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Find your water
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 md:gap-16 md:py-16 lg:grid-cols-[1.2fr_0.6fr_0.8fr]">
          <div>
            <Link href="/" aria-label="Eau Clair home" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Image src="/logo.png" alt="Eau Clair" width={130} height={52} className="brightness-0 invert" />
            </Link>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-white/60">Vapour distilled. Thoughtfully balanced.<br />Pure water, simplified.</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#90CAF9]">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-light">
              {[
                ['Home', '/'], ['Our story', '/about'], ['Our water', '/products'], ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="inline-flex min-h-8 items-center text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#90CAF9]">Let&apos;s talk</p>
            <Link href="/contact" className="group inline-flex min-h-10 items-center gap-4 border-b border-white/20 pb-2 text-xl font-light transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              A question or a bigger order?
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
            <p className="mt-4 text-sm font-light text-white/60">We&apos;re here to help you find your flow.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-7 text-xs font-light tracking-wide text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Eau Clair. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="inline-flex min-h-8 items-center hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Privacy policy</Link>
            <Link href="/terms" className="inline-flex min-h-8 items-center hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
