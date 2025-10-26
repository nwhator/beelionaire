"use client"
import { motion } from 'framer-motion'
import React from 'react'

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}
