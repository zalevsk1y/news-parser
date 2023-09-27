import { ParserRootState } from 'types/state';

export type DialogDataType = ParserRootState['parse']['dialog'];
export const initialState: DialogDataType = {
        isMutating: false,
        isOpen: false,
        url: false,
        _id: false,
        frameIsReady: false,
        rawHTML: false
}
