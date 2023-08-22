import React, { useMemo, useCallback } from 'react';
import { PostCartLarge } from '@news-parser/ui/post-card/PostCardLarge';
import { HiddenBlock } from '@news-parser/ui/HiddenBlock';
import { useFetchCronOptions, useGetCronOptions, useMutateCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { STATUS_ACTIVE, STATUS_IDLE } from '@news-parser/entities/cronOptions/constants';
import { configConstantsMethods } from '@news-parser/config/constants';
import { SelectInterval } from './SelectInterval';
import { MaxPostsInput } from './MaxPostsInput';
import { MaxCronInput } from './MaxCronInput';
import { TemplateSelect } from './TemplateSelect';





export const MainOptionsBlock:React.FC = () => {
    const [isConsOptionsSet, cronOptions] = useGetCronOptions();
    const [isCronOpotionsMutating, mutateCronOptions] = useMutateCronOptions();
    const [isCronOptionsFetching, fetchCronOptions] = useFetchCronOptions();
    const buttonName = useMemo(() => cronOptions?.status === STATUS_ACTIVE ? 'Stop' : 'Start', [cronOptions.status]);
    const selectTemplateHandler = useCallback((templateID:string) => {
        fetchCronOptions(templateID);
    },[fetchCronOptions]);
    const submitHandler = useCallback((event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCronData = { ...cronOptions };
        switch (cronOptions.status) {
            case STATUS_IDLE:
                newCronData.status = STATUS_ACTIVE;
                mutateCronOptions(newCronData);
                break;
            case STATUS_ACTIVE:
                mutateCronOptions({url:cronOptions.url},configConstantsMethods.DELETE);
                break;
        }
    }, [cronOptions.status, cronOptions])
    return (
        <PostCartLarge className='mb-4'>
            <div>
                <h2 className='np-fs-22'>Schedule Options</h2>
            </div>
            <div className='mt-3'>
                <div className='input-group'>
                    <TemplateSelect className='form-select' placeholder='Select template url' aria-label='Select schedule option' onSelect={selectTemplateHandler} isFetching={isCronOptionsFetching} />
                </div>
            </div>
            <HiddenBlock hide={!isConsOptionsSet}>
                <div className='options-block d-flex flex-row mt-4'>
                    <div className='col-4 col-lg-2'>
                        <span className='np-fs-16'>Current status:</span>
                    </div>
                    <div className='col-8 col-lg-6 np-fs-16'>
                        &nbsp;{cronOptions.status}
                    </div>
                </div>
                <form id='cron-optios' onSubmit={submitHandler}>
                <div className='options-block d-flex flex-row mt-4'>
                    
                    <div className='col-4 col-lg-2'>
                        <label htmlFor='cron-options-max-posts-parsed' className='form-lable np-fs-16'>Total posts:</label>
                    </div>
                    <div className='col-8 col-lg-6'>
                        <MaxPostsInput min={1} max={100} step={1} className='w-100 np-fs-16' id='cron-options-max-posts-parsed' placeholder='1-100' required disabled={cronOptions.status === 'active'} />
                        <div className='text-block'>
                            <i className='text-secondary np-fs-16'>{cronOptions?.parsedPosts} posts were parsed</i>
                        </div>
                    </div>
                </div>
                <div className='options-block d-flex flex-row mt-4'>
                    <div className='col-4 col-lg-2'>
                        <label htmlFor='cron-options-max-cron-call' className='form-lable np-fs-16'>Total runs:</label>
                    </div>
                    <div className='col-8 col-lg-6'>
                        <MaxCronInput min='1' max='100' step='1' className='w-100 np-fs-16' placeholder='1-100' id='cron-options-max-cron-call' required disabled={cronOptions.status === 'active'} />
                        <div className='text-block'>
                            <i className='text-secondary np-fs-16'>{cronOptions?.cronCalls} times parser was run.</i>
                        </div>
                    </div>
                </div>


                <div className='options-block d-flex flex-row mt-4 pb-2'>
                    <div className='col-4 col-lg-2'>
                        <label htmlFor='cron-options-cron-calls-interval' className='form-lable np-fs-16'>Run frequency:</label>
                    </div>
                    <div className='col-8 col-lg-6'>
                        <SelectInterval className="form-select" id='cron-options-cron-calls-interval' required disabled={cronOptions?.status === 'active'} />
                    </div>
                </div>
                </form>
                <div className='buttons-block mt-4'>
                    <button form='cron-optios' type='submit' className='btn btn-primary np-btn' >
                    {
                        isCronOpotionsMutating?
                        <>
                            <span className='spinner-border spinner-border-16 np-fs-16 ' role='status' aria-hidden='true' />
                            <span className='sr-only np-fs-16'>&nbsp;Loading...</span>
                        </>:
                        <span className='px-4 np-fs-16'>{buttonName}</span>
                    }
                    </button>
                </div>
            </HiddenBlock>
        </PostCartLarge>
    )
}