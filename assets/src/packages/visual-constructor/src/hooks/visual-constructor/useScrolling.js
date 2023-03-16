import { useCallback } from "react"
import { document } from "globals";

export const useScrolling = () => {

    const enableScrolling = useCallback(() => {
        document.documentElement.style.overflowY = 'auto';
    }, []),
        disableScrolling = useCallback(() => {
            document.documentElement.style.overflowY = 'hidden';
        }, []);
    return [enableScrolling, disableScrolling]
}
