"use client"
import React from 'react'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form className="space-y-3">
        <input placeholder="Email" type="email" className="w-full p-3 border rounded" />
        <input placeholder="Password" type="password" className="w-full p-3 border rounded" />
        <div className="flex justify-end">
          <button className="bg-brand-500 text-black px-4 py-2 rounded-2xl">Sign in</button>
        </div>
      </form>
    </div>
  )
}
