import Toast from '@/components/molecules/Toast'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { ClientProvider } from '@/hooks/ReduxProvider'
import ThemeCustomization from '@/theme'
import React from 'react'

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContextProvider>
            <ThemeCustomization>
                <ClientProvider>
                    {children}
                    <Toast />
                </ClientProvider>
            </ThemeCustomization>
        </ThemeContextProvider>
    )
}
