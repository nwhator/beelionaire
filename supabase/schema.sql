-- Supabase Database Schema for Beelionaire
-- Run this in Supabase SQL Editor

-- ⚠️ WARNING: This will DELETE ALL DATA and recreate tables from scratch!
-- Only run this if you want to start fresh

-- Drop all existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS "Referral" CASCADE;
DROP TABLE IF EXISTS "TaskCompletion" CASCADE;
DROP TABLE IF EXISTS "Quiz" CASCADE;
DROP TABLE IF EXISTS "Task" CASCADE;
DROP TABLE IF EXISTS "Question" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  "walletBalance" DECIMAL(10, 2) DEFAULT 0,
  points INTEGER DEFAULT 0,
  "referralCode" TEXT UNIQUE NOT NULL,
  "referredBy" UUID,
  "accountType" TEXT DEFAULT 'bank', -- 'bank' or 'mobile_money'
  "accountName" TEXT,
  "accountNumber" TEXT,
  "bankName" TEXT,
  "phoneNumber" TEXT,
  "isAdmin" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("referredBy") REFERENCES "User"(id) ON DELETE SET NULL
);

-- Questions table
CREATE TABLE IF NOT EXISTS "Question" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  "correctAnswer" TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Quiz table
CREATE TABLE IF NOT EXISTS "Quiz" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "questionId" UUID NOT NULL,
  "selectedAnswer" TEXT NOT NULL,
  "isCorrect" BOOLEAN NOT NULL,
  "pointsEarned" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  FOREIGN KEY ("questionId") REFERENCES "Question"(id) ON DELETE CASCADE
);

-- Tasks table
CREATE TABLE IF NOT EXISTS "Task" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  reward INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- TaskCompletion table
CREATE TABLE IF NOT EXISTS "TaskCompletion" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "taskId" UUID NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE ("userId", "taskId"),
  FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  FOREIGN KEY ("taskId") REFERENCES "Task"(id) ON DELETE CASCADE
);

-- Referrals table
CREATE TABLE IF NOT EXISTS "Referral" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "referrerId" UUID NOT NULL,
  "referredUserId" UUID NOT NULL,
  "rewardAmount" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("referrerId") REFERENCES "User"(id) ON DELETE CASCADE,
  FOREIGN KEY ("referredUserId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_user_referral_code ON "User"("referralCode");
CREATE INDEX IF NOT EXISTS idx_quiz_user ON "Quiz"("userId");
CREATE INDEX IF NOT EXISTS idx_task_completion_user ON "TaskCompletion"("userId");
CREATE INDEX IF NOT EXISTS idx_referral_referrer ON "Referral"("referrerId");

-- Row Level Security (RLS) Policies
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Question" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Quiz" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Task" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TaskCompletion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Referral" ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own data" ON "User"
  FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update their own data (except sensitive fields)
CREATE POLICY "Users can update own data" ON "User"
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Anyone authenticated can view questions
CREATE POLICY "Authenticated users can view questions" ON "Question"
  FOR SELECT TO authenticated USING (true);

-- Users can view their own quiz attempts
CREATE POLICY "Users can view own quiz attempts" ON "Quiz"
  FOR SELECT USING (auth.uid()::text = "userId"::text);

-- Users can insert their own quiz attempts
CREATE POLICY "Users can insert own quiz attempts" ON "Quiz"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId"::text);

-- Anyone authenticated can view tasks
CREATE POLICY "Authenticated users can view tasks" ON "Task"
  FOR SELECT TO authenticated USING (true);

-- Users can view their own task completions
CREATE POLICY "Users can view own task completions" ON "TaskCompletion"
  FOR SELECT USING (auth.uid()::text = "userId"::text);

-- Users can insert their own task completions
CREATE POLICY "Users can insert own task completions" ON "TaskCompletion"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId"::text);

-- Users can view referrals they made
CREATE POLICY "Users can view own referrals" ON "Referral"
  FOR SELECT USING (auth.uid()::text = "referrerId"::text);

-- Seed data for Tasks
INSERT INTO "Task" (title, description, url, reward) VALUES
  ('Follow on Twitter', 'Follow Beelionaire on Twitter', 'https://twitter.com/beelionaire', 50),
  ('Join Telegram', 'Join our Telegram community', 'https://t.me/beelionaire', 50),
  ('Share on Facebook', 'Share Beelionaire with friends', 'https://facebook.com/sharer', 30)
ON CONFLICT DO NOTHING;

-- Seed data for Questions
INSERT INTO "Question" (question, options, "correctAnswer", difficulty, category) VALUES
  ('What is the capital of France?', '["Paris", "London", "Berlin", "Madrid"]', 'Paris', 'EASY', 'Geography'),
  ('What is 2 + 2?', '["3", "4", "5", "6"]', '4', 'EASY', 'Math'),
  ('Who painted the Mona Lisa?', '["Van Gogh", "Da Vinci", "Picasso", "Monet"]', 'Da Vinci', 'MEDIUM', 'Art')
ON CONFLICT DO NOTHING;
