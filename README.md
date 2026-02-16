# Eau Clair - Premium Natural Water E-commerce

A modern, elegant e-commerce platform for premium natural spring water, built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- Minimal design with blue/green color scheme
- Product catalog
- User authentication
- Admin dashboard
- Email notifications via Resend
- Image upload to Supabase Storage
- Responsive design
- Smooth scroll animations
- Video backgrounds and 3D product visualization

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS v4
- **Email:** Resend
- **Storage:** Supabase Storage
- **Deployment:** Vercel (recommended)
- **3D Graphics:** Three.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account (for emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/eau-clair.git
cd eau-clair
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Then fill in your actual values in `.env.local`:
- Supabase URL and Anon Key from your Supabase project
- Resend API Key from your Resend account

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Go to your Supabase project
2. Run the SQL migrations in `supabase/migrations/` (if you have them)
3. Or manually create the tables:
   - `profiles` (id, email, is_admin)
   - `products` (id, name, description, price, size, category, image_url, is_active)

### Supabase Storage Setup

1. Create a bucket named `product-images`
2. Set it to public
3. Add policies for authenticated users to upload

## Project Structure
```
eau-clair/
├── app/
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard
│   ├── auth/               # Auth callbacks
│   ├── components/         # React components
│   ├── login/              # Login page
│   ├── products/           # Products pages
│   ├── signup/             # Signup page
│   └── api/                # API routes
├── public/
│   ├── videos/             # Background videos
│   ├── logo.png
│   └── bottle-3d.glb       # 3D model
├── utils/
│   └── supabase/           # Supabase clients
└── .env.local              # Environment variables (not in git)
```

## Environment Variables

See `.env.example` for required environment variables.
