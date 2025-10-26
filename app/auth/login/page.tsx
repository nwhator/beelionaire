"use client"
import React from 'react'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form className="space-y-4 card">
        <input placeholder="Email" type="email" className="input" />
        <input placeholder="Password" type="password" className="input" />
        <div className="flex justify-end">
          <button className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </div>
  )
}
