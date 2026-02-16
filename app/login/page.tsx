'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Incorrect email or password. Please try again.')
      setIsLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E3F2FD]/20 to-white flex items-center justify-center px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Eau Clair" 
              width={120} 
              height={48}
              className="mx-auto mb-8"
            />
          </Link>
          <h1 className="text-4xl font-light text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 font-light">Sign in to your account</p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="bg-[#E8F5E9] border border-[#2E7D32] text-[#2E7D32] px-4 py-3 text-sm font-light">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm font-light">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-gray-200 shadow-lg">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-[#1565C0] hover:text-[#42A5F5] font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full bg-[#1565C0] text-white py-3 hover:bg-[#42A5F5] transition-all font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Links */}
          <div className="text-center space-y-2 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-light">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#1565C0] hover:text-[#42A5F5] font-medium">
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-500 font-light">
              Admin?{' '}
              <Link href="/admin-login" className="text-[#2E7D32] hover:text-[#66BB6A]">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}