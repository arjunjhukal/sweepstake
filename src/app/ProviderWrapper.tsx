import Toast from '@/components/molecules/Toast'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { ClientProvider } from '@/hooks/ReduxProvider'
import ThemeCustomization from '@/theme'
import React from 'react'
import { AgeChecker } from './AgeChecker'

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContextProvider>
            <ClientProvider>
                <ThemeCustomization>
                    {children}
                    <Toast />
                    {/* <AgeChecker
                        apiKey="lwU8lOYysWXrIZaijSG3Hfcxmzc4DlS9"
                        onVerified={() => { }}
                        onSkipped={() => { }}
                    /> */}
                </ThemeCustomization>
            </ClientProvider>
        </ThemeContextProvider>
    )
}
