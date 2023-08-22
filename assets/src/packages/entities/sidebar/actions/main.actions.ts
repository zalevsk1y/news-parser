import { SIDEBAR } from "../constants";

const RESET = 'reset';
// [sidebar:reset]
export const RESET_SIDEBAR = `[${SIDEBAR}:${RESET}]`;

export const resetSidebar = () => ({
        type: RESET_SIDEBAR
    })