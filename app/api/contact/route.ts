import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/** Where enquiries land. Override with CONTACT_INBOX in the environment. */
const INBOX = process.env.CONTACT_INBOX || 'info@eauclair.com'

const TOPICS: Record<string, string> = {
  general: 'General enquiry',
  wholesale: 'Wholesale & bulk orders',
  support: 'Product support',
  partnership: 'Partnerships',
  press: 'Press & media',
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const topic = String(body.topic ?? 'general').trim()
    const message = String(body.message ?? '').trim()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (name.length > 120 || email.length > 200 || phone.length > 40 || message.length > 5000) {
      return NextResponse.json({ error: 'That message is too long.' }, { status: 400 })
    }

    const topicLabel = TOPICS[topic] ?? TOPICS.general

    const { error } = await resend.emails.send({
      from: 'Eau Clair <onboarding@resend.dev>',
      to: INBOX,
      replyTo: email,
      subject: `[${topicLabel}] Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1565C0; font-weight: 400;">New enquiry from the website</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0;"><strong>${esc(name)}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${esc(email)}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${esc(phone)}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Topic</td><td style="padding: 8px 0;">${esc(topicLabel)}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #E3F2FD; margin: 24px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.7; color: #1a1a1a;">${esc(message)}</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Could not send your message.' }, { status: 500 })
    }

    // Acknowledge the sender. Best effort — a failure here must not fail the enquiry.
    try {
      await resend.emails.send({
        from: 'Eau Clair <onboarding@resend.dev>',
        to: email,
        subject: 'We received your message',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1565C0; font-weight: 400;">Thanks for getting in touch, ${esc(name)}</h2>
            <p style="line-height: 1.7;">
              We have your message and someone from our team will reply within one business day.
            </p>
            <p style="line-height: 1.7; color: #666;">For reference, here is what you sent:</p>
            <blockquote style="margin: 0; padding: 12px 16px; border-left: 3px solid #90CAF9; color: #444; white-space: pre-wrap;">${esc(message)}</blockquote>
            <br />
            <p>Best regards,<br /><strong>The Eau Clair Team</strong></p>
          </div>
        `,
      })
    } catch (ackError) {
      console.error('Acknowledgement email failed:', ackError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
