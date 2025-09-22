import PageHeader from '@/components/molecules/PageHeader'
import AddGameForm from '@/components/pages/dashboard/adminDashboard/games/AddGameForm'
import React from 'react'

export default function AddGame() {

  return (
    <>
      <PageHeader title="Add Game" />
      <AddGameForm />
    </>
  )
}
