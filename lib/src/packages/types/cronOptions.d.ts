export interface CronOptions {
    url: string,
    maxCronCalls: number,
    maxPostsParsed: number,
    interval: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly',
    timestamp: null | string,
    cronCalls: number,
    parsedPosts: number,
    status: 'active' | 'inactive'
}

