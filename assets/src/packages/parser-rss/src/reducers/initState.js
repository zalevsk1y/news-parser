import { sidebar } from "../../../sidebar/src/reducers"

export const initialStateParse={
            appState:{
                isFetching:false,
                entity:'list',
                submitType:'list',
                event:false,
                data:{
                    url:''
                }
            },
            message:false,
            dialog:false,
            items:{
                data:[],
                select:{},
                draft:{}
            },
            sidebar:{
                categories:[]
            }
}

export const initialStateRoute={

    action:false,
    url:false,
}