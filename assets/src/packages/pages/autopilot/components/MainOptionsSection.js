import React, { useMemo, useCallback } from "react";
import { PostCartLarge } from "@news-parser/ui/post-card/PostCardLarge";
import { HiddenBlock } from "@news-parser/ui/HiddenBlock";
import { SelectInterval } from "./SelectInterval";
import { MaxPostsInput } from './MaxPostsInput';
import { MaxCronInput } from './MaxCronInput';
import { TemplateSelect } from "./TemplateSelect";
import { useFetchCronOptions, useGetCronOptions, useMutateCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { defaultCronData } from "@news-parser/entities/cronOptions/constants";
import { STATUS_ACTIVE, STATUS_IDLE } from "@news-parser/entities/cronOptions/constants";
import { DELETE } from "@news-parser/config/constants";





export const MainOptionsBlock = () => {
    const [isConsOptionsSet, cronOptions] = useGetCronOptions();
    const [isCronOpotionsMutating, mutateCronOptions] = useMutateCronOptions();
    const [isCronOptionsFetching, fetchCronOptions] = useFetchCronOptions();
    const buttonName = useMemo(() => cronOptions?.status === STATUS_ACTIVE ? 'Stop' : 'Start', [cronOptions.status]);
    const selectTemplateHandler = useCallback((templateID) => {
        fetchCronOptions(templateID);
    });
    const submitHandler = useCallback((event) => {
        event.preventDefault();
        console.log(event)
        let newCronData = { ...cronOptions };
        switch (cronOptions.status) {
            case STATUS_IDLE:
                newCronData.status = STATUS_ACTIVE;
                mutateCronOptions(newCronData);
                break;
            case STATUS_ACTIVE:
                mutateCronOptions({url:cronOptions.url},DELETE);
                break;
        }
    }, [cronOptions.status, cronOptions])
    return (
        <PostCartLarge>
            <div>
                <h4>Schedule Options</h4>
            </div>
            <div className="mt-3">
                <div className="input-group">
                    <TemplateSelect onSelect={selectTemplateHandler} />
                </div>
            </div>
            <HiddenBlock hide={!isConsOptionsSet}>
                <div className="options-block d-flex flex-row mt-4">
                    <div className="col-md-2">
                        <span>Current status:</span>
                    </div>
                    <div className="col-md-6">
                        {cronOptions.status}
                    </div>
                </div>
                <form id='cron-optios' onSubmit={submitHandler}>
                <div className="options-block d-flex flex-row mt-4">
                    
                    <div className="col-md-2">
                        <label htmlFor="cron-options-max-posts-parsed" className="form-lable">Total posts:</label>
                    </div>
                    <div className="col-md-6">
                        <MaxPostsInput min={1} max={100} step={1} className="w-100" id="cron-options-max-posts-parsed" placeholder="1-100" required disabled={cronOptions.status === 'active'} />
                        <div className="text-block">
                            <i className="text-secondary small">{cronOptions?.parsedPosts} posts were parsed</i>
                        </div>
                    </div>
                </div>
                <div className="options-block d-flex flex-row mt-4">
                    <div className="col-md-2">
                        <label htmlFor="cron-options-max-cron-call" className="form-lable">Total runs:</label>
                    </div>
                    <div className="col-md-6">
                        <MaxCronInput min="1" max="100" step="1" className="w-100" placeholder="1-100" id="cron-options-max-cron-call" required disabled={cronOptions.status === 'active'} />
                        <div className="text-block">
                            <i className="text-secondary small">{cronOptions?.parsedPosts} times parser was run.</i>
                        </div>
                    </div>
                </div>


                <div className="options-block d-flex flex-row mt-4 pb-2">
                    <div className="col-md-2">
                        <label htmlFor="cron-options-cron-calls-interval" className="form-lable">Run frequency:</label>
                    </div>
                    <div className="col-md-6">
                        <SelectInterval className={"form-select"} id="cron-options-cron-calls-interval" required disabled={cronOptions?.status === 'active'} />
                    </div>
                </div>
                </form>
                <div className="buttons-block mt-4">
                    <button form='cron-optios' type='submit' className='btn btn-primary' >{buttonName}</button>
                </div>
            </HiddenBlock>
        </PostCartLarge>
    )
}