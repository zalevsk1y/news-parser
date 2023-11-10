import React, { useMemo, useState, useCallback } from 'react';
import { useGetTemplates } from '@news-parser/entities/templates/hooks/useGetTemplates';
import { Select } from '@news-parser/components/Select';
import { PAGES } from '@news-parser/config/i18n';
import { ButtonWithLoading } from '@news-parser/ui/ButtonWithLoading';

interface TemplateSelectProps {
    onSelect: (templateId: string) => void,
    isFetching: boolean,
    placeholder: string,
    className?: string,
    otherProps?: Array<React.HTMLProps<HTMLSelectElement>>
}

export const TemplateSelect: React.FC<TemplateSelectProps> = ({ onSelect, isFetching, placeholder, ...otherProps }) => {
    const templates = useGetTemplates();
    const optionsTemplates = useMemo(() => templates.map(template => <option key={template} value={template}>{template}</option>), [templates])
    const [selectValue, setSelectValue] = useState<string>('');
    const selectClickHandler = useCallback(() => {
        onSelect(selectValue);
    }, [selectValue]);
    const selectChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectValue(e.target.value);
    }, [])
    return (
        <>
            <Select {...otherProps} onChange={selectChangeHandler} value={selectValue} id='autopilot-post-template-select' disabled={isFetching}>
                <option value='' disabled>--{placeholder}--</option>
                {optionsTemplates}
            </Select>
            <ButtonWithLoading isLoading={isFetching} buttonName={PAGES.AUTOPILOT.SELECT_BUTTON} className='btn btn-primary np-btn' onClick={selectClickHandler} disabled={isFetching || selectValue == ''}/>
        </>
    )
}