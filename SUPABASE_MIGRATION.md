# Beelionaire - Supabase Database Migration Guide

## What Changed
- **Removed**: SQLite local database (`dev.db` and `schema.sqlite.prisma`)
- **Added**: Supabase PostgreSQL database connection
- **Updated**: `prisma/schema.prisma` now uses PostgreSQL with connection pooling support

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose an organization, enter project name, database password, and region
4. Wait for the project to finish setting up (~2 minutes)

### 2. Get Your Database Connection Strings
1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Navigate to **Database** section
3. Scroll to **Connection string** section
4. Copy the **Connection pooling** string (for `DATABASE_URL`) - uses port 6543
5. Copy the **Direct connection** string (for `DIRECT_URL`) - uses port 5432

### 3. Update Environment Variables
Edit `.env.local` and replace the placeholders:

```bash
# Replace these values:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
```

**Important**: 
- Replace `YOUR_PASSWORD` with your database password (from step 1)
- Replace `YOUR_PROJECT_REF` with your project reference (looks like `abcdefghijklmnop`)
- Keep the port numbers: 6543 for pooled connection, 5432 for direct

### 4. Run Prisma Migrations
```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (creates tables)
npx prisma db push

# Or create a migration (recommended for production)
npx prisma migrate dev --name init
```

### 5. Seed the Database (Optional)
```bash
npm run prisma:seed
```

## Why Supabase?
- **Hosted PostgreSQL**: No need to manage database infrastructure
- **Connection Pooling**: Better performance with PgBouncer built-in
- **Backups**: Automatic daily backups
- **Free Tier**: 500MB database, perfect for development
- **Dashboard**: Easy database management and SQL editor
- **Scalable**: Easy to upgrade when your app grows

## Connection Pooling Explained
- **DATABASE_URL** (port 6543): Uses PgBouncer for connection pooling. Use this for most queries.
- **DIRECT_URL** (port 5432): Direct PostgreSQL connection. Needed for migrations and some Prisma operations.

## Troubleshooting

### "Can't reach database server"
- Check your `.env.local` has the correct credentials
- Verify your Supabase project is active (green status in dashboard)
- Make sure you're using the correct port numbers

### "SSL connection required"
Add `?sslmode=require` to your connection strings if needed.

### Migration fails
Use `npx prisma db push` instead of `migrate dev` for initial setup, then switch to migrations later.

## Next Steps
1. Update your Netlify environment variables with production Supabase credentials
2. Set up Supabase Auth (optional, for user authentication)
3. Configure Row Level Security (RLS) policies in Supabase for data protection

## Resources
- [Supabase Docs](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://www.prisma.io/docs/guides/database/supabase)
- [Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
