import React, { useCallback, useMemo } from 'react';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '@news-parser/entities/cronOptions/constants';
import { configConstantsMethods } from '@news-parser/config/constants';
import { SettingsBlock } from './SettingsBlock';
import { CronOptions } from 'types/cronOptions';
import { MutatCronData } from '@news-parser/entities/cronOptions/hooks/useMutateCronOptions';
import { INTERVAL } from '../constants/index';
import { PAGES } from '@news-parser/config/i18n';

export type CronOptionsFormProps = {
    id: string,
    cronOptions: CronOptions,
    onSubmit: MutatCronData
}

export const CronOptionsForm: React.FC<CronOptionsFormProps> = ({ id, cronOptions, onSubmit }) => {
    const optionsItems: Array<React.ReactElement> = useMemo(() => INTERVAL.map((intervalItem) => <option key={intervalItem} value={intervalItem}>{intervalItem}</option>), []);
    const submitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const maxPostsParsedInput = formElement.elements[0] as HTMLInputElement;
        const maxCronCallsInput = formElement.elements[1] as HTMLInputElement;
        const parsingInterval = formElement.elements[2] as HTMLSelectElement;
        const newCronData = { ...cronOptions };
        switch (cronOptions.status) {
            case STATUS_INACTIVE:
                newCronData.maxPostsParsed = parseInt(maxPostsParsedInput.value);
                newCronData.maxCronCalls = parseInt(maxCronCallsInput.value);
                newCronData.interval = parsingInterval.value as CronOptions['interval']
                newCronData.status = STATUS_ACTIVE;
                onSubmit(newCronData);
                break;
            case STATUS_ACTIVE:
                onSubmit({ url: cronOptions.url }, configConstantsMethods.DELETE);
                break;
        }
    }, [cronOptions.status, cronOptions]);
    return (
        <form id={id} onSubmit={submitHandler}>
            <div className='row'>
                <SettingsBlock className='col-sm-12 mt-3'>
                    <span className='np-fs-16'>{PAGES.AUTOPILOT.CURRENT_STATUS}:</span>
                    <b className={`np-fs-16 ms-2 ${cronOptions.status == STATUS_ACTIVE ? 'text-success' : 'text-danger'}`}>
                        {cronOptions.status.toUpperCase()}
                    </b>
                </SettingsBlock>
                <SettingsBlock className='col-sm-6 mt-3'>
                    <label htmlFor='cron-options-max-posts-parsed' className='form-lable mb-2 np-fs-16'>Total posts:</label>
                    <input type='number' defaultValue={cronOptions.maxPostsParsed} min={1} max={100} step={1} className='w-100 np-fs-16' id='cron-options-max-posts-parsed' placeholder='1-100' required disabled={cronOptions.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.parsedPosts} posts were parsed</i>
                </SettingsBlock>
                <SettingsBlock className='col-sm-6 mt-3'>
                    <label htmlFor='cron-options-max-cron-call' className='form-lable mb-2 np-fs-16'>Total runs:</label>
                    <input type='number' defaultValue={cronOptions.maxCronCalls} min='1' max='100' step='1' className='w-100 np-fs-16' placeholder='1-100' id='cron-options-max-cron-call' required disabled={cronOptions.status === 'active'} />
                    <i className='text-secondary np-fs-16'>{cronOptions?.cronCalls} times parser was run.</i>
                </SettingsBlock>
                <SettingsBlock className='col-sm-12 mt-3'>
                    <label htmlFor='cron-options-cron-calls-interval' className='form-lable mb-2 np-fs-16'>Run frequency:</label>
                    <select className='form-select w-100' style={{ maxWidth: 'none', minHeight: '34px' }} id='cron-options-cron-calls-interval' required disabled={cronOptions?.status === 'active'} >
                        {optionsItems}
                    </select>
                </SettingsBlock>
            </div>

        </form>

    )
}