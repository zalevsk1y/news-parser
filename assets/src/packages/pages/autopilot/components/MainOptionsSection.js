import React, { useMemo,useState,useCallback } from "react";
import { PostCartLarge } from "@news-parser/ui/post-card/PostCardLarge";
import { HiddenBlock } from "@news-parser/ui/HiddenBlock";
import { useGetTemplates } from "@news-parser/entities/templates/hooks/useGetTemplates";
import { useGetCrons } from "@news-parser/entities/crons/hooks/useGetCrons";
import { SelectGroup } from "../../../components/SelectGroup";

export const MainOptionsBlock=()=>{
    const templates=useGetTemplates();
    const crons=useGetCrons();
    const [selectedTemplate,setSelectedTemplate]=useState(null);
    const selectTemplateHandler=useCallback((selectedTemplate)=>setSelectedTemplate(selectedTemplate),[setSelectedTemplate])
    const optionsTemplates=useMemo(()=>templates.map(templateUrl=><option key={templateUrl} value={templateUrl}>{templateUrl}</option>),[templates])
    return (
        <PostCartLarge>
            <div>
                <h4>Schedule Options</h4>
            </div>
            <div className="mt-3">
                <div className="input-group">
                   <SelectGroup className='form-select' placeholder='Select template url' ariaLabel='Select schedule option' onSelect={selectTemplateHandler}>
                    {optionsTemplates}
                    </SelectGroup> 
                </div>
            </div>
            <HiddenBlock hide={selectedTemplate===null}>
            <div className="options-block d-flex flex-row mt-4">
                <div className="col-md-2">
                    <span>Current status:</span>
                </div>
                <div className="col-md-6">
                    Running
                </div>
            </div>

            <div className="options-block d-flex flex-row mt-4">
                <div className="col-md-2">
                    <span>Total posts:</span>
                </div>
                <div className="col-md-6">
                    <input type="number" min="1" max="100" step="1" className="w-100" placeholder="1-100" />
                    <div className="text-block">
                        <i className="text-secondary small">55 posts were parsed</i>
                    </div>
                </div>
            </div>
            <div className="options-block d-flex flex-row mt-4">
                <div className="col-md-2">
                    <span>Total runs:</span>
                </div>
                <div className="col-md-6">
                    <input type="number" min="1" max="100" step="1" className="w-100" placeholder="1-100" />
                    <div className="text-block">
                        <i className="text-secondary small">45 times parser was run.</i>
                    </div>
                </div>
            </div>
           

            <div className="options-block d-flex flex-row mt-4 pb-2">
                <div className="col-md-2">
                    <span>Run frequency:</span>
                </div>
                <div className="col-md-6">
                    <select className="form-select">
                        <option value="hourly">hourly</option>
                        <option value="twicedaily">twicedaily</option>
                        <option value="daily">daily</option>
                        <option value="weekly ">weekly </option>
                    </select>
                </div>
            </div>
            <div className="buttons-block mt-4">
                <button className="btn btn-danger ps-4 pe-4">Stop</button>
            </div>
            </HiddenBlock>
        </PostCartLarge>
    )
}