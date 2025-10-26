# Who Wants to Be a Beelionaire 🐝💰

A gamified spelling and grammar quiz platform with referral rewards and AdSense-driven engagement.

---

## Project Overview

This repository contains the design and developer prompt for "Who Wants to Be a Beelionaire", a production-ready Next.js 14 (App Router) TypeScript web app using TailwindCSS, ShadCN UI, Framer Motion, Prisma (PostgreSQL), NextAuth, and Zustand for state management.

The app is a gamified learning platform where users complete AdSense-related tasks to unlock spelling and grammar quizzes, earn points, climb leaderboards, and withdraw or redeem earnings. It includes referral mechanics to encourage viral growth.

---

## Tech Stack

- Frontend: Next.js 14 (App Router), TypeScript
- Styling: TailwindCSS + ShadCN UI + Framer Motion
- Backend: Next.js API Routes (server functions)
- Database: PostgreSQL (Prisma ORM)
- Auth: NextAuth.js (Email/Password or Google)
- State Management: Zustand
- Hosting: Vercel
- Analytics & Ads: Google AdSense + Vercel Analytics

---

## Goal

Create an interactive learning and reward platform where users:

1. Complete simple AdSense-related tasks to unlock quizzes.
2. Answer spelling and grammar questions in a fun, gamified interface.
3. Earn points, climb leaderboards, and withdraw or redeem earnings.
4. Invite friends via referrals and earn community-driven bonuses.

---

## Core Game Logic

- Question pool is divided into two categories:
  - Odd-numbered questions → Spelling
  - Even-numbered questions → Grammar
- Quiz alternates automatically between categories.
- Users can only access quizzes after completing required AdSense tasks.
- Rewards and referrals drive engagement.

---

## Recommended App Directory Structure (Next.js 14 App Router)

app/
 ├─ layout.tsx                    # Global layout (Nav, Footer, Theme)
 ├─ page.tsx                      # Landing Page
 ├─ auth/
 │   ├─ login/page.tsx
 │   ├─ register/page.tsx
 ├─ tasks/
 │   ├─ page.tsx                  # Task/AdSense Unlock Page
 ├─ quiz/
 │   ├─ page.tsx                  # Quiz Game Interface
 ├─ dashboard/
 │   ├─ page.tsx
 │   ├─ referrals/page.tsx
 │   ├─ leaderboard/page.tsx
 │   ├─ wallet/page.tsx
 ├─ admin/
 │   ├─ page.tsx                  # Admin overview
 │   ├─ questions/page.tsx        # CRUD for questions
 │   ├─ users/page.tsx
 ├─ api/
 │   ├─ auth/                     # Login, Register, etc.
 │   ├─ quiz/                     # Next question, submit, summary
 │   ├─ referrals/
 │   ├─ wallet/
 │   ├─ leaderboard/
 │   ├─ tasks/
 │   ├─ admin/

---

## Example Prisma Models

```prisma
model User {
  id             String   @id @default(uuid())
  name           String
  email          String   @unique
  password       String
  points         Int      @default(0)
  walletBalance  Float    @default(0)
  referralCode   String   @unique
  referredBy     String?
  createdAt      DateTime @default(now())
  quizzes        Quiz[]
  referrals      Referral[]
  tasks          TaskCompletion[]
}

model Question {
  id         String   @id @default(uuid())
  category   String   // 'spelling' or 'grammar'
  question   String
  options    Json
  answer     String
}

model Quiz {
  id         String   @id @default(uuid())
  userId     String
  questionId String
  isCorrect  Boolean
  createdAt  DateTime @default(now())
}

model Task {
  id      String   @id @default(uuid())
  title   String
  url     String
  reward  Int
}

model TaskCompletion {
  id        String   @id @default(uuid())
  taskId    String
  userId    String
  completed Boolean  @default(false)
}

model Referral {
  id         String   @id @default(uuid())
  referrerId String
  referredId String
  bonus      Int
  createdAt  DateTime @default(now())
}
```

---

## UI/UX Design System

Style:

- Minimal, gamified, and clean.
- Rounded UI components (`rounded-2xl`).
- Warm yellow & black brand palette (`#FFD700`, `#0D0D0D`).
- Use Lottie animations or Framer Motion for interactivity.

Core Components:

- `NavBar` — Persistent top bar with logo, links, and wallet balance.
- `TaskCard` — Blog/AdSense tasks with progress tracking.
- `QuizCard` — Question with multiple-choice options.
- `LeaderboardCard` — Animated rank listing.
- `ReferralWidget` — Referral link, QR, and share buttons.
- `WalletSummary` — Earnings, withdrawal, transaction list.

---

## Page-by-Page Functional Overview

/ — Landing Page

- Animated hero with CTA “Play & Earn”.
- Leaderboard preview.

/auth/register

- Signup with optional referral code.
- Form validation with Zod + React Hook Form.

/auth/login

- Secure login with NextAuth.

/tasks

- Task cards linking to blog URLs (AdSense-enabled).
- Progress tracking and "Unlock Quiz" when completed.

/quiz

- Dynamic question fetch from `/api/quiz/next-question`.
- Timer, options, feedback animation, result summary.

/dashboard

- Wallet, total quizzes, average score, quick links.

/dashboard/referrals

- Referral link, count, bonuses, social share.

/dashboard/leaderboard

- Top 50 animated list; user rank highlighted.

/dashboard/wallet

- Balance, transactions, withdraw request form (admin approval).

/admin

- Admin overview and CRUD for questions/users.

---

## API Routes (summary)

| Route                     | Method   | Description             |
| ------------------------- | -------- | ----------------------- |
| `/api/auth/register`      | POST     | Register new user       |
| `/api/auth/login`         | POST     | Login user              |
| `/api/tasks`              | GET      | Fetch blog task list    |
| `/api/tasks/complete`     | POST     | Mark a task complete    |
| `/api/quiz/next-question` | GET      | Get next question       |
| `/api/quiz/submit`        | POST     | Submit user’s answer    |
| `/api/referrals`          | GET/POST | Get or record referrals |
| `/api/wallet`             | GET      | Get wallet data         |
| `/api/wallet/withdraw`    | POST     | Request withdrawal      |
| `/api/leaderboard`        | GET      | Fetch leaderboard       |
| `/api/admin/questions`    | CRUD     | Manage quiz questions   |

---

## State Management Example (Zustand)

```typescript
import { create } from "zustand";

export const useQuizStore = create((set) => ({
  currentQuestion: null,
  score: 0,
  isLoading: false,
  setQuestion: (q) => set({ currentQuestion: q }),
  addPoint: () => set((s) => ({ score: s.score + 1 })),
  resetQuiz: () => set({ score: 0, currentQuestion: null }),
}));
```

---

## Development Roadmap

1. Setup & Initialization
   - `npx create-next-app@latest beelionaire`
   - Install dependencies: `npm install prisma @prisma/client next-auth tailwindcss shadcn-ui framer-motion zustand`
   - Initialize Prisma schema.

2. Design System
   - Create reusable components (`/components/ui`) with ShadCN.
   - Define global styles and brand colors in `globals.css`.

3. Authentication
   - Configure NextAuth (JWT or Credentials).
   - Add referral-based signup logic.

4. Quiz Engine
   - Build backend endpoints for fetching and submitting questions.
   - Implement front-end logic with Zustand.

5. Dashboard + Wallet
   - Fetch dynamic stats and render progress visuals.

6. Referral & Leaderboard System
   - Add endpoints, UI, and animation with Framer Motion.

7. Admin Panel
   - CRUD for questions and users.
   - Secure route access (admin role only).

8. Testing & Deployment
   - Unit + E2E tests using Playwright.
   - Deploy on Vercel with environment variables for AdSense & DB.

---

## UI/UX Goals

- Fast, fluid transitions (Framer Motion page transitions).
- Intuitive navigation and consistent color system.
- Gamified progress feedback (animations, progress bars, confetti).
- Accessibility compliance (keyboard navigation, ARIA roles).

---

## Next steps

- Tell me if you want me to scaffold the Next.js 14 app and install dependencies now. I can also initialize Prisma and add the initial `prisma/schema.prisma` using the models above.
