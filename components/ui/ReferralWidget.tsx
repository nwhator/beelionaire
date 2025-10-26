"use client"
import React from 'react'
import Card from './Card'
import Button from './Button'

export default function ReferralWidget({ code }: { code: string }) {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${code}`

  const copy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      alert('Copied referral link')
    }
  }

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Your referral</div>
          <div className="font-mono font-medium">{code}</div>
        </div>
        <div>
          <Button onClick={copy} variant="ghost">Copy link</Button>
        </div>
      </div>
      <div className="text-sm text-gray-500">Share with friends and earn bonuses when they sign up.</div>
    </Card>
  )
}
