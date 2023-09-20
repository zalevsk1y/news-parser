import { Message } from './message';
import { CronOptions } from './cronOptions';
import { DialogData } from './dialog';
import { Sidebar } from './sidebar';
import { SidebarTemplate, TemplateDataWithPostOptions } from './template';
import { Post, PostDraftData } from './post';

export type AutopilotRootState = {
    parse: {
        templates: Array<string>,
        message: Message | false,
        cronOptions: CronOptions
    }
}

export type ParserRootState = {
    parse: {
        page:string,
        message: Message | false,
        dialog: DialogData,
        template: false | TemplateDataWithPostOptions,
        items: {
            data: Array<Post>,
            select: Record<Post['_id'], boolean> | object,
            draft: Record<Post['_id'], Omit<PostDraftData, '_id'>> | object
        },
        sidebar: Sidebar,
        sidebarTemplate: SidebarTemplate
    }
}
