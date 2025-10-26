"use client"
import React from 'react'

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form className="space-y-3">
        <input placeholder="Name" className="w-full p-3 border rounded" />
        <input placeholder="Email" type="email" className="w-full p-3 border rounded" />
        <input placeholder="Password" type="password" className="w-full p-3 border rounded" />
        <input placeholder="Referral code (optional)" className="w-full p-3 border rounded" />
        <div className="flex justify-end">
          <button className="bg-brand-500 text-black px-4 py-2 rounded-2xl">Create account</button>
        </div>
      </form>
    </div>
  )
}
