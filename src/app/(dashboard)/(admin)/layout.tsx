import Private from '@/routes/Private'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Private>
      {children}
    </Private>
  )
}
