import DashboardLayout from '@/components/layouts/DashboardLayout'
import Private from '@/routes/Private'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Private>
      <DashboardLayout> {children}</DashboardLayout>
    </Private>
  )
}
