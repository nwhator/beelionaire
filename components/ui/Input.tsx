"use client"
import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }

export default function Input({ label, error, className = '', ...props }: Props) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="text-gray-700 font-medium">{label}</span>}
      <input
        {...props}
        className={`w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-duo-200 ${error ? 'border-red-300' : ''} ${className}`}
      />
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </label>
  )
}
