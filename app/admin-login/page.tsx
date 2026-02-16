'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Shield, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Incorrect email or password. Please try again.')
      setIsLoading(false)
      return
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single()

    if (!profile) {
      await supabase.auth.signOut()
      setError('Profile not found. Please contact support.')
      setIsLoading(false)
      return
    }

    if (!profile.is_admin) {
      await supabase.auth.signOut()
      setError('Access denied. Admin privileges required.')
      setIsLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#42A5F5] flex items-center justify-center px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Eau Clair" 
              width={120} 
              height={48}
              className="mx-auto mb-8 brightness-0 invert"
            />
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-4">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-sm text-white font-medium tracking-widest uppercase">Admin Access</span>
          </div>
          <h1 className="text-4xl font-light text-white mb-2">Admin Portal</h1>
          <p className="text-white/80 font-light">Secure administrative login</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-white px-4 py-3 text-sm font-light">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-md p-8 border border-white/20 shadow-2xl">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="admin@eauclair.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full bg-white text-[#1565C0] py-3 hover:bg-white/90 transition-all font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Access Admin Panel</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Links */}
          <div className="text-center pt-4 border-t border-white/20">
            <p className="text-sm text-white/80 font-light">
              Not an admin?{' '}
              <Link href="/login" className="text-white hover:text-white/80 font-medium">
                User login
              </Link>
            </p>
          </div>
        </form>

        {/* Warning */}
        <div className="bg-[#2E7D32]/20 backdrop-blur-sm border border-[#66BB6A]/30 text-white/90 px-4 py-3 text-xs font-light text-center">
          This area is restricted to authorized personnel only
        </div>
      </div>
    </div>
  )
}