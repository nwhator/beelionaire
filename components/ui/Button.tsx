"use client"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-2xl font-medium focus-ring'
  const styles = variant === 'primary'
    ? 'bg-[rgb(var(--brand))] text-black hover:brightness-95'
    : 'bg-transparent text-gray-800 hover:bg-gray-100'

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
