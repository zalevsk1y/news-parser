import { useIsMutatingState } from "../hooks/visual-constructor/useSetIsMutating";

export const VisualConstructorFooterMain = () => {
    const shouldParsingTemplateBeSaved = useSaveParsingTemplate();
    const setIsMutating=useSetIsMutating()
    const [createWpPost] = useCreateWpPost();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const close = useClose();
    const buttonClickHandler = useCallback(() => {
        setIsMutating(true);
        if (!shouldParsingTemplateBeSaved) {
            createWpPost().then(()=>setIsMutating(false)).then(()=>close())
        } else {
            createTemplate().then(()=>setIsMutating(false)).then(() => close())
        }
    
    }, [shouldParsingTemplateBeSaved]);
    return (
        <div className="visual-container-modal-footer d-flex flex-row justify-content-end align-items-center">
            <button
                type="button"
                className="button button-large button-primary"
                onClick={buttonClickHandler}
            >
                {saveParsingTemplate ? "Save Template" : "Create Post"}
            </button>
        </div>
    )
}