import React, { useMemo } from "react";
import ReactDOM from "react-dom";


export type ModalDialogWindowProps = {
    title: string,
    modalBody: string,
    acceptButtonName: string,
    dismissButtonName: string,
    onDismiss: () => void,
    onClose: () => void,
    onAccept: () => void,
    isOpen: boolean
}

export const ModalDialogWindow: React.FC<ModalDialogWindowProps> = ({ title, isOpen, modalBody, acceptButtonName, dismissButtonName, onDismiss, onAccept, onClose }) => {
    const modalContainer = useMemo(() => document.getElementById('news-parser-model-dialog-container'), [])
    if (!isOpen) return null;
    if (modalContainer !== null) {
        return ReactDOM.createPortal((
            <div className="modal-window-shader-container">
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} autoFocus></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalBody}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onDismiss}>{dismissButtonName}</button>
                                <button type="button" className="btn btn-primary" onClick={onAccept}>{acceptButtonName}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>), modalContainer);
    } else {
        return null;
    }

}