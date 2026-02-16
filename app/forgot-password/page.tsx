'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const emailInput = formData.get('email') as string

    try {
      const supabase = createClient()

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        emailInput,
        {
            redirectTo: `${window.location.origin}/auth/callback`,
        }
        )

      if (resetError) {
        setError(resetError.message)
        setIsLoading(false)
        return
      }

      setEmail(emailInput)
      setSuccess(true)
      setIsLoading(false)

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
            <h1 className="text-4xl font-light text-gray-900">Check Your Email</h1>
            <p className="text-xl text-gray-600 font-light">
              We&apos;ve sent password reset instructions to:
            </p>
            <p className="text-lg font-medium text-[#1565C0]">{email}</p>
            <p className="text-sm text-gray-500 font-light">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>
          </div>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 text-[#1565C0] hover:text-[#42A5F5] font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </Link>
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
          <h1 className="text-4xl font-light text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600 font-light">Enter your email to receive reset instructions</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm font-light">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-gray-200 shadow-lg">
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1565C0] text-white py-3 hover:bg-[#42A5F5] transition-all font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>

          {/* Links */}
          <div className="text-center pt-4 border-t border-gray-200">
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1565C0] transition-colors font-light text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}