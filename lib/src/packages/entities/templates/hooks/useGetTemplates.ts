import { useSelector } from 'react-redux';
import { AutopilotRootState } from 'types/state';


export type UseGetTemplates = () => AutopilotRootState['parse']['templates']


export const useGetTemplates:UseGetTemplates = () => {
    const templates = useSelector((state: AutopilotRootState) => state.parse.templates);
    return templates;
}