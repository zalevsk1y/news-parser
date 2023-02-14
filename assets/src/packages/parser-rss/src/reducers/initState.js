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
                categories:[],
                selectedCategories:[],
                tags:[],
                selectedTags:[],
                status:'publish',
                publish:{
                    date:false,
                },
                postFormat:'standard',
                allowComments:true,
                allowPinbacks:true
            }

}

export const initialStateRoute={

    action:false,
    url:false,
}