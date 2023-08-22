export interface DialogData {
    isMutating: boolean,
    isOpen: boolean,
    url: string | false,
    _id: number | false,
    frameIsReady: boolean,
    rawHTML: string | false
}