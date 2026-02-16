'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string): boolean => {
    const allowedDomains = ['@gmail.com', '@hotmail.com', '@yahoo.com']
    const emailLower = email.toLowerCase()
    return allowedDomains.some(domain => emailLower.endsWith(domain))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate email domain
    if (!validateEmail(email)) {
      setError('Please use a Gmail, Hotmail, or Yahoo email address.')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        console.error('Signup error:', signUpError)
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      // Send welcome email
      if (data?.user) {
        try {
          await fetch('/api/send-welcome-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email, 
              name: email.split('@')[0] 
            })
          })
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError)
          // Don't block signup if email fails
        }
      }

      // Show success message
      setSuccess(true)
      setIsLoading(false)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/login?message=Account created successfully! Please sign in.')
      }, 3000)

    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#E3F2FD]/20 to-white flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-[#2E7D32]" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-light text-gray-900">Account Created!</h1>
            <p className="text-xl text-gray-600 font-light">
              Welcome to Eau Clair! A welcome email has been sent to your inbox.
            </p>
            <p className="text-sm text-gray-500 font-light">
              Redirecting you to login...
            </p>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-4xl font-light text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 font-light">Join Eau Clair today</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm font-light">
            {error}
          </div>
        )}

        {/* Allowed Email Notice */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 text-sm font-light">
          Please use Gmail, Hotmail, or Yahoo email addresses only.
        </div>

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
                  placeholder="you@gmail.com"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 font-light">
                Use @gmail.com, @hotmail.com, or @yahoo.com
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 font-light">Minimum 6 characters</p>
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
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Links */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-light">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1565C0] hover:text-[#42A5F5] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}