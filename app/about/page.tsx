import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Award, Droplet, Heart, Leaf } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaveDivider from '../components/WaveDivider'

const founders = [
  {
    name: 'Fuseini Limann',
    role: 'Founder & CEO',
    image: '/founder2.jpg',
  },
  {
    name: 'Limann Shakur',
    role: 'Technical Officer',
    image: '/founder1.JPG',
  },
]

const values = [
  {
    icon: Droplet,
    title: 'Purity first',
    description: 'Every drop is carefully sourced from pristine springs and rigorously tested for quality.',
  },
  {
    icon: Leaf,
    title: 'Respect for nature',
    description: 'We protect the environments we source from, ensuring nature thrives for generations.',
  },
  {
    icon: Heart,
    title: 'Community care',
    description: 'Supporting local communities and giving back to the regions that provide our water.',
  },
  {
    icon: Award,
    title: 'Everyday excellence',
    description: 'Committed to the highest standards in every aspect of our production and service.',
  },
]

const stats = [
  { value: '50+', label: 'Years of dedication' },
  { value: '100%', label: 'Natural water' },
  { value: '24/7', label: 'Quality control' },
  { value: '5M+', label: 'Happy customers' },
]

const eyebrow = 'text-xs font-medium uppercase tracking-[0.24em]'
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1565C0]'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 text-[#173D48]">
        <section aria-labelledby="about-heading" className="relative overflow-hidden bg-[#F3F8F6] px-6 pb-20 pt-12 sm:pt-16 md:px-8 lg:pb-24 lg:pt-20">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <p className={`${eyebrow} mb-7 flex items-center gap-3 text-[#2E7D32]`}>
                <span aria-hidden="true" className="h-px w-8 bg-[#2E7D32]" />
                The Eau Clair story
              </p>
              <h1 id="about-heading" className="text-6xl font-light leading-[1.04] tracking-[-0.035em] sm:text-7xl xl:text-[6.5rem]">
                From nature.
                <br />
                <span className="text-[#2E7D32]">With care.</span>
              </h1>
              <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-[#52686D] sm:text-xl">
                Bringing nature&apos;s purity to your everyday. For over 50 years,
                we&apos;ve shared a simple belief: good water deserves extraordinary care.
              </p>
              <a href="#our-story" className={`group mt-9 inline-flex min-h-12 items-center gap-5 border-b border-[#173D48]/30 pb-2 font-medium ${focusRing}`}>
                Discover our story
                <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-y-1 motion-reduce:transition-none" />
              </a>
            </div>

            <div className="relative pb-6 pl-5 sm:pl-8 lg:pl-0">
              <div className="relative aspect-[5/4] overflow-hidden rounded-t-[9rem] rounded-b-2xl bg-[#DCE8EA] sm:aspect-[6/5] lg:aspect-[5/6] lg:rounded-t-[13rem]">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                  alt="Layers of mountain peaks beneath a soft evening sky"
                  fill
                  priority
                  sizes="(min-width: 1280px) 544px, (min-width: 1024px) 46vw, (min-width: 640px) 85vw, 90vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#173D48]/45 via-transparent to-transparent" />
                <p className="absolute bottom-7 right-7 hidden text-sm tracking-wide text-white sm:block">Inspired by the natural world.</p>
              </div>
              <div className="absolute bottom-0 left-0 flex items-center gap-4 rounded-xl border border-[#E2EBE7] bg-white p-5 shadow-[0_10px_30px_-20px_#173D4850] sm:p-6 lg:-left-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-tl-full rounded-tr-full rounded-br-full bg-[#E8F5E9] text-[#2E7D32]">
                  <Droplet aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <p className={`${eyebrow} text-[#52686D]`}>Our commitment</p>
                  <p className="mt-1 text-xl font-medium">Pure care. Since 1974.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Eau Clair in numbers" className="border-b border-[#DFE8E5] px-6 md:px-8">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 py-10 sm:py-12 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`flex flex-col items-center gap-2 px-3 text-center ${index % 2 === 1 ? 'border-l border-[#DFE8E5]' : ''} ${index === 2 ? 'md:border-l md:border-[#DFE8E5]' : ''}`}>
                <dt className="order-2 text-xs tracking-wider text-[#52686D] sm:text-sm">{stat.label}</dt>
                <dd className="text-4xl font-light tracking-tight text-[#1565C0] sm:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="our-story" aria-labelledby="story-heading" className="scroll-mt-24 px-6 py-20 md:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <p className={`${eyebrow} mb-5 text-[#2E7D32]`}>01 / Our beginnings</p>
              <h2 id="story-heading" className="max-w-md text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                A simple belief.
                <br />
                A lasting <span className="text-[#1565C0]">promise.</span>
              </h2>
            </div>
            <div className="space-y-6 text-lg font-light leading-relaxed text-[#52686D]">
              <p className="text-xl text-[#173D48] sm:text-2xl">
                The best water begins with nature. Our story begins with a commitment to keeping it that way.
              </p>
              <p>
                Eau Clair was born from a simple belief: that the best water comes directly
                from nature, untouched and pure. Our founders discovered pristine mountain
                springs, where water flows naturally through ancient mineral deposits.
              </p>
              <p>
                Today, we continue that tradition, protecting our water sources and the
                ecosystems around them. Every bottle represents our commitment to water
                exactly as nature intended — pure, balanced, and refreshing.
              </p>
              <p className="border-l-2 border-[#2E7D32] pl-6 text-xl text-[#173D48]">
                A natural treasure, shared with families who value quality, health, and sustainability.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="values-heading" className="relative overflow-hidden bg-[#F3F8F6] px-6 pb-24 pt-20 md:px-8 lg:pb-32 lg:pt-24">
          <div className="relative z-20 mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
              <div>
                <p className={`${eyebrow} mb-5 text-[#2E7D32]`}>02 / What matters to us</p>
                <h2 id="values-heading" className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">Care in every drop.</h2>
              </div>
              <p className="max-w-sm text-lg font-light leading-relaxed text-[#52686D]">
                From the source to your table, our values shape everything we do.
              </p>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <article key={value.title} className="border-t border-[#CADBD2] pt-6">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-tl-full rounded-tr-full rounded-br-full bg-white text-[#2E7D32]">
                      <value.icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <span aria-hidden="true" className="text-sm text-[#52686D]">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-medium">{value.title}</h3>
                  <p className="font-light leading-relaxed text-[#52686D]">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
          <WaveDivider height="h-12 md:h-20" />
        </section>

        <section aria-labelledby="leadership-heading" className="px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:pt-8">
              <p className={`${eyebrow} mb-5 text-[#1565C0]`}>03 / Our people</p>
              <h2 id="leadership-heading" className="max-w-sm text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl">
                The people
                <br />
                behind the <span className="text-[#2E7D32]">promise.</span>
              </h2>
              <p className="mt-6 max-w-sm text-lg font-light leading-relaxed text-[#52686D]">
                Meet the people guiding Eau Clair&apos;s commitment to quality, care, and the natural world.
              </p>
              <Link href="/contact" className={`group mt-8 inline-flex min-h-11 items-center gap-4 font-medium text-[#1565C0] ${focusRing}`}>
                Get in touch
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
              {founders.map((founder, index) => (
                <article key={founder.name} className={index === 1 ? 'sm:pt-12' : ''}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F3F8F6]">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      sizes="(min-width: 1280px) 288px, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-5 border-b border-[#DFE8E5] pb-5">
                    <h3 className="text-2xl font-medium">{founder.name}</h3>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-[#1565C0]">{founder.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="products-heading" className="px-6 pb-20 pt-4 md:px-8 lg:pb-28 lg:pt-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#173D48] px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-44 h-[32rem] w-[32rem] rounded-full border border-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-[26rem] w-[26rem] rounded-full border border-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-20 h-[20rem] w-[20rem] rounded-full border border-white/10" />
            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
              <div>
                <p className={`${eyebrow} mb-5 text-[#B9DCD0]`}>Naturally refreshing</p>
                <h2 id="products-heading" className="text-4xl font-light leading-tight tracking-tight sm:text-5xl">A little more care.<br />In every bottle.</h2>
                <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-white/80">
                  Discover the Eau Clair collection and make pure refreshment part of your everyday.
                </p>
              </div>
              <Link href="/products" className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-6 self-start rounded-full bg-white px-8 py-4 font-medium text-[#173D48] transition-colors hover:bg-[#E8F5E9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:self-auto">
                Explore our water
                <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
