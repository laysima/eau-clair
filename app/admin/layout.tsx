import Navbar from '../components/Navbar'
import Link from 'next/link'
import { requireAdmin } from '../lib/auth'
import { Package, ShoppingCart, Users, ArrowLeft } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin() // This will redirect if not admin

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        {/* Admin Sidebar */}
        <div className="flex">
          <aside className="w-64 bg-linear-to-b from-[#1565C0] to-[#0D47A1] border-r border-white/10 min-h-screen p-8 fixed">
            <div className="mb-12 pb-6 border-b border-white/20">
              <p className="text-xs tracking-[0.3em] text-white/60 uppercase mb-2">Dashboard</p>
              <h2 className="text-2xl font-light text-white">Admin Panel</h2>
            </div>
            
            <nav className="space-y-2">
              <Link 
                href="/admin" 
                className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white border-l-2 border-white font-medium text-sm tracking-wide"
              >
                <Package className="w-5 h-5" />
                <span>Products</span>
              </Link>
              <Link 
                href="/admin/orders" 
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-white/30 transition font-light text-sm tracking-wide"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Orders</span>
              </Link>
              <Link 
                href="/admin/customers" 
                className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-white/30 transition font-light text-sm tracking-wide"
              >
                <Users className="w-5 h-5" />
                <span>Customers</span>
              </Link>
              
              <div className="pt-8 mt-8 border-t border-white/20">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-white/30 transition font-light text-sm tracking-wide"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Site</span>
                </Link>
              </div>
            </nav>
          </aside>
          
          <main className="ml-64 flex-1 p-8 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}