import PageHeader from '@/components/molecules/PageHeader'
import GeneralPageLiting from '@/components/pages/dashboard/adminDashboard/pages'
import React from 'react'

export default function AllPages() {
    return (
        <>
            <PageHeader title='All Pages' cta={{ label: "Add New Page", url: "/pages/add-page" }} />
            <GeneralPageLiting />
        </>
    )
}
