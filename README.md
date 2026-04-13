# Dzignex Studio

**Creative Design Studio Platform — Brand identity, packaging, motion, web, and social content for scaling brands.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-green)](https://orm.drizzle.team/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-blue?logo=postgresql)](https://neon.tech/)
[![Auth.js](https://img.shields.io/badge/Auth.js-NextAuth-orange)](https://authjs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1.12-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini-API-4285F4?logo=google)](https://ai.google.dev/)

---

## Overview

Dzignex Studio is a **production-grade creative design studio platform** built for a professional design agency operating across cosmetics, pharma, SaaS, B2B, e-commerce, and events. The platform serves two distinct user bases:

- **Public visitors** — Prospective clients exploring services, reviewing case studies, and submitting project inquiries
- **Studio team** — Administrators managing projects, client messages, team members, media assets, and analytics

The platform solves the operational overhead of running a creative studio by centralizing lead capture, project portfolio management, team collaboration, and analytics in a single cohesive system.

---

## Features

### Public Website

| Feature | Implementation |
|---------|----------------|
| **Hero Landing** | Animated service tags, value proposition with Framer Motion, direct CTA to consultation booking |

![Hero Landing](/public/screenshots/landing.png)
![Hero Footer](/public/screenshots/dzignex.png)
| **Portfolio Showcase** | Dynamic project grid with thumbnail previews, category filtering, and detail views with multi-image galleries |
| **Multi-Step Contact Form** | Comprehensive qualification form capturing industry, service needs, budget range, challenges, and 3-month goals — validated with Zod |

![Contact Form](/public/screenshots/contact.png)
| **AI Chat Assistant (Dex)** | Google Gemini-powered conversational agent with 2,000+ word system prompt handling pricing inquiries, service explanations, and booking redirection |

![AI Chat Assistant](/public/screenshots/chatbot.png)
| **Social Proof Section** | Client testimonials with project associations, star ratings, and engagement metrics |
| **FAQ Accordion** | Expandable Q&A with category grouping |
| **Animated Logo Loop** | Continuous partner/client logo marquee |
| **Responsive Design** | Mobile-first Tailwind implementation with breakpoint scaling |
| **SEO & Analytics** | Vercel Analytics integration, Umami tracking for visitor behavior |

### Dashboard & Admin

| Feature | Implementation |
|---------|----------------|
| **Analytics Dashboard** | Umami API integration displaying real-time stats: visitors, page views, sessions, bounce rate, top pages, referrers, browser breakdown, and geographic distribution |

![Analytics Dashboard](/public/screenshots/dashboard.png)
| **Project Management** | Full CRUD operations for portfolio projects with thumbnail upload, service tagging, publish/draft states, and multi-section detail pages |

![Project Management](/public/screenshots/projectDashboard.png)
| **Client Message Inbox** | Gmail-style message interface with read/unread/replied status, labeling (important/normal/scam), optimistic updates, and toast notifications |

![Message Inbox](/public/screenshots/contactDashboard.png)
| **Media Library** | Cloudflare R2-backed asset management with folder hierarchy, drag-and-drop upload via presigned URLs, storage usage tracking, and batch deletion |

![Media Library](/public/screenshots/mediaLibrary.png)
| **Team Management** | User administration with role-based access (ADMIN/USER), invite token system (7-day expiring magic links), ban system with session invalidation, and profile management |

![Team Management](/public/screenshots/teamManagement.png)
| **Account Settings** | Avatar upload to R2, password changes with bcrypt hashing, session management |

![Account Settings](/public/screenshots/accountSettings.png)
| **Authentication** | Credentials-based login, magic link passwordless auth, password reset flow with 30-minute expiring tokens, session versioning for force logout |

![Authentication](/public/screenshots/signin.png)

---

## Architecture

This project implements a **feature-based layered architecture** inspired by MVC principles, adapted for Next.js App Router. Each feature is self-contained with clear separation of concerns:

```
/features/{featureName}/
├── components/          # React UI components — pure rendering, no business logic
├── actions.ts           # Next.js server actions — business logic, data mutations
└── types.ts             # Feature-specific TypeScript definitions

/db/schema/            # Drizzle ORM schema definitions — data layer
/db-actions/           # Database query functions — data access layer
/app/                  # Next.js route handlers and page composition
/components/ui/        # shadcn/ui design system primitives
```

**Key architectural principles:**

- **Single Responsibility**: Components never touch the database directly. All data mutations flow through server actions.
- **Server/Client Boundary**: Server actions handle auth checks, business logic, and database operations. Client components handle UI state and user interactions.
- **Optimistic Updates**: UI reflects changes immediately while server operations resolve in the background (seen in message status updates, media uploads).
- **Type Safety**: End-to-end TypeScript with Zod validation for all external inputs.

### Route Groups (App Router)

| Group | Purpose | Auth |
|-------|---------|------|
| `(site)` | Public marketing pages, contact form, project showcase | Public |
| `(auth)` | Sign-in, password reset, magic link callbacks | Public (redirects if authenticated) |
| `dashboard` | Admin analytics, projects, messages, team, media | Protected (ADMIN/USER) |
| `invite/[token]` | Team invitation acceptance with account creation | Token-validated |

### Example: Feature Structure (Contact)

```
/features/contact/
├── actions/
│   └── submit-contact-form.ts     # Server action: validates Zod schema, inserts to DB
├── components/
│   └── ContactForm.tsx            # Client form with React Hook Form, toast notifications
└── actions.ts                     # Barrel export
```

```typescript
// actions/submit-contact-form.ts
"use server"
import { db } from "../../../db/drizzle"
import { messages } from "../../../db/schema/messages"
import { z } from "zod"

const contactFormSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  // ... 10+ additional fields
})

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const validated = contactFormSchema.parse(data)
  await db.insert(messages).values({ ...validated, status: "UNREAD" })
  return { success: true }
}
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.2.3 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 4.1.12, CSS variables for theming |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Drizzle ORM 0.45.2 |
| **Auth** | Auth.js (NextAuth 5.0 beta) — Credentials + Magic Link |
| **Storage** | Cloudflare R2 (S3-compatible object storage) |
| **Analytics** | Umami (privacy-focused, self-hosted) + Vercel Analytics |
| **AI** | Google Generative AI (Gemini 2.5 Flash) |
| **Email** | Nodemailer with SMTP (Gmail/transactional) |
| **UI Components** | shadcn/ui (Radix primitives + Tailwind) |
| **Validation** | Zod 4.x |
| **Animation** | Framer Motion, GSAP |
| **Forms** | React Hook Form + Zod Resolver |
| **Charts** | Recharts, Chart.js |

---

## Project Structure

```
dzignex-studio/
├── app/                         # Next.js App Router
│   ├── (auth)/                  # Auth route group (sign-in, reset, magic-link)
│   ├── (site)/                  # Public site (home, about, contact, projects)
│   ├── api/                     # API routes (chat/Gemini, auth handlers)
│   ├── dashboard/               # Admin dashboard (analytics, projects, messages, team, media)
│   ├── invite/[token]/          # Team invitation acceptance
│   └── globals.css              # Global styles + Tailwind
├── components/                  # Shared UI components (shadcn + custom)
├── db/                          # Database layer
│   ├── schema/                  # Drizzle table definitions (6 entities)
│   └── drizzle.ts               # Connection singleton
├── db-actions/                  # Data access functions (CRUD operations)
├── features/                    # Feature-based modules
│   ├── about/                   # About page sections
│   ├── auth/                    # Sign-in, reset, magic link flows
│   ├── contact/                 # Contact form + submission action
│   ├── dashboard/               # 97 items — analytics, media, messages, projects, team
│   ├── home/                    # Landing page sections (8 components)
│   └── projects/                # Public project showcase
├── hooks/                       # Custom React hooks (use-mobile, etc.)
├── lib/                         # Utilities (email, R2 client, utils)
├── public/                      # Static assets (logos, icons)
├── scripts/                     # Database seeding utilities
├── types/                       # Global TypeScript definitions
├── auth.ts                      # NextAuth configuration (credentials + magic link)
├── drizzle.config.ts            # Drizzle Kit configuration
└── next.config.ts               # Next.js config (image domains)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Cloudflare R2 bucket (or S3-compatible storage)
- SMTP credentials (Gmail or transactional provider)
- Google AI API key (Gemini)
- Umami account (self-hosted or cloud)

### Installation

```bash
# Clone and install
git clone https://github.com/Ala-Eddine-Mezdoud/dzignex-studio.git
cd dzignex-studio
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Database setup
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio (optional)

# Development server
npm run dev              # http://localhost:3000
```

### Database Migrations

```bash
npm run db:generate      # Generate migration from schema changes
npm run db:migrate       # Run pending migrations
npm run db:push          # Push schema directly (dev only)
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Neon) |
| `NEXTAUTH_SECRET` | Yes | JWT encryption secret (random 32+ chars) |
| `NEXT_PUBLIC_BASE_URL` | Yes | Public site URL (https://dzignex.studio) |
| `GEMINI_API_KEY` | Yes | Google AI API key for Dex chat |
| `R2_ENDPOINT` | Yes | Cloudflare R2 S3 endpoint |
| `R2_ACCESS_KEY_ID` | Yes | R2 access key |
| `R2_SECRET_ACCESS_KEY` | Yes | R2 secret key |
| `R2_BUCKET` | Yes | R2 bucket name (default: dzignex-assets) |
| `R2_PUBLIC_URL` | Yes | Public CDN URL for R2 assets |
| `SMTP_HOST` | Yes | SMTP server (smtp.gmail.com) |
| `SMTP_PORT` | Yes | SMTP port (465 for SSL) |
| `SMTP_USER` | Yes | Email address for sending |
| `SMTP_APP_PASS` | Yes | App password (not account password) |
| `SMTP_FROM_NAME` | No | Sender name (default: Dzignex Studio) |
| `NEXT_PUBLIC_UMAMI_API_TOKEN` | Yes | Umami analytics API token |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Yes | Umami website ID for tracking |

---

## Database Schema

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| **users** | Team member accounts | `id`, `email`, `password`, `role` (ADMIN/USER), `banned`, `sessionVersion`, `createdAt` |
| **sessions** | Active login sessions | `sessionToken`, `userId`, `expires` |
| **verificationTokens** | Password reset / magic link tokens | `identifier`, `token`, `expires` |
| **messages** | Client contact form submissions | `fullName`, `email`, `companyName`, `serviceRequired`, `budgetRange`, `status` (UNREAD/READ/REPLIED), `label`, `createdAt` |
| **projects** | Portfolio case studies | `title`, `slug`, `summary`, `services`[], `thumbnailUrl`, `isPublished` |
| **projectDetails** | Rich project content sections | `projectId`, `label`, `description`, `orderIndex` |
| **projectDetailImages** | Gallery images per section | `detailId`, `imageUrl`, `altText`, `orderIndex` |
| **testimonials** | Client feedback | `projectId`, `authorName`, `authorRole`, `feedbackText`, `rating`, `statValue`, `statLabel` |
| **mediaAssets** | Uploaded file registry | `fileName`, `s3Url`, `fileType`, `sizeBytes`, `uploadedBy` |
| **inviteTokens** | Team invitation system | `email`, `token`, `expiresAt`, `usedAt`, `createdBy` |

### Relationships

```
users 1:N sessions
users 1:N mediaAssets (uploadedBy)
projects 1:N projectDetails
projects 1:1 testimonials
projectDetails 1:N projectDetailImages
```

---

## Author

**Mezdoud Ala Eddine**

Full-Stack & AI Engineer

- GitHub: [@Ala-Eddine-Mezdoud](https://github.com/Ala-Eddine-Mezdoud)
- Project: [dzignex.studio](https://dzignex.studio)

Built for Dzignex Studio — a creative design agency operating across brand identity, packaging, motion design, and digital experiences.
