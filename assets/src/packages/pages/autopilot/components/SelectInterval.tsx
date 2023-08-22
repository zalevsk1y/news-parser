import React, { HTMLProps, useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from '@news-parser/entities/cronOptions/hooks/useInterval';
import { CronOptions } from 'types/cronOptions';

export const SelectInterval: React.FC<HTMLProps<HTMLSelectElement>> = (props) => {
    const [interval, setInterval] = useInterval();
    const optionsItemsArray: Array<CronOptions['interval']> = ['hourly', 'daily', 'weekly', 'monthly', 'yearly'];
    const optionsItems = useMemo(() => optionsItemsArray.map((intervalItem) => <option value={intervalItem}>{intervalItem}</option>), [optionsItemsArray]);
    const selectStateChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const postingInterval = e.target.value as CronOptions['interval'];
        setInterval(postingInterval)
    }, [setInterval]);
    return (
        <select {...props} value={interval} onChange={selectStateChangeHandler} >
            {optionsItems}
        </select>
    )
}