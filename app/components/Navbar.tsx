'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { LogOut, Menu, X } from 'lucide-react'

const LINKS: [label: string, href: string][] = [
  ['Home', '/'],
  ['About', '/about'],
  ['Products', '/products'],
  ['Contact', '/contact'],
]

/** Roughly the vertical middle of the bar — what the links actually sit over. */
const PROBE_Y = 32

/**
 * The bar never paints a solid background, border or shadow. At the top of a
 * page it is fully clear; once scrolled it becomes tinted frosted glass, which
 * blurs whatever passes underneath so the links stay legible without a strip.
 *
 * Sections marked data-nav-theme="dark" flip the links to white while they sit
 * under the bar, so the text never disappears into navy.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 50)
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]')).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= PROBE_Y && r.bottom >= PROBE_Y
      })
      setOverDark(dark)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    // Read once on mount too, so a reload part-way down the page starts right.
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setMobileMenuOpen(false)
    window.location.href = '/'
  }

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path))

  // With the mobile menu open the bar joins the white dropdown beneath it, so
  // it goes solid and dark-on-light for as long as the menu is showing.
  const dark = overDark && !mobileMenuOpen

  const desktopLink = (active: boolean) =>
    active
      ? `font-medium border-b-2 pb-1 ${dark ? 'text-white border-white' : 'text-[#1565C0] border-[#1565C0]'}`
      : dark
        ? 'text-white/80 hover:text-white'
        : 'text-gray-700 hover:text-[#1565C0]'

  // A frosted backing keeps the button findable where it lands on the hero
  // photo (on phones that is right over the subject's hair).
  const iconButton = `w-8 h-8 border flex items-center justify-center transition-all ${
    dark
      ? 'border-white/40 hover:border-white text-white'
      : 'border-gray-300 bg-white/70 backdrop-blur-sm hover:border-[#1565C0] text-gray-700'
  }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-white py-3'
          : scrolled
            ? // A plain blur isn't enough over busy photos — links vanish into
              // them — so tint the glass toward whichever ink it is carrying.
              `backdrop-blur-lg backdrop-saturate-150 py-2 ${dark ? 'bg-[#04182f]/35' : 'bg-white/45'}`
            : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Contain the PNG's transparent padding without shrinking the logo. */}
        <Link href="/" className="relative block h-10 w-[100px] flex-shrink-0 overflow-hidden">
          <Image
            src="/logo.png"
            alt="Eau Clair"
            width={1280}
            height={1028}
            unoptimized
            className={`absolute top-1/2 h-auto w-full -translate-y-1/2 transition-[filter] duration-300 ${
              dark ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-light tracking-wide">
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} className={`transition-colors ${desktopLink(isActive(href))}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className={`text-sm font-light transition-colors ${dark ? 'text-white/80' : 'text-gray-600'}`}>
                {user.email?.split('@')[0]}
              </span>
              <button onClick={handleLogout} className={`group ${iconButton}`} title="Logout">
                <LogOut className={`w-4 h-4 transition-colors ${dark ? '' : 'text-gray-600 group-hover:text-[#1565C0]'}`} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`text-sm transition-colors font-light tracking-wide ${
                  dark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-[#1565C0]'
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={`border px-5 py-2 transition-all text-sm font-light tracking-wide ${
                  dark
                    ? 'border-white text-white hover:bg-white hover:text-[#04182f]'
                    : 'border-[#1565C0] text-[#1565C0] hover:bg-[#1565C0] hover:text-white'
                }`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <button onClick={handleLogout} className={iconButton} title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={iconButton}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`block py-2 text-sm tracking-wide ${
                  isActive(href)
                    ? 'text-[#1565C0] font-medium border-l-2 border-[#1565C0] pl-3'
                    : 'text-gray-700 hover:text-[#1565C0] font-light'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {!user && (
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-[#1565C0] transition-colors font-light text-sm tracking-wide py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block text-center border border-[#1565C0] text-[#1565C0] px-5 py-2 hover:bg-[#1565C0] hover:text-white transition-all text-sm font-light tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
