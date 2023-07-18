import React from 'react'

export const InputNumber = ({value,...otherParams}) => {
    return (
    <input type="number" value={value===null||value===0?'':value} {...otherParams} />
    )
}