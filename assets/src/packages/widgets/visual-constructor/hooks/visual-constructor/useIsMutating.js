import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsMutating } from '../../actions/dialogData.actions'

export const useIsMutating = () => {
    const dispatch = useDispatch()
    const isMutating = useSelector(state => state.parse.dialog.dialogData.isMutating);
    const setIsMutatingHandler=(value)=>dispatch(setIsMutating(!!value))
    return [isMutating, setIsMutatingHandler]
}