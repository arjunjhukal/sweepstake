"use client";
import { setGlobalDeviceId } from "@/services/baseQuery";
import React, { createContext, useContext, useEffect, useState } from "react";

type SeonContextType = {
    deviceId?: string;
    loading: boolean;
    sessionData?: any;
};

const SeonContext = createContext<SeonContextType>({
    deviceId: undefined,
    loading: true,
    sessionData: undefined,
});

export const useSeon = () => useContext(SeonContext);

export const SeonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deviceId, setDeviceId] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let seon: any;

        const initSeon = async () => {
            if (typeof window === "undefined") return; // safeguard

            try {
                // Dynamically import so it only runs in browser
                const seonModule = await import("@seontechnologies/seon-javascript-sdk");
                seon = seonModule.default || seonModule;

                seon.init({
                    behavioralDataCollection: {
                        targets: 'input[type="text"], .behavior',
                        formFilloutDurationTargetId: "myForm",
                    },
                });

                const session = await seon.getSession();
                // console.log("Device fingerprint session:", session);
                setDeviceId(session);
                setGlobalDeviceId(session);
            } catch (err) {
                console.error("SEON init error:", err);
            } finally {
                setLoading(false);
            }
        };

        initSeon();

        return () => {
            if (seon) {
                try {
                    seon.init({ behavioralDataCollection: { targets: "" } });
                } catch { }
            }
        };
    }, []);

    useEffect(() => {
        if (deviceId) {
            setGlobalDeviceId(deviceId);
        }
    }, [deviceId]);
    return (
        <SeonContext.Provider value={{ deviceId, loading }}>
            {children}
        </SeonContext.Provider>
    );
};
