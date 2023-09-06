import { createAction } from "@reduxjs/toolkit";
import { SIDEBAR } from "../constants";

const RESET = 'reset';
// [sidebar:reset]
export const RESET_SIDEBAR = `[${SIDEBAR}:${RESET}]`;

export const resetSidebar = createAction<void>(RESET_SIDEBAR);