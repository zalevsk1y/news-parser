export type WPRestErrorResponse={
        code: string,
        message: string|false,
        data?: {
            status: number,
            params: Record<string,string>,
            details: any
        }
}