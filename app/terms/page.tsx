import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | Eau Clair',
  description: 'The terms that apply when you use the Eau Clair website or buy from us.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Agreement to these terms',
    body: [
      'These terms apply whenever you use the Eau Clair website or place an order with us. By browsing the site or buying from us, you accept them. If you do not accept them, please do not use the site.',
      'We may update these terms from time to time. The version in force is the one published here on the day you place an order.',
    ],
  },
  {
    heading: 'Accounts',
    body: [
      'You need an account to place an order. You must give accurate details, keep your password confidential, and tell us promptly if you think someone else has accessed your account.',
      'You are responsible for activity that happens under your account. We may suspend or close an account that is being used fraudulently or in breach of these terms.',
    ],
  },
  {
    heading: 'Products and availability',
    body: [
      'We do our best to describe and picture our products accurately, but packaging and labelling change from time to time, and colours vary between screens. Product images are illustrative.',
      'All products are subject to availability. If something you ordered is out of stock we will tell you and offer a substitute, a wait, or a refund.',
    ],
  },
  {
    heading: 'Orders, prices and payment',
    body: [
      'Your order is an offer to buy. A contract is formed when we send you an order confirmation, not when you submit the order.',
      'Prices are shown in US dollars and exclude delivery unless stated. We may correct a price that was listed in obvious error, in which case we will contact you before dispatch and you may cancel.',
      'Payment is taken at the point of order through our payment provider. We do not store your full card details.',
    ],
  },
  {
    heading: 'Delivery',
    body: [
      'We deliver across California and ship nationwide within the continental United States. Delivery estimates are estimates and not guarantees.',
      'Risk in the goods passes to you on delivery to the address you gave us. Please check your order on arrival.',
    ],
  },
  {
    heading: 'Returns, damage and refunds',
    bullets: [
      'If your order arrives damaged, send a photo and your order number to support@eauclair.com within 14 days of delivery and we will replace or refund it. You do not need to return damaged goods.',
      'Unopened products in a resaleable condition may be returned within 30 days of delivery for a refund of the product price.',
      'For hygiene and food safety reasons we cannot accept returns of opened bottles unless the product is faulty.',
      'Refunds are made to the original payment method, normally within 10 business days of us agreeing the refund.',
      'None of this affects your statutory rights in relation to faulty or misdescribed goods.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: ['When using this site you agree not to:'],
    bullets: [
      'Break any applicable law, or infringe anyone else’s rights.',
      'Attempt to gain unauthorised access to the site, its accounts or its infrastructure.',
      'Scrape, overload or disrupt the site or the systems behind it.',
      'Submit anything through our forms that is unlawful, abusive, deceptive, or that contains malware.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'The Eau Clair name, logo, packaging design, site design, text and photography are owned by us or licensed to us. You may not copy or reuse them commercially without our written permission.',
      'You may view, download and print pages of this site for your own personal, non-commercial use.',
    ],
  },
  {
    heading: 'Content you send us',
    body: [
      'If you send us feedback, questions or suggestions, you give us permission to use them to operate and improve our products and service. Do not send us anything you consider confidential.',
    ],
  },
  {
    heading: 'Disclaimers and liability',
    body: [
      'We provide the site with reasonable care and skill, but we do not promise it will be uninterrupted or error free, and we do not warrant that the information on it is complete or current at all times.',
      'Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot be limited by law. Subject to that, our total liability arising from an order is limited to the amount you paid for that order.',
      'We are not liable for losses that were not reasonably foreseeable, or for business losses such as lost profit or lost opportunity.',
    ],
  },
  {
    heading: 'Suspension and termination',
    body: [
      'We may suspend or withdraw the site, or close an account, where we reasonably need to — for example for maintenance, for security, or because of a breach of these terms. Where we can give notice, we will.',
    ],
  },
  {
    heading: 'Governing law and contact',
    body: [
      'These terms are governed by the laws of the State of California, and the courts of California have exclusive jurisdiction over any dispute arising from them.',
      'If something has gone wrong, contact us first at info@eauclair.com or 123 Water Street, Spring Valley, CA 90210 — most things are quicker to resolve directly.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      intro="The ground rules for using this site and buying from us, in plain language."
      updated="5 September 2026"
      sections={SECTIONS}
    />
  )
}
