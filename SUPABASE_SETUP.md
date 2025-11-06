# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and create a new project
4. Save your project password (you'll need it for the database connection)

## 2. Get Your Credentials

From your Supabase Dashboard:

### Database URLs
1. Go to **Project Settings** → **Database**
2. Under **Connection string**, find:
   - **Connection pooling** (use this for `DATABASE_URL`)
   - **Direct connection** (use this for `DIRECT_URL`)

### API Keys
1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role** key (for `SUPABASE_SERVICE_ROLE_KEY`) - ⚠️ Keep this secret! Server-side only

## 3. Update .env.local

Replace the placeholder values in `.env.local`:

```bash
# Supabase Database URLs
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Supabase API
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"  # ⚠️ NEVER expose this client-side!
```

## 4. Run Database Migrations

After updating your `.env.local`, run:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# (Optional) Seed the database
npm run prisma:seed
```

## 5. Enable Supabase Auth

In your Supabase Dashboard:

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. (Optional) Configure email templates under **Email Templates**

## 6. Set Up Row Level Security (RLS)

For production, enable RLS on your tables:

1. Go to **Table Editor** in Supabase Dashboard
2. For each table, click the three dots → **Edit table**
3. Enable **Row Level Security**
4. Add policies (examples below)

### Example RLS Policies

```sql
-- Users can read their own data
CREATE POLICY "Users can view own data"
ON "User"
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
ON "User"
FOR UPDATE
USING (auth.uid() = id);

-- Anyone can view questions
CREATE POLICY "Anyone can view questions"
ON "Question"
FOR SELECT
TO authenticated
USING (true);
```

## 7. Test the Setup

1. Start the dev server:
```bash
npm run dev
```

2. Navigate to:
   - `/auth/register` - Create an account
   - `/auth/login` - Sign in
   - `/dashboard` - View your dashboard

## Architecture Options

### Option A: Hybrid (Prisma + Supabase) - **RECOMMENDED**
**Current setup** - Best of both worlds:
- ✅ Prisma for type-safe queries and migrations
- ✅ Supabase Auth for authentication
- ✅ Easy to maintain and migrate

Keep using Prisma client in server components:
```typescript
import { prisma } from '@/lib/prisma'
const users = await prisma.user.findMany()
```

### Option B: Pure Supabase (Remove Prisma)
Use only Supabase client:
- ❌ No automatic TypeScript types
- ❌ Manual SQL migrations
- ✅ More Supabase-native features (realtime, storage, edge functions)

Would use Supabase client everywhere:
```typescript
import { supabase } from '@/lib/supabase'
const { data: users } = await supabase.from('User').select('*')
```

**My recommendation:** Stick with the hybrid approach (what we have now). It's cleaner and gives you type safety.

## Troubleshooting

### Database connection issues
- Verify your password is correct in `DATABASE_URL`
- Check that your IP is allowed (Supabase → Settings → Database → Connection pooling → Network restrictions)

### Auth not working
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check browser console for errors
- Verify email provider is enabled in Supabase Dashboard

### Prisma errors
- Run `npx prisma generate` after any schema changes
- Use `npx prisma db push` to sync schema (for dev)
- Use `npx prisma migrate dev` for production migrations
