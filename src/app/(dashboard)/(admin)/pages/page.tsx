import PageHeader from '@/components/molecules/PageHeader'
import React from 'react'

export default function AllPages() {
    return (
        <>
            <PageHeader title='All Pages' cta={{ label: "Add New Page", url: "/pages/add-page" }} />
        </>
    )
}
