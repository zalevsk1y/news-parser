import React, { useCallback } from 'react';
import { PostCartLarge } from '@news-parser/ui/post-card/PostCardLarge';
import { useFetchCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { TemplateSelect } from './TemplateSelect';
import { CronOptionsBlock } from './CronOptionsBlock';


export const MainOptionsBlock: React.FC = () => {
    const [isCronOptionsFetching, fetchCronOptions] = useFetchCronOptions();
    const selectTemplateHandler = useCallback((templateID: string) => {
        fetchCronOptions(templateID);
    }, [fetchCronOptions]);
    return (
        <PostCartLarge className='mb-4'>

            <h2 className='np-fs-22 mb-3'>Schedule Options</h2>
            <div className='row'>
                <div className='input-group'>
                    <TemplateSelect className='form-select' placeholder='Select template url' aria-label='Select schedule option' onSelect={selectTemplateHandler} isFetching={isCronOptionsFetching} />
                </div>
            </div>
            <CronOptionsBlock />
        </PostCartLarge>
    )
}

