'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [checkingToken, setCheckingToken] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user has a valid reset token
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      console.log('Session check:', session)
      
      if (session) {
        setIsValidToken(true)
      } else {
        setError('Invalid or expired reset link. Please request a new one.')
      }
      setCheckingToken(false)
    }

    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) {
        setError(updateError.message)
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login?message=Password reset successfully! Please sign in.')
      }, 3000)

    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  if (checkingToken) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white via-[#E3F2FD]/20 to-white flex items-center justify-center px-8 py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1565C0] mx-auto mb-4" />
          <p className="text-gray-600 font-light">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white via-[#E3F2FD]/20 to-white flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-[#2E7D32]" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-light text-gray-900">Password Reset!</h1>
            <p className="text-xl text-gray-600 font-light">
              Your password has been successfully reset.
            </p>
            <p className="text-sm text-gray-500 font-light">
              Redirecting you to login...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!isValidToken && error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white via-[#E3F2FD]/20 to-white flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 font-light">
            {error}
          </div>
          <Link 
            href="/forgot-password"
            className="inline-block bg-[#1565C0] text-white px-8 py-3 hover:bg-[#42A5F5] transition-all font-medium tracking-wide"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#E3F2FD]/20 to-white flex items-center justify-center px-8 py-12">
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
          <h1 className="text-4xl font-light text-gray-900 mb-2">Set New Password</h1>
          <p className="text-gray-600 font-light">Choose a strong password for your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm font-light">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-gray-200 shadow-lg">
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
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
            className="w-full bg-[#1565C0] text-white py-3 hover:bg-[#42A5F5] transition-all font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Resetting...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}