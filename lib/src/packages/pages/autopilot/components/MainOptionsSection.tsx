import React, { useState, useMemo } from 'react';
import { useFetchCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { TemplateSelect } from './TemplateSelect';
import { CronOptionsForm } from './CronOptionsForm';
import { useResetCronOptions } from "@news-parser/entities/cronOptions/hooks/useResetCronOptions";
import { useDeleteTemplate } from '@news-parser/entities/templates/hooks/useDeleteTemplate';
import { ButtonWithLoading } from '../../../ui/ButtonWithLoading';
import { DeleteTemplateButtonWithConfirmation } from './DeleteTemplateButtonWithConfirmation';
import { useGetCronOptions, useMutateCronOptions } from '@news-parser/entities/cronOptions/hooks/';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '@news-parser/entities/cronOptions/constants';
import { PAGES } from '@news-parser/config/i18n';

export const MainOptionsBlock: React.FC = () => {
    const [isCronOptionsFetching, fetchCronOptions] = useFetchCronOptions();
    const [selectedTemplate, setSelectedTemplate] = useState<string>('')
    const resetCronOptions = useResetCronOptions();
    const [isDeleting, deleteTemplate] = useDeleteTemplate();
    const [isCronOptiosSet, cronOptions] = useGetCronOptions();
    const [isCronOpotionsMutating, mutateCronOptions] = useMutateCronOptions();
    const buttonName = useMemo(() => cronOptions?.status === STATUS_ACTIVE ? 'Stop' : 'Start', [cronOptions.status]);
    const selectTemplateHandler = (templateID: string) => {
        resetCronOptions();
        fetchCronOptions(templateID);
        setSelectedTemplate(templateID)
    };

    return (
        <div className='mb-4 pt-2 pb-3'>
            <h2 className='np-fs-22 mb-3'>{PAGES.AUTOPILOT.SCHEDULE_OPTIONS}</h2>
            <div className='row'>
                <div className='input-group'>
                    <TemplateSelect className='form-select' placeholder='Select template url' aria-label='Select schedule option' onSelect={selectTemplateHandler} isFetching={isCronOptionsFetching || isDeleting} />
                </div>
            </div>
            {isCronOptiosSet &&
                <>
                    <CronOptionsForm
                        id='news-parser-cron-optios'
                        onSubmit={mutateCronOptions}
                        cronOptions={cronOptions}
                    />
                    <div className='row mt-4'>
                        <div className='col-md-6'>
                            <ButtonWithLoading isLoading={isCronOpotionsMutating} buttonName={buttonName} form='news-parser-cron-optios' className='btn btn-primary np-btn btn-lg w-100'  />   
                        </div>
                        <div hidden={cronOptions.status !== STATUS_INACTIVE} className='col-md-6 mt-sm-0 mt-3'>
                            <DeleteTemplateButtonWithConfirmation templateId={selectedTemplate} onDelete={deleteTemplate} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

