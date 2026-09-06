import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Eau Clair',
  description: 'How Eau Clair collects, uses and protects your personal information.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Who we are',
    body: [
      'Eau Clair bottles and sells natural and vapour distilled water. This policy explains what personal information we collect when you use our website, why we collect it, and what control you have over it.',
      'If you have any question about this policy, or want to exercise any of the rights described below, write to us at info@eauclair.com or at 123 Water Street, Spring Valley, CA 90210.',
    ],
  },
  {
    heading: 'Information we collect',
    body: ['We only collect what we need to run the site and fulfil what you ask us for.'],
    bullets: [
      'Account information — the email address and password you provide when you create an account. Passwords are hashed by our authentication provider and are never visible to us.',
      'Messages you send us — the name, email address, phone number (if you give one), topic and message body you submit through our contact form.',
      'Order information — the products you order, along with the delivery and billing details needed to get them to you.',
      'Technical information — your IP address, browser type and pages visited, collected automatically in server logs and used to keep the site secure and working.',
    ],
  },
  {
    heading: 'How we use your information',
    bullets: [
      'To create and maintain your account, and to sign you in.',
      'To answer the enquiries you send us, and to send you an acknowledgement that we received them.',
      'To process, deliver and support your orders.',
      'To send service messages about your account or an order. We do not send marketing email unless you have asked us to.',
      'To detect and prevent fraud, abuse and technical faults.',
    ],
  },
  {
    heading: 'Who we share it with',
    body: [
      'We do not sell your personal information, and we do not share it for anyone else’s advertising. We do use a small number of service providers who process data on our behalf, under contract and only on our instructions:',
    ],
    bullets: [
      'Supabase — hosts our database and handles account authentication.',
      'Resend — delivers our transactional email, such as welcome messages and contact-form acknowledgements.',
      'Our delivery partners — receive only the name, address and contact details needed to complete a delivery.',
    ],
  },
  {
    heading: 'Cookies and local storage',
    body: [
      'We use cookies and browser storage to keep you signed in and to remember basic preferences. These are necessary for the site to function; turning them off in your browser will stop sign-in from working.',
      'We do not use advertising or cross-site tracking cookies.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'We keep account information for as long as your account is open. Contact-form messages are kept while we deal with your enquiry and for a reasonable period afterwards for reference. Order records are kept for as long as tax and accounting rules require.',
      'When you close your account we delete or anonymise your information, except where we are legally required to keep it.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Depending on where you live, you may have some or all of the following rights over your personal information. To exercise any of them, email info@eauclair.com and we will respond within the period the law allows.',
    ],
    bullets: [
      'Access — ask for a copy of the information we hold about you.',
      'Correction — ask us to fix information that is wrong or incomplete.',
      'Deletion — ask us to delete your information where we have no continuing reason to keep it.',
      'Portability — ask us to provide your information in a machine-readable format.',
      'Objection and restriction — ask us to stop or limit certain uses of your information.',
      'Complaint — raise a concern with your local data protection authority.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'Traffic to and from this site is encrypted in transit. Access to production data is limited to the people who need it, and authentication is handled by a specialist provider rather than by us directly.',
      'No system is perfectly secure. If we ever become aware of a breach affecting your personal information, we will notify you and the relevant authority as required by law.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'This site is not directed at children under 13, and we do not knowingly collect their personal information. If you believe a child has given us their information, contact us and we will delete it.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We may update this policy as our business or the law changes. The date at the top of this page shows when it was last revised, and material changes will be flagged on the site.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We collect as little as we can, we tell you what we do with it, and we never sell it."
      updated="5 September 2026"
      sections={SECTIONS}
    />
  )
}
