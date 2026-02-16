import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-linear-to-b from-[#1565C0] to-[#0D47A1]">
      {/* Wavy Blue Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-24 md:h-32"
        >
          <path 
            d="M0,60 C240,90 360,90 600,60 C840,30 960,30 1200,60 C1320,75 1380,75 1440,60 L1440,0 L0,0 Z" 
            fill="#42A5F5"
            opacity="0.5"
          />
          <path 
            d="M0,40 C200,70 400,70 720,40 C1040,10 1240,10 1440,40 L1440,0 L0,0 Z" 
            fill="#90CAF9"
            opacity="0.4"
          />
          <path 
            d="M0,20 C320,50 480,50 840,20 C1200,0 1320,0 1440,20 L1440,0 L0,0 Z" 
            fill="#E3F2FD"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-24 pt-40">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Image 
              src="/logo.png" 
              alt="Eau Clair" 
              width={120} 
              height={48}
              className="brightness-0 invert"
            />
            <p className="text-white/90 font-light leading-relaxed">
              Premium natural water sourced from pristine springs, perfected by nature.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all text-white"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm tracking-[0.3em] text-white uppercase font-medium mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors font-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors font-light">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors font-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm tracking-[0.3em] text-white uppercase font-medium mb-6">
              Products
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors font-light">
                  Spring Water
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors font-light">
                  Mineral Water
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors font-light">
                  Sparkling Water
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors font-light">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-[0.3em] text-white uppercase font-medium mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80 font-light">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  123 Water Street<br />
                  Spring Valley, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/80 font-light">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <a href="tel:+18888888888" className="hover:text-white transition-colors">
                  (888) 888-8888
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80 font-light">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <a href="mailto:info@eauclair.com" className="hover:text-white transition-colors">
                  info@eauclair.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm font-light">
              © {new Date().getFullYear()} Eau Clair. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-light">
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}