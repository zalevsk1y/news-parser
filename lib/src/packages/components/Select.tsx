import React, { HTMLProps, useCallback } from 'react';

export type SelectProps=React.HTMLProps<HTMLSelectElement>&{
    className?:string,
    onChange: React.ChangeEventHandler<HTMLSelectElement>,
    children: React.ReactNode,
    value?: string,
    id?:string,
    
}

/**
 * A component that displays a select element with options, and allows for a callback function to be called when the selected option changes.
 *
 * @param {SelectProps} props - The component props.
 * @param {function} onChange - A callback function that will be called when the selected option changes.
 * @param {ReactNode} children - The child components to render as options in the select element.
 * @param {HTMLProps} otherProps - other html props(WAI-ARIA) that could be to select tag.
 * @param {string} value - The value of the currently selected option.
 * @returns {JSX.Element} A select element containing the child components as options.
 */


export const Select: React.FC<SelectProps> = ({ onChange, children, value,id,...otherProps }) => {
    const onChangeCallback = useCallback((e:React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e)
    },[])
    return (
        <select {...otherProps} onChange={onChangeCallback} value={value} id={id} style={{maxWidth:'none',minHeight:'34px'}}>
            {children   }
        </select>
    )
}