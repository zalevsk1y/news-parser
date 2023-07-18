import React, { useCallback, useEffect, useState } from "react";
import { useInterval } from "@news-parser/entities/cronOptions/hooks/useInterval";

export const SelectInterval = (props) => {
    const [interval, setInterval ]= useInterval();
    const selectStateChangeHandler = useCallback((e) => setInterval(e.target.value), [setInterval]);
    return (
        <select {...props} value={interval} onChange={selectStateChangeHandler} >
            <option value="hourly">hourly</option>
            <option value="twicedaily">twicedaily</option>
            <option value="daily">daily</option>
            <option value="weekly ">weekly </option>
        </select>
    )
}