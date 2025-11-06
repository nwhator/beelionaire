"use client"
import React from 'react'
import Card from './Card'
import Button from './Button'

export default function ReferralWidget({ code }: { code: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : 'https://beelionaire.vercel.app')
  const url = `${siteUrl}/?ref=${code}`

  const copy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      alert('Copied referral link')
    }
  }

  return (
    <Card className="space-y-3 animate-pop">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm badge-bee">Your referral</div>
          <div className="font-mono font-bold text-lg">{code}</div>
        </div>
        <div>
          <Button onClick={copy} variant="duo">Copy link</Button>
        </div>
      </div>
      <div className="text-sm muted">Share with friends and earn bonuses when they sign up.</div>
    </Card>
  )
}
