"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import seon from "@seontechnologies/seon-javascript-sdk";

type SeonContextType = {
    deviceId?: string;
    loading: boolean;
};

const SeonContext = createContext<SeonContextType>({ deviceId: undefined, loading: true });

export const useSeon = () => useContext(SeonContext);

export const SeonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deviceId, setDeviceId] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        seon.init({
            behavioralDataCollection: {
                targets: 'input[type="text"], .behavior',
                formFilloutDurationTargetId: "myForm",
            },
        });

        // Collect fingerprint
        seon.getSession()
            .then((session: any) => {
                setDeviceId(session);
                setLoading(false);
            })
            .catch((err: any) => {
                console.error("SEON init error:", err);
                setLoading(false);
            });

        // Cleanup behavioral tracking if needed
        return () => {
            seon.init({
                behavioralDataCollection: { targets: "" },
            });
        };
    }, []);

    return (
        <SeonContext.Provider value={{ deviceId, loading }}>
            {children}
        </SeonContext.Provider>
    );
};