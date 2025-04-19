import { useState, useEffect } from "react";
import React from "react";
export const useNetwork = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    console.log(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', () => {
            console.log(" I ma ");
            setIsOnline(false)
        });
        console.log(isOnline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline
}