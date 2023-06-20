import React, { useMemo, useLayoutEffect } from "react";
import { useScrolling } from '../hooks/useScrolling';
// import '../../../scss/progress-indicator.scss';

export const ProgressIndicator = ({ hidden, total, count, children }) => {
    const [enableScrolling, disableScrolling] = useScrolling();
    useLayoutEffect(() => {
        if (hidden) disableScrolling();
        return () => !hidden && enableScrolling();
    }, [hidden]);
    const progress = useMemo(() => ({ width: `${~~(100 * count / total)}%` }), [total, count])
    return (
        <>
            <div hidden={hidden} className="progress-indicator-container position-fixed">
                <div className="progress-bar-outer">
                    <div className="progress-bar-inner" style={progress}></div>
                </div>
                {children}
            </div>

        </>
    )
}