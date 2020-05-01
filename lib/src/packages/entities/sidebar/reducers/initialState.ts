import { Sidebar } from "types/sidebar";

export const initialState:Sidebar={
    categories:[],
    selectedCategories:[],
    tags:{},
    selectedTags:[],
    status:'draft',
    publish:{
        date:false,
    },
    postFormat:'standard',
    allowComments:true,
    allowPinbacks:true,
}