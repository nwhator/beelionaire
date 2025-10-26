
import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
}

export default function Card(props: CardProps) {
  const { children, className = '', ...rest } = props
  return (
    <div {...rest} className={`bg-white shadow-sm rounded-2xl p-4 border ${className}`}>
      {children}
    </div>
  )
}
