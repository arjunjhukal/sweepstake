import { SeonProvider } from '@/app/SeonProvider'
import LoginPage from '@/components/pages/auth/login'
import React from 'react'

export default function Login() {
    return (
        <SeonProvider>
            <LoginPage />
        </SeonProvider>
    )
}
