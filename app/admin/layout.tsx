import Link from 'next/link'
import { requireAdmin } from '../lib/auth'
import { logout } from '../actions/auth'
import { Package, ShoppingCart, Users, ArrowLeft, LogOut } from 'lucide-react'

/**
 * The admin area stands on its own: no public site navbar, just the sidebar.
 * The account controls that used to live in that navbar sit at the foot of the
 * sidebar instead, with sign-out posted straight to the existing server action.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAdmin() // redirects if not signed in as an admin

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 flex w-64 flex-col overflow-y-auto border-r border-white/10 bg-linear-to-b from-[#1565C0] to-[#0D47A1] p-8">
        <div className="mb-12 border-b border-white/20 pb-6">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/60">Dashboard</p>
          <h2 className="text-2xl font-light text-white">Admin Panel</h2>
        </div>

        <nav aria-label="Admin" className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 border-l-2 border-white bg-white/10 px-4 py-3 text-sm font-medium tracking-wide text-white"
          >
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          {/* Not built yet — rendered inert so it cannot 404. */}
          <span
            aria-disabled="true"
            title="Coming soon"
            className="flex cursor-not-allowed items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm font-light tracking-wide text-white/35"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Orders</span>
            <span className="ml-auto border border-white/25 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
              Soon
            </span>
          </span>
          {/* Not built yet — rendered inert so it cannot 404. */}
          <span
            aria-disabled="true"
            title="Coming soon"
            className="flex cursor-not-allowed items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm font-light tracking-wide text-white/35"
          >
            <Users className="h-5 w-5" />
            <span>Customers</span>
            <span className="ml-auto border border-white/25 px-1.5 py-0.5 text-[10px] uppercase tracking-widest">
              Soon
            </span>
          </span>
        </nav>

        {/* Pinned to the foot of the sidebar */}
        <div className="mt-auto space-y-2 border-t border-white/20 pt-6">
          <Link
            href="/"
            className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm font-light tracking-wide text-white/70 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 border-l-2 border-transparent px-4 py-3 text-left text-sm font-light tracking-wide text-white/70 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </form>

          {user.email && (
            <p className="truncate px-4 pt-2 text-xs font-light text-white/50" title={user.email}>
              Signed in as {user.email}
            </p>
          )}
        </div>
      </aside>

      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  )
}
