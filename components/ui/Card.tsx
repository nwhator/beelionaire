
import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
}

export default function Card(props: CardProps) {
  const { children, className = '', ...rest } = props
  return (
    <div
      {...rest}
      className={`card ${className}`}
    >
      <div className="relative">
        {/* subtle decorative accent */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 opacity-70 blur-sm" aria-hidden />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
