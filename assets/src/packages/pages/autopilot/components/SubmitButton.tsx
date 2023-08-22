import { STATUS_IDLE, STATUS_ACTIVE } from '@news-parser/entities/cronOptions/constants';
import React, { useCallback } from 'react';

interface SubmitButton {
    type: 'idle' | 'active',
    className: string | undefined
}

export const SubmitButton: React.FC<SubmitButton> = ({ type, className }) => {
    const buttonName = type === STATUS_IDLE ? 'Start' : 'Stop';
    const buttonHandler = useCallback(() => {
        switch (type) {
            case STATUS_IDLE:
                
            case STATUS_ACTIVE:
                
        }
    }, [type])
    return (
        <button className={className} onClick={buttonHandler}>{buttonName}</button>
    )
}