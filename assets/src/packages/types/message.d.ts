export type Message = {
    timestamp: string,
    isOpen: boolean,
    type: 'success' | 'error' | 'info',
    text: string
}

export type MessageAction = {
    type: 'success' | 'error' | 'info',
    text: string
}
export type MessageFormat={
    timestamp: string,
    type: 'success' | 'error' | 'info',
    text: string
}