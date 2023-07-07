import React from "react";
import { PostCartLarge } from "../ui/post-card/PostCardLarge";

export const MainOptionsBlock=()=>{
    return (
        <PostCartLarge>
            <div>
                <h4>Schedule Options</h4>
            </div>
            <div className="mt-3">
                <div className="input-group">
                    <select className="form-select" aria-label="Select schedule option">
                        <option >Option 1</option>
                        <option value="1">Option 2</option>
                        <option value="2">Option 3</option>
                    </select>
                    <button className="btn btn-primary" type="button">Select</button>
                </div>
            </div>

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
        </PostCartLarge>
    )
}