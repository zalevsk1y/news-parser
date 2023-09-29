import React, { useMemo, useCallback } from 'react';
import { SelectInterval } from './SelectInterval';
import { MaxPostsInput } from './MaxPostsInput';
import { MaxCronInput } from './MaxCronInput';
import { useGetCronOptions, useMutateCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '@news-parser/entities/cronOptions/constants';
import { configConstantsMethods } from '@news-parser/config/constants';
import { ChangeCronStatusButton } from './ChangeCronStatusButton';
import { SettingsBlock } from './SettingsBlock';
import { DeleteTemplateButton } from './DeleteTemplateButton';

export const CronOptionsBlock = () => {
    const [isConsOptionsSet, cronOptions] = useGetCronOptions();
    const [isCronOpotionsMutating, mutateCronOptions] = useMutateCronOptions();
    const buttonName = useMemo(() => cronOptions?.status === STATUS_ACTIVE ? 'Stop' : 'Start', [cronOptions.status]);
    const submitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCronData = { ...cronOptions };
        switch (cronOptions.status) {
            case STATUS_INACTIVE:
                newCronData.status = STATUS_ACTIVE;
                mutateCronOptions(newCronData);
                break;
            case STATUS_ACTIVE:
                mutateCronOptions({ url: cronOptions.url }, configConstantsMethods.DELETE);
                break;
        }
    }, [cronOptions.status, cronOptions])
    return (
        <form hidden={!isConsOptionsSet} id='cron-optios' onSubmit={submitHandler}>
            <div className='row'>
                <SettingsBlock className='col-sm-12 mt-3'>
                    <span className='np-fs-16'>Current status:</span>
                    <b className={`np-fs-16 ms-2 ${cronOptions.status == STATUS_ACTIVE ? 'text-success' : 'text-danger'}`}>
                        {cronOptions.status.toUpperCase()}
                    </b>
                </SettingsBlock>
                <SettingsBlock className='col-sm-6 mt-3'>
                    <label htmlFor='cron-options-max-posts-parsed' className='form-lable mb-2 np-fs-16'>Total posts:</label>
                    <MaxPostsInput min={1} max={100} step={1} className='w-100 np-fs-16' id='cron-options-max-posts-parsed' placeholder='1-100' required disabled={cronOptions.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.parsedPosts} posts were parsed</i>
                </SettingsBlock>
                <SettingsBlock className='col-sm-6 mt-3'>
                    <label htmlFor='cron-options-max-cron-call' className='form-lable mb-2 np-fs-16'>Total runs:</label>
                    <MaxCronInput min='1' max='100' step='1' className='w-100 np-fs-16' placeholder='1-100' id='cron-options-max-cron-call' required disabled={cronOptions.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.cronCalls} times parser was run.</i>
                </SettingsBlock>
                <SettingsBlock className='col-sm-12 mt-3'>
                    <label htmlFor='cron-options-cron-calls-interval' className='form-lable mb-2 np-fs-16'>Run frequency:</label>
                    <SelectInterval className='form-select' id='cron-options-cron-calls-interval' required disabled={cronOptions?.status === 'active'} />
                </SettingsBlock>
            </div>
            <div className='row mt-4'>
                <div className='col-md-6'>
                    <ChangeCronStatusButton isLoading={isCronOpotionsMutating} buttonName={buttonName} />
                </div>
                    {cronOptions.status === STATUS_INACTIVE && <div className='col-md-6 mt-sm-0 mt-3'><DeleteTemplateButton /></div>}
                
            </div>
        </form>
    )
}