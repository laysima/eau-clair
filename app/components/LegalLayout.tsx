import Link from 'next/link'
import Navbar from './Navbar'
import Footer from './Footer'

export type LegalSection = {
  heading: string
  /** Paragraphs of body copy. */
  body?: string[]
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[]
}

/** Shared chrome for the policy pages so they stay visually consistent. */
export default function LegalLayout({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        <section className="py-20 md:py-28 px-6 md:px-8 bg-gradient-to-b from-white via-[#E3F2FD]/20 to-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
              {eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 font-light leading-relaxed">{intro}</p>
            <p className="text-sm text-gray-500 font-light">Last updated {updated}</p>
          </div>
        </section>

        <section className="pb-24 px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Contents */}
            <nav aria-label="Contents" className="border border-gray-200 p-6 md:p-8 mb-16">
              <h2 className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 mb-4">
                On this page
              </h2>
              <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 font-light">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#section-${i + 1}`}
                      className="hover:text-[#1565C0] transition-colors"
                    >
                      <span className="text-gray-400 mr-2">{i + 1}.</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.heading} id={`section-${i + 1}`} className="scroll-mt-28">
                  <h2 className="text-2xl font-light text-gray-900 mb-4">
                    <span className="text-[#1565C0] mr-3">{i + 1}.</span>
                    {s.heading}
                  </h2>
                  <div className="space-y-4">
                    {s.body?.map((p) => (
                      <p key={p} className="text-gray-600 font-light leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {s.bullets && (
                      <ul className="space-y-2 pl-1">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="text-gray-600 font-light leading-relaxed flex gap-3"
                          >
                            <span className="text-[#1565C0] shrink-0">—</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-x-8 gap-y-3 text-gray-600 font-light">
              <span>Questions about this page?</span>
              <Link href="/contact" className="text-[#1565C0] hover:underline">
                Get in touch
              </Link>
              <Link href="/privacy" className="text-[#1565C0] hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#1565C0] hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
