import { Message } from './message';
import { CronOptions } from './cronOptions';
import { DialogData } from './dialog';
import { Sidebar } from './sidebar';
import { SidebarTemplate, TemplateDataWithPostOptions } from './template';

export type AutopilotRootState = {
    parse: {
        templates: Array<string>,
        message: Message | false,
        cronOptions: CronOptions
    }
}

export type ParserRootState = {
    parse: {
        message: Message | false,
        dialog: DialogData,
        template: false|TemplateDataWithPostOptions,
        items: {
            data: [],
            select: {},
            draft: {}
        },
        sidebar: Sidebar,
        sidebarTemplate: SidebarTemplate
    }
}

