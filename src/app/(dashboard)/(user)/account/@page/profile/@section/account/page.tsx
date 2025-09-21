import AddPlayerForm from '@/components/pages/dashboard/adminDashboard/players/addPlayerForm'
import React from 'react'

export default async function UserAccountUpdate(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  return (
    <AddPlayerForm />
  )
}
