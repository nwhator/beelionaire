# Beelionaire Setup Guide - Pure Supabase

## 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up (it's free!)
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: beelionaire (or whatever you like)
   - **Database Password**: Save this somewhere safe!
   - **Region**: Choose closest to you (e.g., US East, EU West, etc.)
5. Click **"Create Project"** and wait ~2 minutes for setup

## 2. Get Your API Keys

Once your project is ready:

1. Go to **Settings** (⚙️ icon on left sidebar)
2. Click **API**
3. You'll see these values - copy them:

   ```
   Project URL: https://xxxxx.supabase.co
   anon public: eyJhbGc...  (long string)
   service_role: eyJhbGc... (long string - keep secret!)
   ```

## 3. Update Your .env.local File

Open `.env.local` in your project and replace the placeholders:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
```

## 4. Create Database Tables

1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste the ENTIRE contents of `supabase/schema.sql`
4. Click **Run** (or press Ctrl+Enter)

You should see: "Success. No rows returned"

## 5. Enable Email Authentication

1. Go to **Authentication** → **Providers** (left sidebar)
2. Make sure **Email** is enabled (it should be by default)
3. (Optional) Disable **"Confirm email"** for testing:
   - Click **Email** provider
   - Scroll to **"Confirm email"**
   - Turn it OFF for development
   - Click **Save**

## 6. Install Dependencies and Run

```bash
# Install packages
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 7. Test the App

1. Go to `/auth/register`
2. Create an account
3. Check your email for confirmation (if enabled)
4. Login and explore!

## 8. View Your Data

In Supabase Dashboard:
- Click **Table Editor** to see your data
- Click **Authentication** → **Users** to see registered users

## Production Checklist

Before deploying:

- [ ] Enable email confirmation (Authentication → Providers → Email)
- [ ] Set up Row Level Security policies (already included in schema.sql)
- [ ] Add your production domain to **Authentication** → **URL Configuration**
- [ ] Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code!

## Troubleshooting

### Can't login/register
- Check browser console for errors
- Verify `.env.local` has correct keys
- Make sure you ran the SQL schema

### Database errors
- Run the `supabase/schema.sql` again
- Check Table Editor to see if tables exist

### TypeScript errors
- Run `npm install` again
- Restart VS Code

## Need Help?

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- Check the `supabase` folder for the database schema
