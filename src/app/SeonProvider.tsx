"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import seon from "@seontechnologies/seon-javascript-sdk";

type SeonContextType = {
    deviceId?: string;
    loading: boolean;
    sessionData?: any; // For storing additional session information if available
};

const SeonContext = createContext<SeonContextType>({
    deviceId: undefined,
    loading: true,
    sessionData: undefined
});

export const useSeon = () => useContext(SeonContext);

export const SeonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deviceId, setDeviceId] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize the SDK on page load
        seon.init({
            behavioralDataCollection: {
                targets: 'input[type="text"], .behavior',
                formFilloutDurationTargetId: "myForm",
            },
        });

        // Collect fingerprint session
        seon.getSession()
            .then((session: string) => {
                // session holds the encrypted fingerprint as a base64 encoded string
                // This is what you send to your backend for fraud detection
                console.log("Device fingerprint session:", session);
                setDeviceId(session);
                setLoading(false);
            })
            .catch((err: any) => {
                console.error("SEON init error:", err);
                setLoading(false);
            });

        // Cleanup: disable behavioral tracking when component unmounts
        return () => {
            seon.init({
                behavioralDataCollection: { targets: "" }, // disables tracking
            });
        };
    }, []);

    return (
        <SeonContext.Provider value={{ deviceId, loading }}>
            {children}
        </SeonContext.Provider>
    );
};