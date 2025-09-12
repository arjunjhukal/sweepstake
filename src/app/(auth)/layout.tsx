import Box from '@mui/material/Box'
import React from 'react'

export default function AuthRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box className="flex items-center min-h-screen justify-center">
            {children}
        </Box>
    )
}
