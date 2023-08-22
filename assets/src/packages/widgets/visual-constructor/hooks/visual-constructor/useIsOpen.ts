import { useSelector } from 'react-redux';
import { ParserRootState } from 'types/state';

namespace useIsOpen {
    export type UseIsOpen = () => [string | false, boolean]
}

/**
 * Custom hook for accessing the URL and isOpen state from the dialog.
 *
 * @returns {Array} A tuple containing the URL and isOpen state.
 */

export const useIsOpen: useIsOpen.UseIsOpen = () => {
    const { url, isOpen } = useSelector((state: ParserRootState) => state.parse.dialog);
    return [url, isOpen]
}