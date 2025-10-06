import AddPageForm from '@/components/pages/dashboard/adminDashboard/pages/add-page'
import React from 'react'

export default async function EditGeneralPages(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    return (
        <section className="edit__page__root">
            <AddPageForm id={id} />
        </section>
    )
}
