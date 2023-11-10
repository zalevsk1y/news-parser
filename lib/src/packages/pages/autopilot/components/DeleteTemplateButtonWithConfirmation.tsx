import React, { useCallback, useState, useMemo } from 'react';
import { ModalDialogWindow } from '@news-parser/components/ModalDialogWindow';
import { useScrolling } from '../../../hooks/useScrolling';
import { useResetCronOptions } from '@news-parser/entities/cronOptions/hooks/useResetCronOptions';
import { PAGES } from '@news-parser/config/i18n';

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
                title={PAGES.AUTOPILOT.DELETE_TEMPLATE_TITLE}
                modalBody={PAGES.AUTOPILOT.DELETE_TEMPLATE_BODY}
                acceptButtonName={PAGES.AUTOPILOT.DELETE_TEMPLATE_BUTTON}
                dismissButtonName={PAGES.AUTOPILOT.CANCEL_DELETE_TEMPLATE_BUTTON}
                isOpen={isConfirmWindowOpen}
                onAccept={acceptButtonClickHandler}
                onDismiss={closeButtonClickHandler}
                onClose={closeButtonClickHandler}
            />
            <button className='btn btn-outline-secondary np-btn btn-lg w-100' onClick={deleteButtonClickHandler}>
                <span className="px-4 np-fs-16">{PAGES.AUTOPILOT.DELETE_TEMPLATE_BUTTON}</span>
            </button>
        </>
    )
}