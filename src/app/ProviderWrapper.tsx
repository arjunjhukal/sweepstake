import Toast from '@/components/molecules/Toast'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { ClientProvider } from '@/hooks/ReduxProvider'
import ThemeCustomization from '@/theme'
import React from 'react'

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContextProvider>
            <ClientProvider>
                <ThemeCustomization>
                    {children}
                    <Toast />
                </ThemeCustomization>
            </ClientProvider>
        </ThemeContextProvider>
    )
}
