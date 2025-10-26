import React from 'react'

type Props = {
  children: React.ReactNode
  variant?: 'brand' | 'duo' | 'neutral'
  className?: string
}

export default function Badge({ children, variant = 'brand', className = '' }: Props) {
  const base = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold'
  const styles = variant === 'duo'
    ? 'bg-duo-100 text-duo-800'
    : variant === 'neutral'
      ? 'bg-gray-100 text-gray-800'
      : 'bg-yellow-100 text-yellow-800'

  return (
    <span className={`${base} ${styles} ${className}`}>{children}</span>
  )
}
