"use client"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'duo' }

export default function Button({ variant = 'primary', className = '', children, ...props }: Props) {
  const base = 'btn'
  const styles = variant === 'primary' ? 'btn-primary' : variant === 'duo' ? 'btn-duo' : 'btn-ghost'

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
