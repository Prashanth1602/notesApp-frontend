import { useState, useCallback, useRef } from "react";

export default function useDelayedLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef(null);

    const withDelay = useCallback(async (asyncFn) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setIsLoading(true);
        }, 2000);

        try {
            await asyncFn();
        } finally {
            if (timerRef.current) clearTimeout(timerRef.current);
            setIsLoading(false);
        }
    }, []);

    return { isLoading, withDelay };
}
