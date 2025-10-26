
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
      className={`bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transform-gpu ${className}`}
    >
      <div className="relative">
        {/* decorative bee stripe */}
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 opacity-90 blur-sm" aria-hidden />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
