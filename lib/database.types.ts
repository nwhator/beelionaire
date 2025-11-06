// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      User: {
        Row: {
          id: string
          email: string
          name: string | null
          walletBalance: number
          points: number
          referralCode: string
          referredBy: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          walletBalance?: number
          points?: number
          referralCode: string
          referredBy?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          walletBalance?: number
          points?: number
          referralCode?: string
          referredBy?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      Question: {
        Row: {
          id: string
          question: string
          options: string[]
          correctAnswer: string
          difficulty: string
          category: string
          createdAt: string
        }
        Insert: {
          id?: string
          question: string
          options: string[]
          correctAnswer: string
          difficulty: string
          category: string
          createdAt?: string
        }
        Update: {
          id?: string
          question?: string
          options?: string[]
          correctAnswer?: string
          difficulty?: string
          category?: string
          createdAt?: string
        }
      }
      Quiz: {
        Row: {
          id: string
          userId: string
          questionId: string
          selectedAnswer: string
          isCorrect: boolean
          pointsEarned: number
          createdAt: string
        }
        Insert: {
          id?: string
          userId: string
          questionId: string
          selectedAnswer: string
          isCorrect: boolean
          pointsEarned: number
          createdAt?: string
        }
        Update: {
          id?: string
          userId?: string
          questionId?: string
          selectedAnswer?: string
          isCorrect?: boolean
          pointsEarned?: number
          createdAt?: string
        }
      }
      Task: {
        Row: {
          id: string
          title: string
          description: string | null
          url: string
          reward: number
          createdAt: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          url: string
          reward: number
          createdAt?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          url?: string
          reward?: number
          createdAt?: string
        }
      }
      TaskCompletion: {
        Row: {
          id: string
          userId: string
          taskId: string
          createdAt: string
        }
        Insert: {
          id?: string
          userId: string
          taskId: string
          createdAt?: string
        }
        Update: {
          id?: string
          userId?: string
          taskId?: string
          createdAt?: string
        }
      }
      Referral: {
        Row: {
          id: string
          referrerId: string
          referredUserId: string
          rewardAmount: number
          createdAt: string
        }
        Insert: {
          id?: string
          referrerId: string
          referredUserId: string
          rewardAmount: number
          createdAt?: string
        }
        Update: {
          id?: string
          referrerId?: string
          referredUserId?: string
          rewardAmount?: number
          createdAt?: string
        }
      }
    }
  }
}
