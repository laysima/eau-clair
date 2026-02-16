'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { LogOut, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(id)
      if (element) {
        const navHeight = 60
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - navHeight
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    setMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setMobileMenuOpen(false)
    window.location.href = '/'
  }

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-sm py-2' 
          : 'bg-white/95 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            alt="Eau Clair" 
            width={100} 
            height={40}
            className="transition-all duration-300"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-light text-gray-700 tracking-wide">
          <Link 
            href="/" 
            className={`transition-colors ${
              isActive('/') && pathname === '/' 
                ? 'text-[#1565C0] font-medium border-b-2 border-[#1565C0] pb-1' 
                : 'hover:text-[#1565C0]'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors ${
              isActive('/about') 
                ? 'text-[#1565C0] font-medium border-b-2 border-[#1565C0] pb-1' 
                : 'hover:text-[#1565C0]'
            }`}
          >
            About
          </Link>
          <Link 
            href="/products" 
            className={`transition-colors ${
              isActive('/products') 
                ? 'text-[#1565C0] font-medium border-b-2 border-[#1565C0] pb-1' 
                : 'hover:text-[#1565C0]'
            }`}
          >
            Products
          </Link>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-[#1565C0] transition-colors"
          >
            Contact
          </button>
        </div>
        
        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-light">
                {user.email?.split('@')[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="w-8 h-8 border border-gray-300 hover:border-[#1565C0] flex items-center justify-center group transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-gray-600 group-hover:text-[#1565C0] transition-colors" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm text-gray-700 hover:text-[#1565C0] transition-colors font-light tracking-wide"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="border border-[#1565C0] text-[#1565C0] px-5 py-2 hover:bg-[#1565C0] hover:text-white transition-all text-sm font-light tracking-wide"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <button 
              onClick={handleLogout}
              className="w-8 h-8 border border-gray-300 hover:border-[#1565C0] flex items-center justify-center transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-gray-600" />
            </button>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-[#1565C0] transition-all"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-gray-700" />
            ) : (
              <Menu className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            <Link 
              href="/" 
              className={`block py-2 text-sm tracking-wide ${
                isActive('/') && pathname === '/' 
                  ? 'text-[#1565C0] font-medium border-l-2 border-[#1565C0] pl-3' 
                  : 'text-gray-700 hover:text-[#1565C0] font-light'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block py-2 text-sm tracking-wide ${
                isActive('/about') 
                  ? 'text-[#1565C0] font-medium border-l-2 border-[#1565C0] pl-3' 
                  : 'text-gray-700 hover:text-[#1565C0] font-light'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/products" 
              className={`block py-2 text-sm tracking-wide ${
                isActive('/products') 
                  ? 'text-[#1565C0] font-medium border-l-2 border-[#1565C0] pl-3' 
                  : 'text-gray-700 hover:text-[#1565C0] font-light'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block text-left text-gray-700 hover:text-[#1565C0] transition-colors font-light text-sm tracking-wide w-full py-2"
            >
              Contact
            </button>
            
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