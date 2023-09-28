import React, { useMemo, useCallback } from "react";
import { HiddenBlock } from '@news-parser/ui/HiddenBlock';
import { SelectInterval } from './SelectInterval';
import { MaxPostsInput } from './MaxPostsInput';
import { MaxCronInput } from './MaxCronInput';
import { useGetCronOptions, useMutateCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { STATUS_ACTIVE, STATUS_IDLE } from '@news-parser/entities/cronOptions/constants';
import { configConstantsMethods } from '@news-parser/config/constants';
import { ChangeCronStatusButton } from './ChangeCronStatusButton';
import { SettingsBlock } from "./SettingsBlock";
import { DeleteTemplateButton } from "./DeleteTemplateButton";

export const CronOptionsBlock = () => {
    const [isConsOptionsSet, cronOptions] = useGetCronOptions();
    const [isCronOpotionsMutating, mutateCronOptions] = useMutateCronOptions();
    const buttonName = useMemo(() => cronOptions?.status === STATUS_ACTIVE ? 'Stop' : 'Start', [cronOptions.status]);
    const submitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCronData = { ...cronOptions };
        switch (cronOptions.status) {
            case STATUS_IDLE:
                newCronData.status = STATUS_ACTIVE;
                mutateCronOptions(newCronData);
                break;
            case STATUS_ACTIVE:
                mutateCronOptions({ url: cronOptions.url }, configConstantsMethods.DELETE);
                break;
        }
    }, [cronOptions.status, cronOptions])
    return (
        <HiddenBlock hide={!isConsOptionsSet}>
            <SettingsBlock>
                <span className='np-fs-16'>Current status:</span>
                <b className="np-fs-16">
                    &nbsp;{cronOptions.status}
                </b>
            </SettingsBlock>

            <form id='cron-optios' onSubmit={submitHandler}>
                <SettingsBlock>
                    <label htmlFor='cron-options-max-posts-parsed' className='form-lable np-fs-16'>Total posts:</label>
                    <MaxPostsInput min={1} max={100} step={1} className='w-100 np-fs-16' id='cron-options-max-posts-parsed' placeholder='1-100' required disabled={cronOptions.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.parsedPosts} posts were parsed</i>
                </SettingsBlock>
                <SettingsBlock>
                    <label htmlFor='cron-options-max-cron-call' className='form-lable np-fs-16'>Total runs:</label>
                    <MaxCronInput min='1' max='100' step='1' className='w-100 np-fs-16' placeholder='1-100' id='cron-options-max-cron-call' required disabled={cronOptions.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.cronCalls} times parser was run.</i>
                </SettingsBlock>
                <SettingsBlock>
                    <label htmlFor='cron-options-cron-calls-interval' className='form-lable np-fs-16'>Run frequency:</label>
                    <SelectInterval className="form-select" id='cron-options-cron-calls-interval' required disabled={cronOptions?.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.cronCalls} times parser was run.</i>
                </SettingsBlock>
            </form>
            <div className='buttons-block mt-4'>
                <ChangeCronStatusButton isLoading={isCronOpotionsMutating} buttonName={buttonName} />
                {cronOptions.status===STATUS_IDLE&&<DeleteTemplateButton />}
            </div>
        </HiddenBlock>
    )
}