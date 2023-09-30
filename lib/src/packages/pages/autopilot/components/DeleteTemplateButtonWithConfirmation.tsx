import React, { useCallback, useState, useMemo } from 'react';
import { ModalDialogWindow } from '@news-parser/components/ModalDialogWindow';
import { useScrolling } from '../../../hooks/useScrolling';
import { useResetCronOptions } from '@news-parser/entities/cronOptions/hooks/useResetCronOptions';

export type DeleteTemplateButtonProps = {
    templateId: string,
    onDelete:(templateId:string)=>void
}

export const DeleteTemplateButtonWithConfirmation: React.FC<DeleteTemplateButtonProps> = ({ templateId,onDelete }) => {
    const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
    const resetCronOptions = useResetCronOptions();
    const [enableScrolling, disableScrolling] = useScrolling();
    const closeConfirmationWindow = useMemo(() => () => {
        setIsConfirmWindowOpen(false);
        enableScrolling()
    }, [[setIsConfirmWindowOpen, enableScrolling]])
    const openConfirmationWindow = useMemo(() => () => {
        setIsConfirmWindowOpen(true);
        disableScrolling()
    }, [[setIsConfirmWindowOpen, disableScrolling]])
    const deleteButtonClickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        openConfirmationWindow()
    }, [setIsConfirmWindowOpen])
    const closeButtonClickHandler = useCallback(closeConfirmationWindow, [setIsConfirmWindowOpen, disableScrolling]);
    const acceptButtonClickHandler = () => {
        resetCronOptions();
        onDelete(templateId);
        closeConfirmationWindow();
    }
    return (
        <>
            <ModalDialogWindow
                title='Delete Template Confirmation'
                modalBody={`Are you sure you want to delete the template ${templateId}? This action cannot be undone.`}
                acceptButtonName='Delete Template'
                dismissButtonName='Cancel'
                isOpen={isConfirmWindowOpen}
                onAccept={acceptButtonClickHandler}
                onDismiss={closeButtonClickHandler}
                onClose={closeButtonClickHandler}
            />
            <button className='btn btn-outline-secondary np-btn btn-lg w-100' onClick={deleteButtonClickHandler}>
                <span className="px-4 np-fs-16">Delete Template</span>
            </button>
        </>
    )
}