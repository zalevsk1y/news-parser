import React, { useMemo, useLayoutEffect } from "react";
import { useScrolling } from '../hooks/useScrolling';
// import '../../../scss/progress-indicator.scss';

export interface ProgressIndicatorProps {
    hidden?: boolean,
    total: number,
    count: number,
    children: React.ReactNode
}

/**
 * A component that displays a progress bar and an optional child component, with an option to disable scrolling when the progress bar is visible.
 *
 * @param {ProgressIndicatorProps} props - The component props.
 * @param {boolean} [hidden=false] - A flag that indicates whether the progress bar should be hidden.
 * @param {number} total - The total number of items to be processed.
 * @param {number} count - The number of items that have been processed so far.
 * @param {ReactNode} [children] - An optional child component to render alongside the progress bar.
 * @returns {JSX.Element} A div element containing the progress bar, and an optional child component.
 */


export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ hidden, total, count, children }) => {
    const [enableScrolling, disableScrolling] = useScrolling();
    useLayoutEffect(() => {
        if (hidden) {
            disableScrolling()
        } else {
            enableScrolling();
        }
    }, [hidden]);
    const progress = useMemo(() => ({ width: `${Math.round(100 * count / total)}%` }), [total, count])
    return (
        <div hidden={hidden} className="progress-indicator-container position-fixed">
            <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={progress} />
            </div>
            {children}
        </div>
    )
}