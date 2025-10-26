"use client"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-2xl font-semibold focus-ring transition-transform active:scale-95'
  const styles = variant === 'primary'
    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-[0_6px_20px_rgba(250,204,21,0.18)]'
    : 'bg-transparent text-gray-800 hover:bg-gray-50 border border-yellow-200'

  return (
    <button
      {...props}
      className={`${base} ${styles} ${className}`}
      role={props.role ?? 'button'}
      aria-pressed={props['aria-pressed']}
    >
      {children}
    </button>
  )
}
