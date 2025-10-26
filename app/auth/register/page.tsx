"use client"
import React from 'react'

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form className="space-y-4 card">
        <input placeholder="Name" className="input" />
        <input placeholder="Email" type="email" className="input" />
        <input placeholder="Password" type="password" className="input" />
        <input placeholder="Referral code (optional)" className="input" />
        <div className="flex justify-end">
          <button className="btn btn-primary">Create account</button>
        </div>
      </form>
    </div>
  )
}
