import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    const { data, error } = await resend.emails.send({
      from: 'Eau Clair <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Eau Clair!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1565C0;">Welcome to Eau Clair, ${name}!</h2>
          <p>Thank you for creating an account with us.</p>
          <p>We're excited to have you join our community of water enthusiasts.</p>
          <p>Enjoy premium natural water from nature's most pristine springs!</p>
          <br>
          <p>Best regards,<br><strong>The Eau Clair Team</strong></p>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Welcome email sent successfully:', data)
    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('Error sending welcome email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}