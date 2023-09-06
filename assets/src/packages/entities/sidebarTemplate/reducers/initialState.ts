import {ParserRootState} from 'types/state';

export type OptionsDataType=ParserRootState['parse']['sidebarTemplate']['options'];
export type ParsedDataType=ParserRootState['parse']['sidebarTemplate']['parsedData'];

export const initialState:ParserRootState['parse']['sidebarTemplate']={
    parsedData:{
        image:'',
        title:false,
        body:{}
    },
    options:{
        addFeaturedMedia:true,
        addSource:false,
        saveParsingTemplate:false
    }
}
