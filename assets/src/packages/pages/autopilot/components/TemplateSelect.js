import React,{useMemo,useState,useCallback} from "react";
import { useGetTemplates } from "@news-parser/entities/templates/hooks/useGetTemplates";


export const TemplateSelect = ({ onSelect,isFetching,placeholder,...otherProps }) => {
    const templates = useGetTemplates();
    const optionsTemplates = useMemo(()=>{
        return templates.map(template => <option key={template.toString()} value={template}>{template}</option>);
    },[templates])
    const [selectValue,setSelectValue]=useState(''); 
    const selectClickHandler=useCallback(()=>{
        onSelect(selectValue);
    },[selectValue]);
    const selectChangeHandler=useCallback((e)=>{
        e.preventDefault();
        setSelectValue(e.target.value);
    },[])
    return (
        <>
            <select {...otherProps} onChange={selectChangeHandler} value={selectValue} >
                <option value="" disabled>--{placeholder}--</option>
                {optionsTemplates}
            </select>
            <button className="btn btn-primary np-btn" type="button" onClick={selectClickHandler} disabled={isFetching}>{
                isFetching?<><span className="spinner-border spinner-border-16 np-fs-16" role="status" aria-hidden="true"></span>
                    <span className="sr-only np-fs-16">&nbsp;Loading...</span></>
                    :<span className="px-4 np-fs-16">Select</span>
                }</button>
        </>
    )
}