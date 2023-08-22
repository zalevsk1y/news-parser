import {ParserRootState} from 'types/state';

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
