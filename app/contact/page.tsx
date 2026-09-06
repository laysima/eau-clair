'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Truck,
  Building2,
  Newspaper,
  LifeBuoy,
  Plus,
  Minus,
  ArrowRight,
} from 'lucide-react'

const CHANNELS = [
  {
    icon: Phone,
    label: 'Call us',
    lines: ['(888) 888-8888'],
    detail: 'Mon–Fri, 8am–6pm PT',
    href: 'tel:+18888888888',
  },
  {
    icon: Mail,
    label: 'Email us',
    lines: ['info@eauclair.com'],
    detail: 'We reply within one business day',
    href: 'mailto:info@eauclair.com',
  },
  {
    icon: MapPin,
    label: 'Visit us',
    lines: ['123 Water Street', 'Spring Valley, CA 90210'],
    detail: 'Visitor centre open weekdays',
    href: 'https://maps.google.com/?q=123+Water+Street+Spring+Valley+CA+90210',
  },
  {
    icon: Clock,
    label: 'Opening hours',
    lines: ['Mon–Fri  8:00 – 18:00', 'Sat  9:00 – 14:00'],
    detail: 'Closed Sundays & public holidays',
  },
]

const DEPARTMENTS = [
  {
    icon: Truck,
    title: 'Wholesale & bulk',
    description: 'Pallet pricing, standing orders and delivery schedules for retailers and offices.',
    email: 'wholesale@eauclair.com',
  },
  {
    icon: LifeBuoy,
    title: 'Customer support',
    description: 'Order tracking, damaged deliveries, returns and anything about a purchase.',
    email: 'support@eauclair.com',
  },
  {
    icon: Building2,
    title: 'Partnerships',
    description: 'Distribution, hospitality, events and co-branded projects.',
    email: 'partners@eauclair.com',
  },
  {
    icon: Newspaper,
    title: 'Press & media',
    description: 'Interviews, product samples, brand assets and our press kit.',
    email: 'press@eauclair.com',
  },
]

const FAQS = [
  {
    q: 'Do you deliver to my area?',
    a: 'We deliver across California and ship nationwide within the continental United States. Orders over $60 ship free; everything else is a flat $7.50. Enter your postcode at checkout to see exact timing for your address.',
  },
  {
    q: 'Can I order in bulk for my office or event?',
    a: 'Yes. We supply offices, gyms, hotels and events by the case or the pallet, with recurring delivery schedules and volume pricing. Email wholesale@eauclair.com with your quantity and postcode and we will send a quote within one business day.',
  },
  {
    q: 'Where does Eau Clair water actually come from?',
    a: 'Our water is vapour distilled and then re-mineralised with a balanced electrolyte blend for taste. We publish a full mineral analysis for every production batch, and the batch code printed on your bottle tells you exactly which run it came from.',
  },
  {
    q: 'Are your bottles recyclable?',
    a: 'Every bottle, cap and label we produce is fully recyclable, and our bottles are made with recycled PET. We are steadily reducing the plastic in each bottle without compromising how it holds up in transit.',
  },
  {
    q: 'Something arrived damaged. What now?',
    a: 'Send a photo of the damage and your order number to support@eauclair.com within 14 days of delivery and we will replace or refund it. You do not need to return the damaged goods.',
  },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          topic: data.get('topic'),
          message: data.get('message'),
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Could not send your message.')
        setStatus('error')
        return
      }

      form.reset()
      setStatus('sent')
    } catch {
      setError('Could not reach the server. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 font-light ' +
    'placeholder:text-gray-400 focus:border-[#1565C0] focus:outline-none transition-colors'
  const labelClass = 'block text-xs tracking-[0.2em] text-gray-500 uppercase font-medium mb-2'

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-white via-[#E3F2FD]/20 to-white">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
              Get in Touch
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight">
              Let&apos;s Start a <span className="font-medium text-[#2E7D32]">Conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Whether you are stocking your shelves, planning an event or simply curious about
              what goes into every bottle — we read every message and we answer quickly.
            </p>
          </div>
        </section>

        {/* Contact channels */}
        <section className="px-6 md:px-8 pb-8">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {CHANNELS.map((c) => {
              const inner = (
                <div className="h-full bg-white p-8 space-y-4 transition-colors group-hover:bg-[#E3F2FD]/25">
                  <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1565C0] text-[#1565C0] transition-all group-hover:bg-[#1565C0] group-hover:text-white">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500">
                    {c.label}
                  </h3>
                  <div className="space-y-1">
                    {c.lines.map((line) => (
                      <p key={line} className="text-lg text-gray-900 font-light leading-snug">
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 font-light">{c.detail}</p>
                </div>
              )

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group block"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="group">
                  {inner}
                </div>
              )
            })}
          </div>
        </section>

        {/* Form + departments */}
        <section className="py-20 md:py-24 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="space-y-3 mb-10">
                <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
                  Send a Message
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  Tell us what you need
                </h2>
              </div>

              {status === 'sent' ? (
                <div className="border border-[#2E7D32] bg-[#E8F5E9]/40 p-10 text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-[#2E7D32] mx-auto" />
                  <h3 className="text-2xl font-light text-gray-900">Message sent</h3>
                  <p className="text-gray-600 font-light leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out. A confirmation is on its way to your inbox and
                    someone from our team will reply within one business day.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 text-[#1565C0] font-medium hover:gap-3 transition-all pt-2"
                  >
                    Send another message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name <span className="text-[#1565C0]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Jordan Rivers"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-[#1565C0]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone <span className="text-gray-400 normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        maxLength={40}
                        autoComplete="tel"
                        placeholder="(888) 888-8888"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="topic" className={labelClass}>
                        What is this about?
                      </label>
                      <select id="topic" name="topic" defaultValue="general" className={fieldClass}>
                        <option value="general">General enquiry</option>
                        <option value="wholesale">Wholesale &amp; bulk orders</option>
                        <option value="support">Product support</option>
                        <option value="partnership">Partnerships</option>
                        <option value="press">Press &amp; media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message <span className="text-[#1565C0]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      maxLength={5000}
                      placeholder="Tell us a little about what you are looking for…"
                      className={`${fieldClass} resize-y`}
                    />
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 font-light"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group bg-[#1565C0] text-white px-8 py-4 flex items-center justify-center gap-3 hover:bg-[#0D47A1] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-medium tracking-wide">Sending…</span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium tracking-wide">Send message</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-sm text-gray-500 font-light">
                      We never share your details. Read our{' '}
                      <Link href="/privacy" className="text-[#1565C0] hover:underline">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Departments */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-3">
                <p className="text-sm tracking-[0.3em] text-[#2E7D32] uppercase font-medium">
                  Straight to the Team
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                  Skip the queue
                </h2>
                <p className="text-gray-600 font-light leading-relaxed">
                  Know who you need? Write to them directly and you will hear back sooner.
                </p>
              </div>

              <div className="space-y-px bg-gray-200 border border-gray-200">
                {DEPARTMENTS.map((d) => (
                  <a
                    key={d.title}
                    href={`mailto:${d.email}`}
                    className="group flex gap-4 bg-white p-6 transition-colors hover:bg-[#E3F2FD]/25"
                  >
                    <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 border border-[#2E7D32] text-[#2E7D32] transition-all group-hover:bg-[#2E7D32] group-hover:text-white">
                      <d.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-gray-900">{d.title}</h3>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        {d.description}
                      </p>
                      <p className="text-sm text-[#1565C0] font-light pt-1">{d.email}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visit */}
        <section className="py-20 md:py-24 px-6 md:px-8 bg-gradient-to-b from-white to-[#E3F2FD]/25">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">
                Come and See
              </p>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                The source is open to <span className="font-medium text-[#2E7D32]">visitors</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                Our visitor centre sits beside the spring itself. Tours run twice a day on
                weekdays and take you through collection, distillation and bottling — the whole
                journey from ground to bottle in about forty minutes.
              </p>
              <p className="text-gray-600 font-light leading-relaxed">
                Tours are free, but places are limited. Email ahead and we will hold a spot.
              </p>
              <a
                href="https://maps.google.com/?q=123+Water+Street+Spring+Valley+CA+90210"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-2 border-[#1565C0] text-[#1565C0] px-8 py-4 hover:bg-[#1565C0] hover:text-white transition-all font-medium tracking-wide"
              >
                Get directions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-white border border-gray-200 p-8 md:p-10 space-y-8">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#1565C0] shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 mb-2">
                    Head office &amp; springhouse
                  </h3>
                  <p className="text-lg text-gray-900 font-light leading-relaxed">
                    123 Water Street
                    <br />
                    Spring Valley, CA 90210
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-[#1565C0] shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 mb-3">
                    Visitor centre hours
                  </h3>
                  <dl className="space-y-2 text-gray-900 font-light">
                    {[
                      ['Monday – Friday', '8:00 – 18:00'],
                      ['Saturday', '9:00 – 14:00'],
                      ['Sunday', 'Closed'],
                    ].map(([day, hours]) => (
                      <div key={day} className="flex justify-between gap-4">
                        <dt>{day}</dt>
                        <dd className={hours === 'Closed' ? 'text-gray-400' : ''}>{hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              <div className="flex gap-4">
                <Truck className="w-5 h-5 text-[#1565C0] shrink-0 mt-1" />
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase font-medium text-gray-500 mb-2">
                    Deliveries &amp; collections
                  </h3>
                  <p className="text-gray-900 font-light leading-relaxed">
                    Goods entrance on Cedar Lane, weekdays 7:00 – 16:00. Please book pallet
                    collections at least 24 hours ahead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-24 px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <p className="text-sm tracking-[0.3em] text-[#2E7D32] uppercase font-medium">
                Before You Write
              </p>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900">
                Frequently asked
              </h2>
            </div>

            <div className="border-t border-gray-200">
              {FAQS.map((faq, i) => {
                const open = openFaq === i
                return (
                  <div key={faq.q} className="border-b border-gray-200">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                      >
                        <span className="text-lg md:text-xl font-light text-gray-900 group-hover:text-[#1565C0] transition-colors">
                          {faq.q}
                        </span>
                        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-500 transition-all group-hover:border-[#1565C0] group-hover:text-[#1565C0]">
                          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                    </h3>
                    {open && (
                      <p className="text-gray-600 font-light leading-relaxed pb-6 pr-14">
                        {faq.a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <p className="text-center text-gray-600 font-light mt-12">
              Still stuck?{' '}
              <a href="mailto:info@eauclair.com" className="text-[#1565C0] hover:underline">
                Email us directly
              </a>{' '}
              and we will sort it out.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
