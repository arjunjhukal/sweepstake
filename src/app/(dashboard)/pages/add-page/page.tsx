"use client";
import ReactQuillEditor from '@/components/molecules/ReactQuill'
import { Button, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

export default function AddGeneralPage() {
    const [pageField, setPageField] = useState(1);

    return (
        <>
            <OutlinedInput placeholder='Page Title' />
            <OutlinedInput placeholder='Slug' />
            {Array.from({ length: pageField }).map((i) => (
                <div className="grid lg:grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <OutlinedInput placeholder='Heading' />
                    </div>
                    <div className="col-span-9">
                        <ReactQuillEditor />
                    </div>
                </div>
            )
            )}
            <Button variant='contained' color='primary' onClick={() => {
                setPageField(prev => prev + 1)
            }}>Add More</Button>
        </>
    )
}
