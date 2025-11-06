# 🔧 Fix Supabase Email Redirects

## The Problem
Supabase is sending email confirmation links to:
```
http://localhost:3000/#access_token=...
```

Instead of:
```
https://beelionaire.vercel.app/auth/callback
```

## The Fix

### 1. Update Supabase Dashboard Settings

Go to: https://supabase.com/dashboard/project/iymhjodxpfzobisbxwdl/auth/url-configuration

#### **Site URL:**
```
https://beelionaire.vercel.app
```

#### **Redirect URLs (add all of these):**
```
https://beelionaire.vercel.app/auth/callback
https://beelionaire.vercel.app/**
http://localhost:3000/auth/callback
http://localhost:3000/**
```

### 2. Email Templates

Go to: **Authentication** → **Email Templates**

#### For "Confirm signup" template:
Change the confirmation URL to explicitly use your callback:
```
{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup
```

#### For "Magic Link" template:
```
{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=magiclink
```

#### For "Reset Password" template:
```
{{ .SiteURL }}/auth/reset-password?token_hash={{ .TokenHash }}&type=recovery
```

### 3. Additional Settings

Under **Authentication** → **URL Configuration**:

- ✅ **Site URL**: `https://beelionaire.vercel.app`
- ✅ **Redirect URLs**: Add both production and localhost URLs
- ❌ **Additional Redirect URLs**: Can leave empty

### 4. Test It

1. Sign up with a new email
2. Check the confirmation email
3. The link should now go to: `https://beelionaire.vercel.app/auth/callback`
4. After confirmation → redirects to `/dashboard`

---

**Note:** If you're still seeing `localhost:3000` in emails, make sure:
1. You saved the Site URL in Supabase
2. You're testing with a fresh signup (not an old email)
3. The `NEXT_PUBLIC_SITE_URL` environment variable is set in Vercel
