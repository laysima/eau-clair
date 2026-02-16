import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { type EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')

  console.log('Auth callback triggered:', { code, token_hash, type })

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code:', error)
      return NextResponse.redirect(new URL('/login?error=Could not authenticate', requestUrl.origin))
    }
  }

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as EmailOtpType,
    })

    if (error) {
      console.error('Error verifying OTP:', error)
      return NextResponse.redirect(new URL('/login?error=Could not authenticate', requestUrl.origin))
    }
  }

  // Redirect to reset password page
  return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
}