import { useSelector } from 'react-redux';
import { AutopilotRootState } from 'types/state';

namespace useGetTemplates {
    export type UseGetTemplates = () => AutopilotRootState['parse']['templates']
}

export const useGetTemplates = () => {
    const templates = useSelector((state: AutopilotRootState) => state.parse.templates);
    return templates;
}