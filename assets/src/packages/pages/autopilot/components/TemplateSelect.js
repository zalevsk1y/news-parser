import React from "react";
import { SelectGroup } from "../../../components/SelectGroup"; 
import { useGetTemplates } from "@news-parser/entities/templates/hooks/useGetTemplates";


export const TemplateSelect=({onSelect})=>{
    const templates=useGetTemplates();
    const optionsTemplates=templates.map(template=><option key={template.toString()} value={template}>{template}</option>)
    return (
        <SelectGroup className='form-select' placeholder='Select template url' ariaLabel='Select schedule option' onSelect={onSelect}>
            {optionsTemplates}
        </SelectGroup>
    )
}