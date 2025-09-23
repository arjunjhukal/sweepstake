"use client";
import { getCookie, setCookie } from '@/utils/ageChecker';
import { useEffect } from 'react';

interface AgeCheckerProps {
    apiKey: string;
    onVerified?: () => void;
    onSkipped?: () => void;
}

// Types for AgeChecker integration
interface AgeCheckerConfig {
    mode?: string;
    key: string;
    path?: string;
    onready?: () => void;
    onclosed?: () => void;
    [key: string]: unknown;
}

interface AgeCheckerAPI {
    show: () => void;
    [key: string]: unknown;
}

// Extend Window interface to include AgeChecker globals
declare global {
    interface Window {
        AgeCheckerConfig?: AgeCheckerConfig;
        AgeCheckerAPI?: AgeCheckerAPI;
    }
}

export const AgeChecker: React.FC<AgeCheckerProps> = ({
    apiKey,
    onVerified,
    onSkipped
}) => {
    useEffect(() => {
        // Check if user is already verified
        if (getCookie("ac_custom_verified")) {
            onSkipped?.();
            return;
        }

        // AgeChecker configuration
        const config: AgeCheckerConfig = {
            mode: "manual",
            key: apiKey,
            onready: () => {
                if (window.AgeCheckerAPI) {
                    window.AgeCheckerAPI.show();
                }
            },
            onclosed: () => {
                setCookie("ac_custom_verified", "true", 30);
                onVerified?.();
            }
        };

        // Set global config
        window.AgeCheckerConfig = config;

        // Check if path condition should prevent loading (from original script)
        // Only check if path is defined in config
        if (config.path && (window.location.pathname + window.location.search).indexOf(config.path)) {
            return;
        }

        // Load AgeChecker script
        const head = document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        script.src = "https://cdn.agechecker.net/static/popup/v1/popup.js";
        script.crossOrigin = "anonymous";
        script.onerror = () => {
            window.location.href = "https://agechecker.net/loaderror";
        };

        head.insertBefore(script, head.firstChild);

        // Cleanup function
        return () => {
            // Remove script if component unmounts
            const existingScript = document.querySelector('script[src="https://cdn.agechecker.net/static/popup/v1/popup.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [apiKey, onVerified, onSkipped]);

    return (
        <>
            {/* NoScript fallback */}
            <noscript>
                <meta httpEquiv="refresh" content="0;url=https://agechecker.net/noscript" />
            </noscript>
        </>
    );
};
