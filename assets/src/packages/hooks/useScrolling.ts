import { useCallback } from "react"
import { document } from "globals";

export const useScrolling = () => {

    const enableScrolling = useCallback(() => {
        document.documentElement.style.overflowY = 'auto';
    }, []);
        const disableScrolling = useCallback(() => {
            document.documentElement.style.overflowY = 'hidden';
        }, []);
    return [enableScrolling, disableScrolling]
}
